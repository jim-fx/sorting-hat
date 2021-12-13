<script lang="ts">
	import type Question from '$lib/quiz/Question';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let question: ReturnType<Question['toJSON']>;
</script>

<p>{question.description}</p>

{#if question.state === 'open'}
	<!-- TODO: check if question already answered -->

	{#if question.type === 'multiple'}
		{#each question.answers as answer}
			<p>{answer.value}</p>
		{/each}
	{:else}
		<p>FreiText QUestion</p>
	{/if}
{:else if question.state === 'voting-open'}
	<p>Voting Open</p>
{:else if question.state === 'closed'}
	<p>Closed</p>
{/if}
