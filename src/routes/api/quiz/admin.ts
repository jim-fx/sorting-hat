import quiz from '$lib/quiz';

export async function get({ locals }) {
	return {
		status: 200,
		body: quiz.serialize(locals.isAdmin)
	};
}
