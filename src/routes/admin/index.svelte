<script lang="ts">
	import * as c from '$lib/client-api';

	let value = 0;

	let req: Promise<unknown>;
	let reqQuiz: Promise<unknown>;

	c.on('click', () => {
		value = value + 1;
	});
</script>

<a href="admin/quiz">Quiz</a>
