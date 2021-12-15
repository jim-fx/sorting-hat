import { browser } from '$app/env';
import { decodeJWT } from '$lib/helpers';
// To wake up the heroku instance
//get('api/houses');
import { emit } from './ws';

const { VITE_API_URL = '' } = import.meta.env as unknown as { VITE_API_URL: string };

async function send(
	_url: string,
	{ method, body, token }: { method: string; body?: unknown; token?: string }
): Promise<Response> {
	const options = { method };
	if (body) {
		options['body'] = JSON.stringify(body);
	}

	let _token = 'localStorage' in globalThis ? localStorage.getItem('jwt') : '';
	if (token) {
		_token = token;
	}

	if (_token) {
		options['headers'] = {
			Authentication: `Bearer ${token || _token}`
		};
	}

	if (method === 'POST' && body) {
		if (!('headers' in options)) options['headers'] = {};
		options['headers']['Content-Type'] = 'application/json';
	}

	const url = (VITE_API_URL ? VITE_API_URL + '/' : '/') + _url;

	console.groupCollapsed('send.' + method.toLowerCase(), url);
	console.log({ body, token, headers: options['headers'] });
	console.groupEnd();

	return fetch(url, options);
}

export function get(apiPath: string, token?: string): Promise<Response> {
	return send(apiPath, { method: 'GET', token });
}

export { emit, on } from './ws';

export function setUserStore(u) {
	if (browser && 'jwt' in localStorage) {
		const { jwt } = localStorage;
		const { role } = decodeJWT(jwt);
		if (role === 'ADMIN') {
			u.update((v) => {
				v.role = role;
				return v;
			});
			emit('admin', jwt);
		}
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
