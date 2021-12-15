import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import localStorageStore from './localStorageStore';
import type Quiz from '$lib/quiz';
import { on, get } from './client-api';
import type Question from './quiz/Question';
import { mergeDeep } from './helpers';

export const userData = localStorageStore('user-data', {
	name: '',
	confidence: '',
	house: '',
	role: 'USER'
});

export type QuizType = ReturnType<typeof Quiz['toJSON']>;
export type QuestionType = ReturnType<Question['toJSON']>;
export type PointType = ReturnType<typeof Quiz['getPoints']>;
export const pointStore: Writable<PointType> = writable({
	users: {},
	house: {
		ravenclaw: 0,
		gryffindor: 0,
		slytherin: 0,
		hufflepuff: 0
	}
});

on('quiz.points', (points: PointType) => {
	pointStore.set(points);
});

export const quiz: Writable<QuizType> = writable();

on('question.state', (state: string) => {
	quiz.update((q) => {
		console.groupCollapsed('question.state', state);
		q.activeQuestion.state = state as any;
		console.groupEnd();
		return q;
	});
});

on('question.active', (aq: QuestionType) => {
	quiz.update((q) => {
		q.activeQuestion = aq;
		return q;
	});
});

on('question', (v: QuestionType) => {
	quiz.update((q) => {
		q.activeQuestion = v;
		return q;
	});
});

on('question.correctAnswer', (v: QuestionType['correctAnswer']) => {
	quiz.update((q) => {
		q.activeQuestion.correctAnswer = v;
		return q;
	});
});

on('quiz.users', (users: QuizType['users']) => {
	quiz.update((v) => {
		v.users = users;
		return v;
	});
});

on('quiz.startsAt', (s: QuizType['startsAt']) => {
	quiz.update((q) => {
		q.startsAt = s;
		return q;
	});
});

on('question.answers', (d: QuestionType['answers']) => {
	quiz.update((q) => {
		q.activeQuestion.answers = d;
		return q;
	});
});

on('quiz.state', (s: QuizType['state']) => {
	quiz.update((q) => {
		q.state = s;
		return q;
	});
});

on('quiz', (v: QuizType) => {
	quiz.update((q = {} as QuizType) => {
		return mergeDeep(q, v);
	});
});

export const finished = writable(false);
