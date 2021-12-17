import type { InternalQuestionState } from './Question';
import { nanoid } from 'nanoid';
import wss from '$lib/wss';
import DataSet from './data';
import type { DataSetID } from './data';
import * as BoardState from '$lib/state';
import * as question from './Question';
import prisma from '$lib/db';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

const houses = {
	hufflepuff: 0,
	ravenclaw: 0,
	gryffindor: 0,
	slytherin: 0
};

export type User = {
	name: string;
	id: string;
	house: string;
};

export type InternalState = {
	name: string;
	questions: InternalQuestionState[];
	description: string;
	id: string;
	type: DataSetID;
	readonly types: DataSetID[];
	readonly amount: number;
	activeQuestion?: InternalQuestionState;
	startsAt: number;
	state: 'registration' | 'running' | 'results';
	users: User[];
};

export type QuizState = ReturnType<typeof serialize>;

export let state: InternalState = {
	name: 'Quiz',
	questions: [],
	description: '',
	id: nanoid(),
	type: 'main',
	types: Object.keys(DataSet) as DataSetID[],
	get amount() {
		return state.questions.length;
	},
	activeQuestion: undefined,
	startsAt: 0,
	state: 'registration',
	users: []
};

export function serialize(isAdmin = false) {
	const obj = {
		...state,
		questions: state.questions.map((q) => question.serialize(q, isAdmin)),
		activeQuestion: question.serialize(state.activeQuestion, isAdmin)
	};

	return obj;
}

wss.then((ws) => {
	ws.on('connection', (ws: any) => {
		ws.send(JSON.stringify({ type: 'quiz', data: serialize() }));
	});
});

export async function emit(eventType: string, data: unknown) {
	console.log('quiz.emit ' + eventType);
	(await wss).emit(eventType, data);
}

export async function emitAdmin(eventType: string, data: unknown) {
	console.log('quiz.emitAdmin ' + eventType);
	(await wss).emitAdmin(eventType, data);
}

export function getHouses() {
	return state.users.reduce(
		(acc, v) => {
			acc[v.house]++;
			return acc;
		},
		{ ...houses }
	);
}

export function getHousePoints() {
	const h = { ...houses };

	for (let i = 0; i <= state?.activeQuestion?.index; i++) {
		const q = question.getHousePoints(state.questions[i]);
		h.gryffindor += q.gryffindor;
		h.ravenclaw += q.ravenclaw;
		h.slytherin += q.slytherin;
		h.hufflepuff += q.hufflepuff;
	}

	// Adjust points for team size
	const houseUsers = getHouses();
	const houseUserArray = Object.entries(houseUsers)
		.map(([name, amount]) => {
			return {
				name,
				amount
			};
		})
		.sort((a, b) => (a.amount > b.amount ? -1 : 1));
	const [{ amount: maxAmount }] = houseUserArray;

	Object.keys(h).forEach((houseName) => {
		const factor = maxAmount / houseUsers[houseName];
		h[houseName] *= factor;
	});

	return h;
}

export function getPoints() {
	return {
		users: getUserPoints(),
		house: getHousePoints()
	};
}

export function findUserByID(userId: string) {
	return state.users.find((u) => u.id === userId);
}

export function start() {
	state.state = 'running';
	setActiveQuestion(state.questions[0]);
	question.start(state.activeQuestion);
	emit('quiz', serialize());
	emitAdmin('quiz', serialize(true));
	emit('quiz.points', getPoints());
}

export function startWithTimer(time = 10000) {
	state.startsAt = Date.now() + time;
	emit('quiz.startsAt', state.startsAt);
	setTimeout(start, time);
}

export function addAnswer(userId: string, answerId: string) {
	console.log('quiz.addAnswer', { userId, answerId });
	return question.addAnswer(state?.activeQuestion, userId, answerId);
}

export function addVote(userId: string, answerId: string) {
	return question.voteForAnswer(state?.activeQuestion, answerId, userId);
}

export function registerUser(username: string, house: string): string {
	console.log('quiz.registerUser', { username, house });
	if (state.state !== 'registration') return;

	const user = {
		name: username,
		house,
		id: nanoid()
	};
	state.users.push(user);
	emit('quiz.users', state.users);
	return user.id;
}

export function load(dataSetId: DataSetID = state.type) {
	console.log('quiz.load', dataSetId);

	if (!(dataSetId in DataSet)) return;

	const dataSet = DataSet[dataSetId] as DataSet;
	state.type = dataSetId;
	state.state = 'registration';
	state.questions = dataSet.questions.map((v, i) => question.create(v, i));
	state.startsAt = 0;
	state.questions.forEach((q, i) => {
		if (i < state.questions.length) {
			q.nextQuestion = state.questions[i + 1];
		}
	});
	state.description = dataSet.description;
	emit('quiz', serialize());
	emitAdmin('quiz', serialize(true));
}

export function reset() {
	state.users = [];
	state.id = nanoid();
	load();
}

export function getQuestion() {
	return question.serialize(state?.activeQuestion);
}

function setActiveQuestion(q: InternalQuestionState) {
	state.activeQuestion = q;
	question.start(state.activeQuestion);
}

export function endQuestion() {
	if (state.activeQuestion.state === 'closed') {
		if (state.activeQuestion.nextQuestion) {
			setActiveQuestion(state.activeQuestion.nextQuestion);
		} else {
			state.state = 'results';
			BoardState.addHousePoints(getHousePoints());

			emit('quiz.state', state.state);
			prisma.quiz.create({
				data: {
					type: state.type,
					data: JSON.stringify(serialize(true))
				}
			});
		}
	} else {
		question.end(state?.activeQuestion);
	}
}

export function getUserPoints() {
	const users = {};

	for (let i = 0; i <= state?.activeQuestion?.index; i++) {
		question.getUserPoints(state.questions[i]).map(({ userId, pts }) => {
			users[userId] = userId in users ? users[userId] + pts : pts;
		});
	}

	return users;
}
