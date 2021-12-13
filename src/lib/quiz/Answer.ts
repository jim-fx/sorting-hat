import { nanoid } from 'nanoid';
import type Question from './Question';

export default class Answer {
	question: Question;

	id: string;
	userId: string;
	value: string;

	votes: Set<string> = new Set();

	constructor(q: Question, value: string, userId: string = nanoid()) {
		this.id = userId;
		this.question = q;
		this.value = value;
	}

	addVote(userId: string) {
		this.votes.add(userId);
	}

	toJSON() {
		return {
			id: this.id,
			userId: this.userId,
			value: this.value,
			votes: [...this.votes.values()]
		};
	}
}
