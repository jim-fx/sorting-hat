import Question from './Question';
import { nanoid } from 'nanoid';
import wss from '$lib/wss';
import * as data from './data';

// const houses = {
// 	ravenclaw: 'ra',
// 	gryffindor: 'gr',
// 	slytherin: 'sl',
// 	hufflepuff: 'hu'
// };

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
		this.emit('quiz', this.toJSON());
		this.emitAdmin('quiz', this.toJSON(true));
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
		this?.activeQuestion.addAnswer(userId, answerId);
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
		this.questions = dataSet.questions.map((v) => new Question(this, v));
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
				console.log('DUnzooo');
			}
		} else {
			this?.activeQuestion.end();
		}
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
