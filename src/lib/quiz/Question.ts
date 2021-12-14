import { nanoid } from 'nanoid';
import Answer from './Answer';
import type Quiz from './Quiz';

type QuestionState = 'idle' | 'open' | 'voting-open' | 'closed';
export default class Question {
	id: string;
	type: 'multiple' | 'voting';
	description: string;
	quiz: Quiz;
	nextQuestion: Question;
	state: QuestionState = 'idle';
	answers: Answer[] = [];
	correctAnswer: string;

	constructor(q: Quiz, d: QuestionData) {
		this.quiz = q;
		this.id = nanoid();

		if (d.answers) {
			this.answers = d.answers.map((v) => {
				return new Answer(this, v);
			});
			this.type = 'multiple';
		} else {
			this.type = 'voting';
		}

		if (d.correct) {
			this.correctAnswer = this.answers[d.correct].id;
		}

		this.description = d.description;
	}

	findAnswerById(id: string) {
		return this.answers.find((a) => a.id === id);
	}

	voteForAnswer(userId: string, answerId: string) {
		let answer = this.findAnswerById(userId);
		if (answer) {
			answer.value = answerId;
			return;
		}

		answer = new Answer(this, answerId, userId);
		this.answers.push(answer);

		if (this.state === 'voting-open') {
			this.quiz.emit('question', this.toJSON());
		}
	}

	addAnswer(userId: string, answer: string) {
		if (this.type === 'multiple') {
			const a = this.findAnswerById(answer);
			a.addVote(userId);
		} else {
			const a = new Answer(this, userId, answer);
			this.answers.push(a);
		}
		this.quiz.emitAdmin('question.answers', {
			answers: this.answers.map((v) => v.toJSON()),
			id: this.id
		});
	}

	setState(s: QuestionState) {
		console.log('question.state', s);
		this.state = s;
		switch (s) {
			case 'open':
				this.quiz.activeQuestion = this;
				this.quiz.emit('question.active', this.toJSON());
				break;
			case 'voting-open':
				break;
			case 'closed':
				break;
		}
		this.quiz.emit('question', this.toJSON());
	}

	start() {
		if (this.state !== 'idle') return;
		this.setState('open');
	}

	end() {
		let oldState = this.state;
		if (this.type === 'voting') {
			if (this.state === 'open') {
				this.setState('voting-open');
			} else {
				this.setState('closed');
			}
		} else {
			if (this.state === 'open') {
				this.setState('closed');
			}
		}
		console.log('question.setState ', oldState, ' --> ', this.state);
		this.quiz.emit('question.state', this.state);
	}

	toJSON(isAdmin = false) {
		return {
			state: this.state,
			type: this.type,
			answers: this.answers.map((q) => q.toJSON()),
			description: this.description,
			correctAnswer: (this.state === 'closed' || isAdmin) && this.correctAnswer,
			id: this.id
		};
	}
}
