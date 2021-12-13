import quiz from '$lib/quiz';

export async function get() {
	return {
		body: quiz.toJSON()
	};
}

export async function post({ body, locals }) {
	console.log(locals);
	if (!locals.isAdmin) return;

	const { action } = body;
	console.log('Action', action);
	switch (action) {
		case 'start':
			quiz.start();
			break;
	}

	return {
		status: 200
	};
}
