import { get, on } from '$lib/client-api';
import type { getPoints } from '$lib/quiz';
import type { State } from '$lib/state';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import localStorageStore from '../localStorageStore';

export const userData = localStorageStore('user-data', {
	name: '',
	confidence: -1,
	house: '',
	role: 'USER'
});

export type PointType = ReturnType<typeof getPoints>;
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

export const finished = writable(false);

interface StateStore extends Writable<State> {
	init: () => Promise<void>;
}

let state: StateStore;
export function getStateStore() {
	if (state) return state;
	state = writable({}) as StateStore;

	state['init'] = async () => {
		const s = await get('api/state');
		state.set(await s.json());
	};

	on('state.state', (s: State['state']) => {
		state.update((_s) => {
			_s.state = s;
			return _s;
		});
	});

	on('state.points', (pts: State['points']) => {
		state.update((_s) => {
			_s.points = pts;
			return _s;
		});
	});
	return state;
}

export { default as orientation } from './orientation';

export * from './quiz';
