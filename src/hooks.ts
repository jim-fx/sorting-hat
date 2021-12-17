import { JWT_SECRET } from '$lib/config';
import type { Handle } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export const handle: Handle = async ({ request, resolve }) => {
	let wrongJWT = false;

	if ('authentication' in request.headers) {
		const jwt_raw = request.headers.authentication.replace('Bearer ', '');
		try {
			const decoded = await jwt.verify(jwt_raw, JWT_SECRET);
			request.locals.user = decoded;
			request.locals.isAdmin = decoded?.user?.role !== 'ADMIN';
		} catch (err) {
			wrongJWT = true;
		}
	}

	const response = await resolve(request);

	if (wrongJWT && !request.path.includes('auth')) {
		response.status = 401;
		console.log('stale jwt');
	}

	return {
		...response,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': 'Content-Type, Authentication',
			'Access-Control-Request-Headers': 'Content-Type, Authentication',
			'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, OPTION',
			'Access-Control-Allow-Credentials': 'true',
			...response.headers
		}
	};
};
