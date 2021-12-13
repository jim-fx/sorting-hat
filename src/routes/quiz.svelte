<script lang="ts">
	import { quiz, userData } from '$lib/stores';
	import * as c from '$lib/client-api';
	import localStorageStore from '$lib/localStorageStore';
	import { decodeJWT } from '$lib/helpers';
	import Question from '$lib/elements/Question.svelte';

	const quizUserData = localStorageStore('quiz-user-data', { id: '', qid: '', token: '' });

	async function register() {
		const res = await c.post('api/quiz/register', { name: $userData.name });
		const json = await res.json();
		const decoded = decodeJWT(json.token);
		$quizUserData.token = json.token;
		$quizUserData.id = decoded.id;
		$quizUserData.qid = decoded.qid;
	}
</script>

{#if $quiz?.state === 'registration'}
	<h1>Registration</h1>

	{#if !$userData.name}
		<a href="/">Need to input your name</a>
	{:else if $quizUserData.qid !== $quiz.id}
		<button on:click={register}>Join the quiz</button>
	{:else}
		<p>Registered</p>
	{/if}
{:else if $quiz?.state === 'running'}
	<Question question={$quiz.activeQuestion} />
{:else if $quiz?.state === 'results'}
	<p>Results</p>
{/if}
