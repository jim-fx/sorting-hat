import { nanoid } from 'nanoid';
import * as answer from './Answer';
import type { InternalAnswerState } from './Answer';
import { emit, emitAdmin, QuizState, getPoints, findUserByID } from './Quiz';
import { state } from '.';

type QuestionType = 'multiple' | 'voting';

export interface InternalQuestionState {
	id: string;
	index: number;
	type: QuestionType;
	state: 'idle' | 'open' | 'voting-open' | 'closed';
	description: string;
	nextQuestion?: InternalQuestionState;
	answers: InternalAnswerState[];
	correctAnswer: string;
}

export type QuestionState = ReturnType<typeof serialize>;

export function serialize(q: InternalQuestionState, isAdmin = false) {
	if (!q) return;
	return {
		id: q.id,
		index: q.index,
		type: q.type,
		state: q.state,
		answers: q?.answers?.map((a) => answer.serialize(a, isAdmin || q.state !== 'open')) || [],
		description: q.description,
		correctAnswer: q.state === 'closed' || isAdmin ? q.correctAnswer : ''
	};
}

export function create(questionData: QuestionData, index: number): InternalQuestionState {
	let type = (
		'answers' in questionData && questionData?.answers?.length ? 'multiple' : 'voting'
	) as QuestionType;

	const { description } = questionData;

	let answers = [];
	if (type === 'multiple') {
		answers = questionData?.answers?.map((v) => answer.create(v));
	}

	let correctAnswer;
	if ('correct' in questionData && answers[questionData.correct]?.id) {
		correctAnswer = answers[questionData.correct].id;
	}

	return {
		type,
		state: 'idle',
		answers,
		description,
		correctAnswer,
		id: nanoid(),
		nextQuestion: undefined,
		index
	};
}

export function findAnswerById(q: InternalQuestionState, id: string) {
	return q.answers.find((a) => a.id === id);
}

export function voteForAnswer(q: InternalQuestionState, answerId: string, userId: string) {
	console.log('question.addVote', { userId, answerId });

	q.answers = q.answers.map((a) => {
		if (a.votes.has(userId) && a.id !== answerId) {
			a.votes.delete(userId);
		} else if (a.id === answerId) {
			a.votes.add(userId);
		}
		return a;
	});

	if (q.state === 'voting-open') {
		emit('question', serialize(q));
	}
}

export function addAnswer(q: InternalQuestionState, userId: string, value: string) {
	let a: InternalAnswerState;

	if (q.type === 'multiple') {
		q.answers.forEach((a) => {
			a.votes.delete(userId);
		});

		a = findAnswerById(q, value);
		a.votes.add(userId);
	} else {
		a = q.answers.filter((a) => a.userId === userId)[0];
		if (a) {
			a.value = value;
		} else {
			a = answer.create(value, userId);
		}
		q.answers.push(a);
	}

	emitAdmin(
		'question.answers',
		q.answers.map((a) => answer.serialize(a, true))
	);

	return answer.serialize(a);
}

export function setState(q: InternalQuestionState, s: InternalQuestionState['state']) {
	let oldState = q.state;
	q.state = s;
	switch (s) {
		case 'open':
			emit('question.active', serialize(q));
			break;
		case 'voting-open':
			if (q.type === 'voting') {
				emit('question', serialize(q));
			}
			break;
		case 'closed':
			if (q.type === 'voting') {
				const answers = q.answers.sort((a, b) => (a.votes.size > b.votes.size ? 1 : -1));
				q.correctAnswer = answers[0].id;
			}
			emit('question.correctAnswer', q.correctAnswer);
			emit('quiz.points', getPoints());
			break;
	}
	console.log('question.state ', oldState + ' --> ' + q.state);
	emit('question.state', q.state);
}

export function start(q: InternalQuestionState) {
	if (q.state !== 'idle') return;
	setState(q, 'open');
}

export function end(q: InternalQuestionState) {
	if (q.type === 'voting') {
		if (q.state === 'open') {
			setState(q, 'voting-open');
		} else {
			setState(q, 'closed');
		}
	} else {
		if (q.state === 'open') {
			setState(q, 'closed');
		}
	}
}

export function getHousePoints(q: InternalQuestionState) {
	const houses = {
		hufflepuff: 0,
		ravenclaw: 0,
		gryffindor: 0,
		slytherin: 0
	};

	if (q.state !== 'closed') return houses;

	if (q.type === 'multiple') {
		q.answers.forEach((a) => {
			if (a.id === q.correctAnswer) {
				a.votes.forEach((uId) => {
					const { house } = findUserByID(uId);
					if (house in houses) {
						houses[house]++;
					}
				});
			}
		});
	} else if (q.type === 'voting') {
		q.answers.forEach((a) => {
			const { house } = findUserByID(a.userId);
			if (house in houses) {
				houses[house] += a.votes.size;
			}
		});
	}

	return houses;
}

export function getUserPoints(q: InternalQuestionState) {
	if (q.state !== 'closed') return [];

	if (q.type === 'multiple') {
		const correctAnswer = q.answers.find((a) => a.id === q.correctAnswer);
		return [...correctAnswer?.votes?.values()].map((u) => {
			return {
				userId: u,
				pts: 1
			};
		});
	} else if (q.type === 'voting') {
		return q.answers
			.map((a) => {
				return {
					userId: a.userId,
					pts: a.votes.size
				};
			})
			.filter((v) => v.pts > 0);
	}
}
