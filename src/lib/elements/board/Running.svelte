<script lang="ts">
	import type { HouseName } from '$lib/houses';
	import type { QuizState } from '$lib/quiz';
	import { pointStore } from '$lib/stores';
	import LeaderBoard from '../admin/LeaderBoard.svelte';
	import Glass from './Glass.svelte';
	import HousePoints from './HousePoints.svelte';

	export let quiz: QuizState;
	$: question = quiz?.activeQuestion;
	$: answers = question?.answers;
	$: answer = answers?.find((a) => a?.id === question?.correctAnswer);
	$: answered =
		question.type === 'multiple'
			? question.answers.map((a) => a.votes.length).reduce((acc, v) => acc + v, 0)
			: question.answers.length;

	$: houses = Object.entries($pointStore?.house).map(([name, pts]) => {
		return {
			name: name as HouseName,
			pts
		};
	});

	function findUser(userId: string) {
		return quiz.users.find((user) => user.id === userId);
	}

	$: sortedUsers = Object.entries($pointStore.users)
		.map(([userId, pts]) => {
			console.log(userId, pts);
			return {
				...findUser(userId),
				pts
			};
		})
		.sort((a, b) => (a.pts > b.pts ? -1 : 1));

	$: console.log(sortedUsers);
</script>

<div class="container" id="board-running">
	<HousePoints houses={$pointStore.house} />

	<div class="current-question">
		{#if question}
			<h1>
				{question?.description}
			</h1>

			{#if !answer}
				<p>{answered}/{quiz.users.length}</p>
			{/if}
			{#each answers as a}
				<p
					class="answer"
					class:right={question?.state === 'closed' && answer && answer.id === a.id}
				>
					{a.value}
				</p>
			{/each}
		{/if}
	</div>

	<LeaderBoard users={sortedUsers} />
</div>

<style>
	.container {
		position: relative;
		display: grid;
		width: calc(100vw - 50px);
		height: calc(100vh - 50px);
		box-sizing: border-box;
		grid-template-columns: 2fr 1fr;
		grid-template-rows: 1fr 40vh;
		gap: 0px 0px;
		grid-template-areas:
			'left question'
			'left info';
	}

	.current-question {
		place-self: baseline;
		width: 80%;
		grid-area: question;
	}

	.answer {
		margin: 10px 0px;
		margin-left: -10px;
		padding: 10px;
		width: fit-content;
		border-radius: 5px;
		transition: background-color 0.3s ease;
		background-color: transparent;
	}

	.answer.right {
		background-color: green;
	}
</style>
