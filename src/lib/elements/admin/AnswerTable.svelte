<script lang="ts">
	import type { QuestionType, QuizType } from '$lib/stores';

	export let users: QuizType['users'];
	export let answers: QuestionType['answers'];

	const userAnswers = users
		.map((u) => {
			const answer = answers.find((a) => a.votes.includes(u.id));

			if (answer) {
				return {
					name: u.name,
					uid: u.id
				};
			}
			return;
		})
		.filter((u) => !!u);
</script>

<div class="w-wrapper">
	<table>
		<thead>
			<td>User</td>
			{#each answers as answer}
				<td>{answer.value}</td>
			{/each}
		</thead>
		{#each users as u}
			<tr>
				<td>{u.name}</td>
				{#each answers as a}
					<td>{a.votes.includes(u.id) ? 'X' : ' '}</td>
				{/each}
			</tr>
		{/each}
	</table>
</div>

<p>{userAnswers.length} answers ({Math.floor((userAnswers.length / users.length) * 100)}%)</p>

<style>
	.w-wrapper {
		max-width: 100%;
		height: fit-content;
		overflow-y: visible;
		overflow-x: auto;
	}

	thead > td {
		color: rgba(0, 0, 0, 1);
	}

	table {
		border-collapse: collapse;
		font-size: 0.8em;
	}

	table td {
		border: 1px solid rgb(68, 68, 68);
		padding: 8px;
		color: rgba(0, 0, 0, 0.8);
	}

	table tr {
		background: rgba(196, 196, 196, 1);
	}

	table tr:nth-child(even) {
		background: rgba(196, 196, 196, 0.33);
	}
</style>
