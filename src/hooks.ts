import { JWT_SECRET } from '$lib/config';
import type { Handle } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export const handle: Handle = async ({ request, resolve }) => {
	if ('authentication' in request.headers) {
		const jwt_raw = request.headers.authentication.replace('Bearer ', '');
		try {
			const decoded = await jwt.verify(jwt_raw, JWT_SECRET);
			request.locals.user = decoded;
			request.locals.isAdmin = decoded?.user?.role !== 'ADMIN';
		} catch (err) {
			console.log('');
		}
	}

	const response = await resolve(request);

	return {
		...response,
		headers: {
			'Access-Control-Allow-Origin': 'silvester.jim-fx.com',
			'Access-Control-Allow-Headers': 'Content-Type, Authentication',
			'Access-Control-Request-Headers': 'Content-Type, Authentication',
			'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
			'Access-Control-Allow-Credentials': true,
			...response.headers
		}
	};
};
