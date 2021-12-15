<script lang="ts">
	import { quiz, userData } from '$lib/stores';
	import * as c from '$lib/client-api';
	import localStorageStore from '$lib/localStorageStore';
	import { decodeJWT } from '$lib/helpers';
	import Question from '$lib/elements/Question.svelte';
	import Card from '$lib/elements/Card.svelte';
	import Timer from '$lib/elements/Timer.svelte';
	import Crest from '$lib/elements/Crest.svelte';
	import { fade } from 'svelte/transition';

	let showConfetti;

	let questionStore;
	const quizUserData = localStorageStore('quiz-user-data', { id: '', qid: '', token: '' });

	$: quizState = $quiz?.state;
	$: activeQuestion = $quiz?.activeQuestion;
	$: questionState = activeQuestion?.state;
	$: users = $quiz?.users;
	let textValue: string;
	$: registered = $quizUserData?.id && $quizUserData?.qid === $quiz?.id;
	$: answeredActiveQuestion =
		activeQuestion?.type === 'multiple'
			? $questionStore?.qid === activeQuestion?.id
			: $questionStore?.qid === activeQuestion?.id && $questionStore?.value;
	$: correctAnswer = activeQuestion?.correctAnswer === $questionStore?.aid;

	$: if (questionState === 'closed' && correctAnswer) {
		setTimeout(() => {
			showConfetti();
		}, 1000);
	}

	async function register() {
		const res = await c.post('api/quiz/register', { name: $userData.name, house: $userData.house });
		const json = await res.json();
		const decoded = decodeJWT(json.token);
		$quizUserData.token = json.token;
		$quizUserData.id = decoded.id;
		$quizUserData.qid = decoded.qid;
	}

	async function handleAnswer({ detail }: { detail: string }) {
		const res = await c.post('api/quiz/answer', detail, $quizUserData.token);
		if (!res.ok) return;
		const data = await res.json();
		$questionStore.qid = activeQuestion.id;
		$questionStore.value = detail;
		if (activeQuestion.type === 'voting' && data.id) {
			$questionStore.aid = data.id;
		}
	}

	async function handleVote({ detail: voteId }) {
		const res = await c.post('api/quiz/vote', voteId, $quizUserData.token);
		console.log(await res.json());
	}

	function handleKeyDown({ key }) {
		if (key === 'L') {
			console.log($questionStore, $quiz);
		}
	}
</script>

<svelte:window on:keydown={handleKeyDown} />

<svelte:head>
	<title>Dungeon Quiz</title>
</svelte:head>

{#if quizState === 'registration'}
	<Card flipped={registered} bind:showConfetti>
		<div slot="front">
			<h1>Registration</h1>

			{#if !$userData.name || !$userData.house}
				<a href="/">Need to input your name</a>
			{:else}
				<button on:click={register}>Join the quiz</button>
			{/if}
		</div>

		<div slot="info" id="registration-success">
			{#if registered}
				<p>Warte bis das Quiz beginnt</p>
				{#if $quiz.startsAt}
					<Timer endsAt={$quiz.startsAt} />
				{/if}
			{/if}
		</div>
	</Card>
{:else if quizState === 'running' && $quiz?.activeQuestion?.id && registered}
	<Card
		flipped={questionState !== 'closed' &&
			answeredActiveQuestion &&
			questionState !== 'voting-open'}
		bind:showConfetti
	>
		<div slot="front">
			<Question
				bind:textValue
				bind:questionStore
				on:vote={handleVote}
				on:answer={handleAnswer}
				on:text={handleAnswer}
				question={$quiz.activeQuestion}
			/>
		</div>

		<div slot="back">
			{#if questionState === 'voting-open'}
				<p>Vote for the best answer</p>
			{/if}
		</div>

		<div slot="info">
			{#if answeredActiveQuestion && questionState !== 'closed' && questionState !== 'voting-open'}
				<p>Warte bis die Frage beendet wird.</p>
			{/if}
		</div>
	</Card>
{:else if quizState === 'results' && registered}
	<p>Results</p>
{:else}
	<p>Quiz Already started</p>
{/if}

<div class="crest" transition:fade={{ duration: 5000 }}>
	<Crest house={$userData.house} />
</div>

<style>
	.crest {
		position: fixed;
		z-index: -1;
		top: 50vh;
		left: 50vw;
		transform: translateX(-50%) translateY(-50%);
		width: 100vw;
		max-width: 100vh;
		height: 100vh;
		max-height: 100vw;
		opacity: 0.6;
	}

	a {
		color: white;
		background: black;
	}

	:global(main) {
		overflow: hidden;
	}

	div[slot='front'] {
		display: flex;
		flex-direction: column;
		align-content: center;
		align-items: center;
	}

	#registration-success {
		font-size: larger;
		text-align: center;
		display: grid;
		place-items: center;
		justify-content: center;
	}
</style>
