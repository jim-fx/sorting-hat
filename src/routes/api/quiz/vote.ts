import Quiz from '$lib/quiz';

export async function post({ body: voteId, locals }) {
	console.log('Got Answer', locals);
	return {
		status: 200,
		body: await Quiz.addVote(locals.user.id, voteId)
	};
}
