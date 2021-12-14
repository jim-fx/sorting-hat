import Quiz from '$lib/quiz';

export async function post({ body: answerId, locals }) {
	console.log('Got Answer', locals);
	return {
		status: 200,
		body: await Quiz.addAnswer(locals.user.id, answerId)
	};
}
