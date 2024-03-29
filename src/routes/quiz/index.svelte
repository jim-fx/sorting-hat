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
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

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

	let isRegistering = false;
	async function register() {
		if (isRegistering || registered) return;
		isRegistering = true;
		const res = await c.post('api/quiz/register', { name: $userData.name, house: $userData.house });
		const json = await res.json();
		const decoded = decodeJWT(json.token);
		$quizUserData.token = json.token;
		$quizUserData.id = decoded.id;
		$quizUserData.qid = decoded.qid;
		isRegistering = false;
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

	let hideCardContent = false;
	let doAflip: () => void;
	function flip() {
		hideCardContent = true;
		doAflip?.();
		setTimeout(() => {
			hideCardContent = false;
		}, 1000);
	}

	$: delayedActiveQuestion = hideCardContent
		? lastQuestion || $quiz?.activeQuestion
		: $quiz.activeQuestion;

	let lastQuestion;
	let lastId = null;
	quiz.subscribe((v) => {
		if (hideCardContent) return;
		let id = v?.activeQuestion?.id;
		let needsFlip = id !== lastId;
		if (!needsFlip) return;
		if (lastId) {
			lastQuestion = $quiz?.questions.find((q) => q.id === lastId);
			console.table({ lastId, id, lastQuestion });
		}
		if (needsFlip) flip();
		lastId = id;
	});

	onMount(() => {
		if (!$userData.name || !$userData.house) {
			goto('/quiz/register');
		}
	});
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
				<h2>{$quiz.description}</h2>
				{#if !isRegistering && !registered}
					<button on:click={register}>Beitreten</button>
				{/if}
			{/if}
		</div>

		<div slot="back">
			{#if $quiz.startsAt}
				<Timer endsAt={$quiz.startsAt} let:secondsLeft>
					<h1>{secondsLeft}</h1>
				</Timer>
			{/if}
		</div>

		<div slot="info" id="registration-success">
			{#if registered && !$quiz.startsAt}
				<p>Warte bis das Quiz beginnt</p>
			{/if}
		</div>
	</Card>
{:else if quizState === 'running' && $quiz?.activeQuestion?.id && registered}
	<Card
		bind:doAflip
		flipped={questionState !== 'closed' &&
			answeredActiveQuestion &&
			questionState !== 'voting-open'}
		bind:showConfetti
	>
		<div slot="front">
			{#if delayedActiveQuestion}
				<Question
					bind:textValue
					userData={$quizUserData}
					bind:questionStore
					on:vote={handleVote}
					on:answer={handleAnswer}
					on:text={handleAnswer}
					question={delayedActiveQuestion}
				/>
			{/if}
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

<div class="crest" in:fade={{ duration: 5000 }}>
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
		opacity: 0.4;
	}

	a {
		color: white;
		background: black;
	}

	:global(main) {
		overflow: hidden;
	}

	div[slot='back'] {
		display: grid;
		place-items: center;
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
