import { nanoid } from 'nanoid';
import Answer from './Answer';
import type Quiz from './Quiz';

type QuestionState = 'idle' | 'open' | 'voting-open' | 'closed';
export default class Question {
	id: string;
	type: 'multiple' | 'voting';
	description: string;
	timeout: number;
	quiz: Quiz;
	state: QuestionState = 'idle';
	answers: Answer[] = [];

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

		this.description = d.description;

		if (d.timeout) {
			this.timeout = d.timeout;
		}
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
			this.quiz.emit('question.state', this.toJSON());
		}
	}

	addAnswer(userId: string, answer: string) {
		const a = new Answer(this, userId, answer);
		this.answers.push(a);
	}

	setState(s: QuestionState) {
		console.log('Question.state', s);
		this.state = s;
		switch (s) {
			case 'open':
				this.quiz.activeQuestion = this;
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
		this.quiz.emit('question.state', this.state);
	}

	toJSON() {
		return {
			state: this.state,
			type: this.type,
			answers: this.answers.map((q) => q.toJSON()),
			description: this.description,
			id: this.id
		};
	}
}
