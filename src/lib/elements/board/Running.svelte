<script lang="ts">
	import { pointStore, QuizType } from '$lib/stores';
	import Crest from '$lib/elements/Crest.svelte';
	import SortableList from 'svelte-sortable-list';
	import { HouseColors, HouseName } from '$lib/houses';

	export let quiz: QuizType;
	$: question = quiz?.activeQuestion;
	$: answer = question?.answers.find((a) => a?.id === question?.correctAnswer);

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

	$: sortedHouses = houses.sort((a, b) => (a.pts > b.pts ? -1 : 1));
</script>

<div class="container">
	<div class="house-wrapper">
		<SortableList list={sortedHouses} key="name" let:item>
			<div class="house" style={`--color: ${HouseColors[item.name]}`}>
				<div class="crest">
					<Crest house={item.name} showName />
				</div>

				<h2>
					{item.pts} Punkte
				</h2>
			</div>
		</SortableList>
	</div>

	<div class="current-question">
		{#if question}
			<h1>
				{question?.description}
			</h1>
			{#if answer}
				<p>{answer.value}</p>
			{:else}
				<p>{answered}/{quiz.users.length}</p>
			{/if}
		{/if}
	</div>
</div>

<style>
	.container {
		position: relative;
		display: grid;
		width: calc(100vw - 50px);
		height: calc(100vh - 50px);
		box-sizing: border-box;
		grid-template-columns: minmax(460px, auto) 1.1fr;
		grid-template-rows: 1.2fr 0.8fr;
		gap: 0px 0px;
		grid-template-areas:
			'left question'
			'left info';
	}

	.container :global(li) {
		height: 25%;
		padding: 0px 19px;
		box-sizing: border-box;
		border: none !important;
	}

	.container :global(ul) {
		height: 100%;
	}

	.house {
		position: relative;
		height: 100%;
		box-sizing: border-box;
		display: grid;
		grid-template-columns: 20vh 1.1fr;
		place-items: center;
	}

	.house > * {
		z-index: 1;
	}

	.house::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		opacity: 0.5;
		background-color: var(--color);
		background-blend-mode: multiply;
		z-index: 0;
	}

	.house > .crest {
		filter: drop-shadow(10px 10px 5px rgba(0, 0, 0, 1));
	}

	.house-wrapper {
		grid-area: left;
		background: url('/card-front.png');
		background-size: 100% 100%;
		padding: 20px 0px;
		box-sizing: border-box;
		height: 100%;
	}

	.current-question {
		place-self: baseline;
		width: 80%;
		margin-left: 10%;
		grid-area: question;
	}
</style>
