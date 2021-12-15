import Question from './Question';
import { nanoid } from 'nanoid';
import wss from '$lib/wss';
import * as data from './data';

export default class Quiz {
	name: 'Quiz' = 'Quiz';
	questions: Question[];
	description: string;
	id = nanoid();
	activeQuestion: Question;

	state: 'registration' | 'running' | 'results' = 'registration';

	users: { name: string; id: string; house: string }[] = [];

	constructor() {}

	start() {
		this.state = 'running';
		this.questions[0].start();
		this.emit('quiz', this.toJSON());
		this.emitAdmin('quiz', this.toJSON(true));
	}

	findUserByID(userId: string) {
		return this.users.find((u) => u.id === userId);
	}

	async emit(eventType: string, data: unknown) {
		console.log('quiz.emit ' + eventType, data);
		(await wss).emit(eventType, data);
	}

	async emitAdmin(eventType: string, data: unknown) {
		console.log('quiz.emitAdmin ' + eventType, data);
		(await wss).emitAdmin(eventType, data);
	}

	addAnswer(userId: string, answerId: string) {
		return this?.activeQuestion.addAnswer(userId, answerId);
	}

	addVote(userId: string, answerId: string) {
		return this?.activeQuestion.voteForAnswer(answerId, userId);
	}

	registerUser(username: string, house: string): string {
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

	load(dataSet: DataSet) {
		this.questions = dataSet.questions.map((v, i) => new Question(this, v, i));
		this.questions.forEach((q, i) => {
			if (i < this.questions.length) {
				q.nextQuestion = this.questions[i + 1];
			}
		});
		this.description = dataSet.description;
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

	getHousePoints() {
		const houses = {
			hufflepuff: 0,
			ravenclaw: 0,
			gryffindor: 0,
			slytherin: 0
		};

		for (let i = 0; i <= this?.activeQuestion?.index; i++) {
			const q = this.questions[i].getHousePoints();
			houses.gryffindor += q.gryffindor;
			houses.ravenclaw += q.ravenclaw;
			houses.slytherin += q.slytherin;
			houses.hufflepuff += q.hufflepuff;
		}
		return houses;
	}

	toJSON(isAdmin = false) {
		const obj = {
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
