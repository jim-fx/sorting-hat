<script lang="ts">
	import type Quiz from '$lib/quiz';
	import * as c from '$lib/client-api';
	import { quiz, quiz as quizStore, userData } from '$lib/stores';
	import { onMount } from 'svelte';
	import type Answer from '$lib/quiz/Answer';

	$: quizState = $quiz?.state;
	$: questionState = $quiz?.activeQuestion?.state || '';
	$: users = $quiz?.users;

	let answers: ReturnType<Answer['toJSON']>[] = [];

	onMount(() => {
		c.emit('quiz.admin', $userData);
		c.on('question.answer', (d: { id: string; answers: any }) => {
			if ($quizStore.activeQuestion.id === d.id) {
				answers = [...answers, ...d.answers];
			}
		});
	});
</script>

<h1>{quizState}.{questionState}</h1>
{#if quizState === 'registration'}
	<p>User Registration {$quizStore.users.length}</p>

	<button
		on:click={() => {
			c.post('api/quiz', { action: 'start-quiz' });
		}}>Start Quiz</button
	>
{:else if quizState === 'running'}
	<p>Active Question: {$quizStore.activeQuestion.description}</p>

	{#if questionState === 'open'}
		<table>
			{#each answers as a}
				<p>{a.userId} | {a.value}</p>
			{/each}
		</table>

		<button
			on:click={() => {
				c.post('api/quiz', { action: 'close-question' });
			}}>Close Question</button
		>
	{:else if questionState === 'voting-open'}
		<button
			on:click={() => {
				c.post('api/quiz', { action: 'close-voting' });
			}}>Close Voting</button
		>
	{:else if questionState === 'closed'}
		<button
			on:click={() => {
				c.post('api/quiz', { action: 'end-question' });
			}}>End Question</button
		>
	{/if}
{:else if quizState === 'results'}
	<p>results</p>
{/if}
