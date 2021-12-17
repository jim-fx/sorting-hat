import { JWT_SECRET } from '$lib/config';
import Quiz from '$lib/quiz';
import jwt from 'jsonwebtoken';

export async function post({ body, locals }) {
	if (typeof body === 'string') {
		try {
			body = JSON.stringify(body);
		} catch (error) {
			console.log('Error Parsing Body');
		}
	}

	const { username = body.name, house } = body;

	if (!username || !house) {
		return {
			status: 400
		};
	}

	let u;
	if (locals?.user?.id) {
		u = Quiz.findUserByID(locals.user.id);
	}

	if (u) {
		return {
			status: 401
		};
	}

	const userId = Quiz.registerUser(username, house);

	// Create token
	const token = jwt.sign({ id: userId, name: username, qid: Quiz.state.id }, JWT_SECRET, {
		expiresIn: '4h'
	});

	return {
		status: 200,
		body: {
			token
		}
	};
}
