import type { HouseName } from './houses';
import { emit } from './quiz';
import prisma from '$lib/db';
import houses from './houses';

const states = {
	quiz: true,
	points: true,
	pong: true
};

export const States = Object.keys(states);

type StateType = keyof typeof states;

export interface State {
	state: StateType;
	points: Record<HouseName, number>;
}

const state: State = {
	state: 'quiz',
	points: {
		gryffindor: 0,
		ravenclaw: 0,
		slytherin: 0,
		hufflepuff: 0
	}
};

export function setState(s: StateType) {
	state.state = s;
	emit('state.state', s);
	save();
}

export function addPoints(h: HouseName, pts: number) {
	state.points[h] += pts || 0;
	emit('state.points', state.points);
	save();
}
export function addHousePoints(pts: Record<HouseName, number>) {
	if (!pts) return;

	Object.entries(pts).forEach(([h, pts = 0]) => {
		state.points[h] += pts || 0;
	});
	emit('state.points', state.points);
	save();
}

export function getState(): State {
	return { ...state };
}

export function resetPoints() {
	Object.keys(state.points).forEach((k) => {
		state.points[k] = 0;
	});
	save();
	emit('state.points', state.points);
}

async function save() {
	const s = await prisma.state.findFirst();

	try {
		await prisma.state.update({
			where: { id: s.id },
			data: {
				state: state.state,
				points: {
					update: Object.keys(state.points).map((k) => {
						return {
							where: {
								name: k
							},
							data: {
								pts: state.points[k] || 0
							}
						};
					})
				}
			}
		});
	} catch (error) {}
}

(async () => {
	const _s = await prisma.state.findFirst({ include: { points: {} } });
	if (_s) {
		const { points, state: _state } = _s;
		state.state = _state as StateType;
		points.forEach((pts) => {
			state.points[pts.name] = pts.pts || 0;
		});
		emit('state.points', state.points);
	} else {
		await prisma.state.create({
			data: {
				state: 'quiz',
				points: {
					create: houses.map((h) => {
						return {
							name: h,
							pts: 0
						};
					})
				}
			}
		});
	}
})();
