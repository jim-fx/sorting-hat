import * as state from '$lib/state';
import { is_function } from 'svelte/internal';

export function get() {
	return {
		body: state.getState()
	};
}

export function post({ body, locals }) {
	const { isAdmin } = locals;
	if (!isAdmin) return;

	const { state: newState, points, reset } = body;

	if (state) {
		state.setState(newState);
	}

	if (points) {
		state.addHousePoints(points);
	}

	if (reset) {
		state.resetPoints();
	}

	return {
		body: state
	};
}
