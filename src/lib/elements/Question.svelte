<script lang="ts">
	import localStorageStore from '$lib/localStorageStore';

	import type Question from '$lib/quiz/Question';
	import { quiz } from '$lib/stores';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let question: ReturnType<Question['toJSON']>;

	export const questionStore = localStorageStore('active-question', { qid: '', aid: '' });

	$: correct = question?.correctAnswer === $questionStore.aid;

	let textValue: string;

	function handleAnswer(id) {
		if (id === $questionStore.qid) return;
		if (question.state !== 'open') return;
		$questionStore.qid = question.id;
		$questionStore.aid = id;
		dispatch('answer', id);
	}

	function handleFreetext(v: string) {
		dispatch('text', v);
	}
</script>

<p class="description">{question.description}</p>

{#if question.type === 'multiple'}
	{#if question.state === 'closed'}
		<p class="res" class:correct>{correct ? 'Richtig' : 'Falsch'}</p>
	{/if}
	{#each question.answers as answer}
		<button
			class="answer"
			class:showAnswer={question?.correctAnswer}
			class:correct={answer.id === question?.correctAnswer}
			class:selected={$questionStore?.aid === answer.id}
			on:click={() => handleAnswer(answer.id)}>{answer.value}</button
		>
	{/each}
{:else}
	<textarea name="" id="" cols="30" rows="10" bind:value={textValue} />
	<button disabled={!textValue?.length} on:click={() => handleFreetext(textValue)}
		>abschicken</button
	>
{/if}

<style>
	textarea {
		max-width: 100%;
		resize: none;
	}

	.res {
		font-size: 2em;
	}

	.description {
		color: white;
		font-size: 1.2em;
	}

	.answer.selected {
		outline: solid 5px white;
	}

	.answer.showAnswer.selected {
		border: solid red;
	}

	.answer.correct {
		border: solid green !important;
	}

	p {
		margin: 0;
	}
</style>
