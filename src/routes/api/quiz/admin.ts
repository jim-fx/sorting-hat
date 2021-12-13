import quiz from '$lib/quiz';

export async function get({ locals }) {
	return {
		body: quiz.toJSON(locals.isAdmin)
	};
}
