import type Animator from '$lib/animator';
import { finished } from '$lib/stores';
import { SvelteComponent, tick } from 'svelte';
import { writable } from 'svelte/store';

export const activeAction = writable<Action>();

export class Action {
	audio: HTMLAudioElement;
	text: string;
	duration = 5;
	static anim: Animator;
	isLast = true;
	state = writable('suspended');
	nextActions: { name?: string; action: Action }[] = [];
	data: unknown;

	element: typeof SvelteComponent;

	private events: { [eventName: string]: ((data?: unknown) => void)[] } = {};

	constructor({
		audioFile,
		element,
		text
	}: {
		audioFile?: string;
		text: string;
		element?: typeof SvelteComponent;
	}) {
		this.text = text;
		this.element = element;
		if (audioFile) this.audio = new Audio('audio/' + audioFile);
	}

	async start(): Promise<void> {
		this.setActive();

		await tick();

		this.emit('start');

		if (this.audio) {
			this.duration = this.audio.duration;
			this.state.set('running');
			this.audio.play();

			Action.anim.params.wiggleMouth = 1;

			const int = setInterval(() => {
				this.emit('progress', this.audio.currentTime / this.audio.duration);
			}, 200);

			this.audio.addEventListener(
				'ended',
				() => {
					clearInterval(int);
					setTimeout(() => {
						this.speechEnded();
					}, 500);
				},
				{ once: true }
			);
		} else {
			this.duration = 5;

			if (this.text) {
				this.duration = Math.max(this.text.split(' ').length * 0.08, 2);
				console.log(this.duration);
			}

			this.state.set('running');
			setTimeout(() => {
				this.speechEnded();
			}, this.duration * 1000);
		}
	}

	private speechEnded() {
		this.emit('speech-ended');
		Action.anim.params.wiggleMouth = 0;
		if (this.element) {
			this.state.set('input');
		} else {
			this.finish();
		}
	}

	handleElementCallback(d: unknown): void {
		console.log('Got Data: ', d);
		this.data = d;
		this.emit('data', d);
		this.finish();
	}

	private finish() {
		this.state.set('finished');
		this.emit('end');
		console.log('Finished', this.nextActions);
		if (this.nextActions.length === 1 && !('name' in this.nextActions[0])) {
			this.nextActions[0].action.start();
		}

		if (!this.nextActions.length) {
			finished.set(true);
		}
	}

	private emit(eventName: string, data?: unknown): void {
		if (eventName in this.events) {
			this.events[eventName].forEach((cb) => cb(data));
		}
	}

	addEventListener(eventName: string, callback: (data: any) => void): () => void {
		this.events[eventName] =
			eventName in this.events ? [...this.events[eventName], callback] : [callback];
		return () => {
			this.events[eventName] = this.events[eventName].filter((cb) => cb !== callback);
		};
	}

	setActive(): void {
		activeAction.set(this);
	}

	addAction(name: string | Action, action?: Action): void {
		this.isLast = false;
		if (typeof name !== 'string') {
			this.nextActions.push({ action: name });
		} else {
			this.nextActions.push({ name, action });
		}
	}
}
