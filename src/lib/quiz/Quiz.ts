import Question from './Question';
import { nanoid } from 'nanoid';
import wss from '$lib/wss';
import * as data from './data';

const houses = {
	hufflepuff: 0,
	ravenclaw: 0,
	gryffindor: 0,
	slytherin: 0
};

export default class Quiz {
	name: 'Quiz' = 'Quiz';
	questions: Question[];
	description: string;
	id = nanoid();
	activeQuestion: Question;
	startsAt: number;

	state: 'registration' | 'running' | 'results' = 'registration';

	users: { name: string; id: string; house: string }[] = [];

	constructor() {
		wss.then((ws) => {
			ws.on('connection', (ws: any) => {
				ws.send(JSON.stringify({ type: 'quiz', data: this.toJSON() }));
			});
		});
	}

	start() {
		this.state = 'running';
		this.questions[0].start();
		this.emit('quiz', this.toJSON());
		this.emitAdmin('quiz', this.toJSON(true));
		this.emit('quiz.points', this.getPoints());
	}

	startWithTimer(time = 10000) {
		this.startsAt = Date.now() + time;
		this.emit('quiz.startsAt', this.startsAt);
		setTimeout(() => {
			this.start();
		}, time);
	}

	findUserByID(userId: string) {
		return this.users.find((u) => u.id === userId);
	}

	async emit(eventType: string, data: unknown) {
		console.log('quiz.emit ' + eventType);
		(await wss).emit(eventType, data);
	}

	async emitAdmin(eventType: string, data: unknown) {
		console.log('quiz.emitAdmin ' + eventType);
		(await wss).emitAdmin(eventType, data);
	}

	addAnswer(userId: string, answerId: string) {
		console.log('quiz.addAnswer', { userId, answerId });
		return this?.activeQuestion.addAnswer(userId, answerId);
	}

	addVote(userId: string, answerId: string) {
		console.log('quiz.addVote', { userId, answerId });
		return this?.activeQuestion.voteForAnswer(answerId, userId);
	}

	registerUser(username: string, house: string): string {
		console.log('quiz.registerUser', { username, house });
		if (this.state !== 'registration') return;

		const user = {
			name: username,
			house,
			id: nanoid()
		};
		this.users.push(user);
		this.emit('quiz.users', this.users);
		return user.id;
	}

	load(dataSet: DataSet = data.main) {
		this.id = nanoid();
		this.questions = dataSet.questions.map((v, i) => new Question(this, v, i));
		this.state = 'registration';
		this.startsAt = 0;
		this.users = [];
		this.questions.forEach((q, i) => {
			if (i < this.questions.length) {
				q.nextQuestion = this.questions[i + 1];
			}
		});
		this.description = dataSet.description;
		this.emit('quiz', this.toJSON());
		this.emitAdmin('quiz', this.toJSON(true));
	}

	getQuestion() {
		return this.activeQuestion.toJSON();
	}

	endQuestion() {
		if (this.activeQuestion.state === 'closed') {
			if (this.activeQuestion.nextQuestion) {
				this.activeQuestion.nextQuestion.start();
			} else {
				this.state = 'results';
				this.emit('quiz.state', this.state);
			}
		} else {
			this?.activeQuestion.end();
		}
	}

	getUserPoints() {
		const users = {};

		for (let i = 0; i <= this?.activeQuestion?.index; i++) {
			this.questions[i].getUserPoints().map(({ userId, pts }) => {
				users[userId] = userId in users ? users[userId] + pts : pts;
			});
		}

		return users;
	}

	getHouses() {
		return this.users.reduce(
			(acc, v) => {
				acc[v.house]++;
				return acc;
			},
			{ ...houses }
		);
	}
	getHousePoints() {
		const h = { ...houses };

		for (let i = 0; i <= this?.activeQuestion?.index; i++) {
			const q = this.questions[i].getHousePoints();
			h.gryffindor += q.gryffindor;
			h.ravenclaw += q.ravenclaw;
			h.slytherin += q.slytherin;
			h.hufflepuff += q.hufflepuff;
		}

		// Adjust points for team size
		const houseUsers = this.getHouses();
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

	getPoints() {
		return {
			users: this.getUserPoints(),
			house: this.getHousePoints()
		};
	}

	toJSON(isAdmin = false) {
		const obj = {
			startsAt: this.startsAt,
			id: this.id,
			amount: this.questions.length,
			state: this.state,
			name: this.name,
			users: this.users,
			description: this.description,
			activeQuestion: this?.activeQuestion?.toJSON()
		};

		if (isAdmin) {
			obj['types'] = Object.keys(data);
			obj['questions'] = this.questions.map((v) => v.toJSON());
		}

		return obj;
	}
}
