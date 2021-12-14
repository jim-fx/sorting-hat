import { nanoid } from 'nanoid';
import type Question from './Question';

export default class Answer {
	question: Question;

	id: string;
	userId: string;
	value: string;

	votes: Set<string> = new Set();

	constructor(q: Question, value: string, userId?: string) {
		this.id = nanoid();
		this.question = q;
		this.value = value;
		this.userId = userId;
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
