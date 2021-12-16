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
		case 'load-type':
			quiz.load(body.type);
			break;
		case 'start-quiz-timer':
			const { time } = body;
			quiz.startWithTimer(time);
			break;
		case 'end-quiz':
			quiz.reset();
			break;
		case 'start-quiz':
			quiz.start();
			break;
		case 'close-question':
		case 'close-voting':
		case 'end-question':
			quiz.endQuestion();
			break;
		default:
			console.log('Unknown Action', action);
			return {
				status: 404
			};
	}

	return {
		status: 200
	};
}
