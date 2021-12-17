import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
let mx = 0;
let my = 0;

let wHeight = 500;
let wWidth = 500;

let oAlpha: number, oBeta: number;
function handleGyro({ alpha, beta }) {
	if (!oAlpha) oAlpha = alpha;
	if (!oBeta) oBeta = beta;
	mx = ((oBeta - beta) / 80) * -1;
	my = ((oAlpha - alpha) / 80) * -2;
	store.set({ x: mx, y: my });
}

function handleResize() {
	wHeight = window.innerHeight;
	wWidth = window.innerWidth;
}

function handleMouseMove({ clientX, clientY }) {
	mx = (clientX / wWidth) * 2 - 1;
	my = (clientY / wHeight) * 2 - 1;
	store.set({ x: mx, y: my });
}

export const store = writable({ x: 0, y: 0 });

function init() {
	wHeight = window.innerHeight;
	wWidth = window.innerWidth;

	window.addEventListener('resize', handleResize);
	window.addEventListener('mousemove', handleMouseMove);

	if (window.DeviceOrientationEvent) {
		window.addEventListener('deviceorientation', handleGyro, true);
	} else if (window.DeviceMotionEvent) {
		window.addEventListener(
			'devicemotion',
			function (event) {
				handleGyro({ alpha: event.acceleration.x * 2, beta: event.acceleration.y * 2 });
			},
			true
		);
	} else {
		window.addEventListener(
			'MozOrientation',
			function () {
				//@ts-ignore
				handleGyro({ alpha: orientation.x * 50, beta: orientation.y * 50 });
			},
			true
		);
	}
}

Object.defineProperty(store, 'x', {
	get: () => mx
});
Object.defineProperty(store, 'y', {
	get: () => my
});

Object.defineProperty(store, 'init', {
	get: () => init
});

interface OrientationStore extends Writable<{ x: number; y: number }> {
	init: () => void;
	readonly x: number;
	readonly y: number;
}

const exportStore = store as OrientationStore;

export default exportStore;
