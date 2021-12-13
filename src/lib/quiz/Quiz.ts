import Question from './Question';
import { nanoid } from 'nanoid';
import wssPromise from '$lib/wss';
import { JWT_SECRET } from '$lib/config';
import jwt from 'jsonwebtoken';
import * as data from './data';

async function decode(rawInput: string) {
	return jwt.verify(rawInput, JWT_SECRET);
}

wssPromise.then((wss) => {
	wss.on('connection', function connection(ws) {
		console.log('Connection');
		ws.on('message', function message(data) {
			console.log('received: %s', data);
		});
	});
});

export default class Quiz {
	name: 'Quiz' = 'Quiz';
	questions: Question[];
	description: string;
	id = nanoid();
	activeQuestion: Question;

	state: 'registration' | 'running' | 'results' = 'registration';

	users: { name: string; id: string }[] = [];

	constructor() {}

	start() {
		this.state = 'running';
		this.questions[0].start();
		this.emit('quiz.state', this.toJSON());
	}

	async emit(eventType: string, data: unknown) {
		console.log('Quiz.emit ' + eventType, data);
		const wss = await wssPromise;
		wss?.clients.forEach(function each(client) {
			client.send(JSON.stringify({ type: eventType, data }));
		});
	}

	registerUser(username: string): string {
		if (this.state !== 'registration') return;
		const user = {
			name: username,
			id: nanoid()
		};
		this.users.push(user);
		this.emit('quiz.users', this.users);
		return user.id;
	}

	load(dataSet: DataSet) {
		this.questions = dataSet.questions.map((v) => new Question(this, v));
		this.description = dataSet.description;
	}

	getQuestion() {
		return this.activeQuestion.toJSON();
	}

	endQuestion() {
		this.activeQuestion.end();
	}

	toJSON(isAdmin = false) {
		const obj = {
			id: this.id,
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

		// console.log('Quiz.toJSON', obj);

		return obj;
	}
}
