import { browser } from '$app/env';
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export default <T>(key: string, defaultValue: T): Writable<T> => {
	key = 'local-store-' + key;

	if (browser) {
		let value = defaultValue;
		if (key in localStorage) {
			try {
				value = JSON.parse(localStorage.getItem(key));
			} catch (err) {
				console.log(err);
			}
		}

		const store = writable<T>(value);

		store.subscribe((v) => {
			localStorage.setItem(key, JSON.stringify(v));
		});

		return store;
	} else {
		return writable(defaultValue);
	}
};
