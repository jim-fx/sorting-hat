import { JWT_SECRET } from '$lib/config';
import Quiz from '$lib/quiz';
import jwt from 'jsonwebtoken';

export async function post({ body }) {
	if (typeof body === 'string') {
		try {
			body = JSON.stringify(body);
		} catch (error) {
			console.log('Error Parsing Body');
		}
	}

	const { username = body.name, house } = body;

	console.log('Registration', { username, house });

	if (!username || !house) {
		return {
			status: 400
		};
	}

	const userId = Quiz.registerUser(username, house);

	console.log('RegisterId', userId);

	// Create token
	const token = jwt.sign({ id: userId, name: username, qid: Quiz.id }, JWT_SECRET, {
		expiresIn: '4h'
	});

	return {
		status: 200,
		body: {
			token
		}
	};
}
