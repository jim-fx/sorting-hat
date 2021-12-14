import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import localStorageStore from './localStorageStore';
import type Quiz from '$lib/quiz';
import { on } from './client-api';
import type Question from './quiz/Question';

export const userData = localStorageStore('user-data', {
	name: '',
	confidence: '',
	house: '',
	role: 'USER'
});

type QuizType = ReturnType<typeof Quiz['toJSON']>;
type QuestionType = ReturnType<Question['toJSON']>;

export const quiz: Writable<QuizType> = writable();

on('question.state', (state: string) => {
	quiz.update((q) => {
		console.groupCollapsed('question.state', state);
		q.activeQuestion.state = state as any;
		console.log(q);
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

on('quiz.users', (users: { name: string; id: string }[]) => {
	quiz.update((v) => {
		v.users = users;
		return v;
	});
});

on('quiz', (v: QuizType) => {
	console.log('Quiz', v);
	quiz.update((q) => {
		q.id = v.id;
		q.state = v.state;
		q.activeQuestion = v.activeQuestion;
		q.description = v.description;
		q.name = v.name;
		return q;
	});
});

export const finished = writable(false);
