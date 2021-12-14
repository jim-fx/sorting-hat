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

	voteForAnswer(answerId: string, userId: string) {
		this.answers = this.answers.map((a) => {
			if (a.votes.has(userId)) {
				if (a.id !== answerId) a.votes.delete(userId);
			} else if (a.id === answerId) {
				a.addVote(userId);
			}
			return a;
		});

		if (this.state === 'voting-open') {
			this.quiz.emit('question', this.toJSON());
		}
	}

	addAnswer(userId: string, value: string) {
		let a: Answer;

		if (this.type === 'multiple') {
			a = this.findAnswerById(value);
			a.addVote(userId);
		} else {
			a = this.answers.filter((a) => a.userId === userId)[0];
			if (a) {
				a.value = value;
			} else {
				a = new Answer(this, value, userId);
			}
			this.answers.push(a);
		}
		this.quiz.emitAdmin('question.answers', {
			answers: this.answers.map((v) => v.toJSON()),
			id: this.id
		});

		return a.toJSON();
	}

	setState(s: QuestionState) {
		let oldState = this.state;
		this.state = s;
		switch (s) {
			case 'open':
				this.quiz.activeQuestion = this;
				this.quiz.emit('question.active', this.toJSON());
				break;
			case 'voting-open':
				if (this.type === 'voting') {
					this.quiz.emit('question', this.toJSON());
				}
				break;
			case 'closed':
				if (this.type === 'voting') {
					const answers = this.answers.sort((a, b) => (a.votes.size > b.votes.size ? 1 : -1));
					this.correctAnswer = answers[0].id;
				}
				this.quiz.emit('question.answer', this.correctAnswer);
				break;
		}
		console.log('question.state ', oldState + ' --> ' + this.state);
		this.quiz.emit('question.state', this.state);
	}

	start() {
		if (this.state !== 'idle') return;
		this.setState('open');
	}

	end() {
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
