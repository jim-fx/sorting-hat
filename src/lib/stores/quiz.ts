import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import localStorageStore from '../localStorageStore';
import type { default as Quiz, QuizState } from '$lib/quiz';
import type { getPoints } from '$lib/quiz';
import { on } from '$lib/client-api';
import { mergeDeep } from '$lib/helpers';

export type QuestionType = QuizState['questions'][0];
export const quiz: Writable<QuizState> = writable();

quiz.subscribe((v) => {
	'window' in globalThis && (window['q'] = v);
});

function bindSingleKey(key: keyof QuizState) {
	on('quiz.' + key, (value: QuizState[typeof key]) => {
		quiz.update((q) => {
			//@ts-ignore
			q[key] = value as QuizState[typeof key];
			return q;
		});
	});
}

on('question.state', (state: string) => {
	quiz.update((q) => {
		q.activeQuestion.state = state as any;
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

bindSingleKey('users');
bindSingleKey('startsAt');
bindSingleKey('state');

on('question.answers', (d: QuestionType['answers']) => {
	quiz.update((q) => {
		console.log('question.answers', d);
		q.activeQuestion.answers = d;
		return q;
	});
});

on('quiz', (v: QuizState) => {
	quiz.update((q = {} as QuizState) => {
		return mergeDeep(q, v);
	});
});
