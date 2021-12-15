import { nanoid } from 'nanoid';
import Answer from './Answer';
import type Quiz from './Quiz';

type QuestionState = 'idle' | 'open' | 'voting-open' | 'closed';
export default class Question {
	id: string;
	index: number;
	type: 'multiple' | 'voting';
	description: string;
	quiz: Quiz;
	nextQuestion: Question;
	state: QuestionState = 'idle';
	answers: Answer[] = [];
	correctAnswer: string;

	constructor(q: Quiz, d: QuestionData, index: number) {
		this.quiz = q;
		this.id = nanoid();
		this.index = index;

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
		this.quiz.emitAdmin(
			'question.answers',
			this.answers.map((v) => v.toJSON())
		);

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
				this.quiz.emit('question.correctAnswer', this.correctAnswer);
				this.quiz.emit('quiz.points', this.quiz.getPoints());
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

	getHousePoints() {
		const houses = {
			hufflepuff: 0,
			ravenclaw: 0,
			gryffindor: 0,
			slytherin: 0
		};

		if (this.state !== 'closed') return houses;

		if (this.type === 'multiple') {
			this.answers.forEach((a) => {
				if (a.id === this.correctAnswer) {
					a.votes.forEach((uId) => {
						const { house } = this.quiz.findUserByID(uId);
						if (house in houses) {
							houses[house]++;
						}
					});
				}
			});
		} else if (this.type === 'voting') {
			this.answers.forEach((a) => {
				const { house } = this.quiz.findUserByID(a.userId);
				if (house in houses) {
					houses[house] += a.votes.size;
				}
			});
		}

		return houses;
	}

	getUserPoints() {
		if (this.state !== 'closed') return [];

		if (this.type === 'multiple') {
			const correctAnswer = this.answers.find((a) => a.id === this.correctAnswer);
			return [...correctAnswer.votes.values()].map((u) => {
				return {
					userId: u,
					pts: 1
				};
			});
		} else if (this.type === 'voting') {
			return this.answers
				.map((a) => {
					return {
						userId: a.userId,
						pts: a.votes.size
					};
				})
				.filter((v) => v.pts > 0);
		}
	}

	toJSON(isAdmin = false) {
		return {
			state: this.state,
			type: this.type,
			index: this.index,
			answers: this.answers.map((q) => q.toJSON()),
			description: this.description,
			correctAnswer: (this.state === 'closed' || isAdmin) && this.correctAnswer,
			id: this.id
		};
	}
}
