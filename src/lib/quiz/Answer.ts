import { nanoid } from 'nanoid';

export interface InternalAnswerState {
	id: string;
	userId: string;
	value: string;
	votes: Set<string>;
}

export function serialize(a: InternalAnswerState, showVotes = false) {
	return {
		id: a.id,
		userId: a.userId,
		value: a.value,
		votes: showVotes ? [...a.votes.values()] : []
	};
}

export function create(value: string, userId?: string): InternalAnswerState {
	return {
		id: nanoid(),
		value,
		userId,
		votes: new Set()
	};
}
