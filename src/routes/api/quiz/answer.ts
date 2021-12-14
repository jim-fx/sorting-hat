import Quiz from '$lib/quiz';

export async function post({ body: answerId, locals }) {
	console.log('Got Answer', locals);
	Quiz.addAnswer(locals.user.id, answerId);
	return {
		status: 200
	};
}
