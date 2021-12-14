import { browser } from '$app/env';
import { decodeJWT } from '$lib/helpers';

const { VITE_API_URL = '' } = import.meta.env as unknown as { VITE_API_URL: string };

async function send(
	_url: string,
	{ method, body, token }: { method: string; body?: unknown; token?: string }
): Promise<Response> {
	const options = { method };
	if (body) {
		options['body'] = JSON.stringify(body);
	}

	if ('localStorage' in globalThis && 'jwt' in localStorage) {
		options['headers'] = {
			Authentication: `Bearer ${token || localStorage.getItem('jwt')}`
		};
	}

	if (method === 'POST' && body) {
		if (!('headers' in options)) options['headers'] = {};
		options['headers']['Content-Type'] = 'application/json';
	}

	const url = (VITE_API_URL ? VITE_API_URL + '/' : '/') + _url;

	return fetch(url, options);
}

export function get(apiPath: string, token?: string): Promise<Response> {
	return send(apiPath, { method: 'GET', token });
}

// To wake up the heroku instance
//get('api/houses');
import { emit } from './ws';
export { on, emit } from './ws';

if (browser && 'jwt' in localStorage) {
	const { jwt } = localStorage;
	const { role } = decodeJWT(jwt);
	console.log('DECODE', role);
	if (role === 'ADMIN') {
		emit('admin', jwt);
	}
}

export function post(apiPath: string, body: unknown, token?: string): Promise<Response> {
	return send(apiPath, { method: 'POST', body, token });
}

export async function login(username: string, password: string): Promise<boolean> {
	const res = await post('api/auth/login', { username, password });

	if (!res.ok) {
		return false;
	}

	const { token } = await res.json();

	if (token) {
		localStorage.setItem('jwt', token);
		return true;
	} else {
		return false;
	}
}
