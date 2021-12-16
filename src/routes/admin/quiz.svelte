<script lang="ts">
	import * as c from '$lib/client-api';
	import { Header, UserTable, AnswerTable } from '$lib/elements/admin';
	import Crest from '$lib/elements/Crest.svelte';
	import { quiz, userData } from '$lib/stores';
	import { onMount } from 'svelte';

	$: quizState = $quiz?.state;
	$: activeQuestion = $quiz?.activeQuestion;
	$: users = $quiz?.users;

	$: if ($quiz) {
		window['quiz'] = $quiz;
	}

	async function handleKeyDown({ key }) {
		if (key === 'L') {
			const q = await c.get('api/quiz');
			console.log(await q.json());
		}
	}

	function handleAction(action: string, body?: Record<string, unknown>) {
		c.post('api/quiz', { action, ...body });
	}

	onMount(() => {
		c.emit('quiz.admin', $userData);
	});
</script>

<svelte:window on:keydown={handleKeyDown} />

<Header quiz={$quiz} on:action={({ detail: { type, data } }) => handleAction(type, data)} />

{#if quizState === 'registration'}
	{#each $quiz.types as type}
		<button on:click={() => handleAction('load-type', { type })}>Load {type}</button>
	{/each}

	<UserTable {users} />
{:else if quizState === 'running'}
	<p>{activeQuestion?.description}</p>

	{#if activeQuestion?.answers}
		<AnswerTable answers={activeQuestion.answers} {users} />
	{/if}
{:else if quizState === 'results'}
	<p>results</p>
{/if}

<style>
	:global(main) {
		padding-top: 130px;
	}
</style>
