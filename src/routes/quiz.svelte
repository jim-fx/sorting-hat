<script lang="ts">
	import { quiz, userData } from '$lib/stores';
	import * as c from '$lib/client-api';
	import localStorageStore from '$lib/localStorageStore';
	import { decodeJWT } from '$lib/helpers';
	import Question from '$lib/elements/Question.svelte';
	import Card from '$lib/elements/Card.svelte';

	let showConfetti;

	let questionStore;
	const quizUserData = localStorageStore('quiz-user-data', { id: '', qid: '', token: '' });

	$: quizState = $quiz?.state;
	$: questionState = $quiz?.activeQuestion?.state;
	$: users = $quiz?.users;
	$: registered = $quizUserData.qid === $quiz?.id;
	$: answeredActiveQuestion = $questionStore?.qid === $quiz?.activeQuestion?.id;
	$: correctAnswer = $quiz?.activeQuestion?.correctAnswer === $questionStore?.aid;

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
		await c.post('api/quiz/answer', detail, $quizUserData.token);
	}

	async function handleTextAnswer() {}
</script>

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
			{/if}
		</div>
	</Card>
{:else if quizState === 'running' && $quiz?.activeQuestion?.id}
	<Card flipped={questionState !== 'closed' && answeredActiveQuestion} bind:showConfetti>
		<div slot="front">
			<Question
				bind:questionStore
				on:answer={handleAnswer}
				question={$quiz.activeQuestion}
				on:text={handleTextAnswer}
			/>
		</div>

		<div slot="back">
			{#if questionState === 'voting-open'}
				<p>Vote for the best answer</p>
			{/if}
		</div>

		<div slot="info">
			{#if answeredActiveQuestion && questionState !== 'closed'}
				<p>Warte bis die Frage beendet wird.</p>
			{/if}
		</div>
	</Card>
{:else if quizState === 'results'}
	<p>Results</p>
{/if}

<style>
	#registration-success {
		font-size: larger;
		text-align: center;
		display: grid;
		place-items: center;
		justify-content: center;
	}
</style>
