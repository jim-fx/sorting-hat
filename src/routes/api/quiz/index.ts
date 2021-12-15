import quiz from '$lib/quiz';

export async function get() {
	return {
		body: quiz.toJSON()
	};
}

export async function post({ body, locals }) {
	if (!locals.isAdmin) return;

	const { action } = body;

	switch (action) {
		case 'start-quiz':
			quiz.start();
			break;
		case 'close-question':
		case 'close-voting':
		case 'end-question':
			quiz.endQuestion();
			break;
	}

	return {
		status: 200
	};
}
