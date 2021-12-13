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

export const quiz: Writable<ReturnType<typeof Quiz['toJSON']>> = writable();
on('question.state', (v: Question) => {
	console.log('Question', v);
	quiz.update((q) => {
		q.question = v;
		return q;
	});
});

on('quiz.users', (users: { name: string; id: string }[]) => {
	quiz.update((v) => {
		v.users = users;
		return v;
	});
});

on('quiz.state', (v: typeof Quiz) => {
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
