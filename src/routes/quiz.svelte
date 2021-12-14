<script lang="ts">
	import { quiz, userData } from '$lib/stores';
	import * as c from '$lib/client-api';
	import localStorageStore from '$lib/localStorageStore';
	import { decodeJWT } from '$lib/helpers';
	import Question from '$lib/elements/Question.svelte';

	$: quizState = $quiz?.state;
	$: questionState = $quiz?.activeQuestion?.state;
	$: users = $quiz?.users;

	const quizUserData = localStorageStore('quiz-user-data', { id: '', qid: '', token: '' });

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
</script>

{#if quizState === 'registration'}
	<h1>Registration</h1>

	{#if !$userData.name || !$userData.house}
		<a href="/">Need to input your name</a>
	{:else if $quizUserData.qid !== $quiz.id}
		<button on:click={register}>Join the quiz</button>
	{:else}
		<p>Registered</p>
	{/if}
{:else if quizState === 'running'}
	{#if questionState === 'open'}
		<p>Input your answer</p>
		<Question on:answer={handleAnswer} question={$quiz.activeQuestion} />
	{:else if questionState === 'voting-open'}
		<p>Vote for the best answer</p>
	{:else if questionState === 'closed'}
		<p>These are the results</p>
	{/if}
{:else if quizState === 'results'}
	<p>Results</p>
{/if}
