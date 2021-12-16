<script lang="ts">
	import type { HouseName } from '$lib/houses';
	import { pointStore, QuizType } from '$lib/stores';
	import LeaderBoard from '../admin/LeaderBoard.svelte';
	import Glass from './Glass.svelte';

	export let quiz: QuizType;
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

	$: sortedHouses = houses.sort((a, b) => (a.pts > b.pts ? -1 : 1));
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

	// setInterval(() => {
	// 	pointStore.update((p) => {
	// 		p.house['gryffindor'] = Math.round(Math.random() * 20);
	// 		p.house['ravenclaw'] = Math.round(Math.random() * 20);
	// 		p.house['slytherin'] = Math.round(Math.random() * 20);
	// 		p.house['hufflepuff'] = Math.round(Math.random() * 20);
	// 		return p;
	// 	});
	// }, 5000);
</script>

<div class="container">
	<div class="house-wrapper">
		{#each houses.sort((a, b) => (a.name > b.name ? -1 : 1)) as h}
			<div class="glass-wrapper">
				<Glass house={h} maxPoints={sortedHouses[0].pts} />
			</div>
		{/each}
	</div>

	<div class="current-question">
		{#if question}
			<h1>
				{question?.description}
			</h1>

			{#if !answer}
				<p>{answered}/{quiz.users.length}</p>
			{/if}
			{#each answers as a}
				<p class="answer" class:right={answer && answer.id === a.id}>{a.value}</p>
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

	.house-wrapper {
		display: flex;
		grid-area: left;
		place-self: center;
		justify-self: center;
		/* background: url('/card-front.png'); */
		max-width: 75vh;
		background-size: 100% 100%;
		padding: 20px 0px;
		box-sizing: border-box;
		height: fit-content;
	}

	.glass-wrapper {
		width: 23%;
		display: inline-block;
		filter: drop-shadow(7px 7px 18px black);
	}

	.current-question {
		place-self: baseline;
		width: 80%;
		grid-area: question;
	}

	.answer {
		margin: 10px 0px;
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
