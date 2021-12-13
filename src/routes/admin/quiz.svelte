<script lang="ts">
	import type Quiz from '$lib/quiz';
	import * as c from '$lib/client-api';
	import { quiz as quizStore, userData } from '$lib/stores';
	import { onMount } from 'svelte';

	// export let quiz: ReturnType<typeof Quiz['toJSON']>;

	onMount(() => {
		c.emit('quiz.admin', $userData);
	});
</script>

{#if $quizStore?.state === 'registration'}
	<h1>Registration</h1>

	<p>User Registration {$quizStore.users.length}</p>

	<button
		on:click={() => {
			c.post('api/quiz', { action: 'start' });
		}}>Start Quiz</button
	>
{:else if $quizStore?.state === 'running'}
	<h1>Running</h1>
{:else if $quizStore?.state === 'results'}
	<h1>Results</h1>
{/if}
