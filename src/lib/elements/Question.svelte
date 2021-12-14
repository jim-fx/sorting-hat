<script lang="ts">
	import localStorageStore from '$lib/localStorageStore';

	import type Question from '$lib/quiz/Question';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let question: ReturnType<Question['toJSON']>;

	const questionStore = localStorageStore('active-question', { qid: '', aid: '' });

	function handleAnswer(id) {
		$questionStore.qid = question.id;
		$questionStore.aid = id;
		console.log('handleAnswer', id);
		dispatch('answer', id);
	}
</script>

<p>{question.description}</p>

{#if question.state === 'open'}
	{#if question.type === 'multiple'}
		{#if $questionStore.qid === question.id}
			<p>Already answered</p>
		{:else}
			{#each question.answers as answer}
				<p on:click={() => handleAnswer(answer.id)}>{answer.value}</p>
			{/each}
		{/if}
	{:else}
		<p>FreiText QUestion</p>
	{/if}
{:else if question.state === 'voting-open'}
	<p>Voting Open</p>
{:else if question.state === 'closed'}
	<p>Closed</p>
{/if}

<style>
	p {
		margin: 0;
	}
</style>
