import jwt from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { JWT_SECRET } from '$lib/config';
import prisma from '$lib/db';

export async function post({ body }) {
	const { username, password } = body;
	if (!username || !password) {
		return {
			status: 400
		};
	}

	const user = await prisma.user.findFirst({ where: { name: username } });
	if (!user) {
		return { status: 404 };
	}

	const passwordsMatch = await compare(password, user.hash);
	if (!passwordsMatch) {
		return {
			status: 403
		};
	}

	// Create token
	const token = jwt.sign({ user_id: user.uid, name: user.name, role: user.role }, JWT_SECRET, {
		expiresIn: '2h'
	});

	console.log(`LoggedIn: ${username}`);

	return {
		status: 200,
		body: {
			token
		}
	};
}
