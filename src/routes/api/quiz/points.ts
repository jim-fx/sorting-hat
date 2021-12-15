import Quiz from '$lib/quiz';

export async function get() {
	return {
		body: {
			users: Quiz.getUserPoints(),
			house: Quiz.getHousePoints()
		}
	};
}
