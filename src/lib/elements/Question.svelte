<script lang="ts">
	import localStorageStore from '$lib/localStorageStore';

	import type Question from '$lib/quiz/Question';
	import { quiz } from '$lib/stores';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let question: ReturnType<Question['toJSON']>;

	$: users = $quiz.users;

	export const questionStore = localStorageStore('active-question', {
		qid: '',
		aid: '',
		value: '',
		vote: ''
	});

	$: correct = question?.correctAnswer === $questionStore.aid;

	export let textValue: string;

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

	function handleVote(v) {
		$questionStore.vote = v;
		dispatch('vote', v);
	}

	function getNameForUID(uid: string) {
		const user = users.find((u) => u.id === uid);

		if (user) {
			return user?.name;
		}

		return '';
	}
</script>

<p class="description">{question.description}</p>

{#if question.type === 'multiple'}
	{#each question.answers as answer}
		<button
			class="answer"
			class:showAnswer={question?.correctAnswer}
			class:correct={answer.id === question?.correctAnswer}
			class:selected={$questionStore?.aid === answer.id}
			on:click={() => handleAnswer(answer.id)}>{answer.value}</button
		>
	{/each}
{:else if question.state === 'open'}
	<textarea name="" id="" cols="30" rows="10" bind:value={textValue} />
	<button disabled={!textValue?.length} on:click={() => handleFreetext(textValue)}
		>abschicken</button
	>
{:else if question.state === 'voting-open'}
	<p>Vote for the best answer</p>
	<div class="vote-wrapper">
		{#each question.answers as a}
			<button
				class="vote-button"
				class:selected={$questionStore.vote === a.id}
				on:click={() => handleVote(a.id)}>{$questionStore.vote !== a.id ? '☐' : '☒'}</button
			>
			<!-- <p class="vote-amount">{a.votes.length}</p> -->
			<p class="vote-value">{a.value}</p>
		{/each}
	</div>
{:else if question.state === 'closed'}
	<div class="vote-wrapper">
		{#each question.answers.sort((a, b) => (a.votes.length > b.votes.length ? -1 : 1)) as a, i}
			<p class="vote-amount">
				{a.votes.length}
			</p>
			<p class="vote-value">
				{a.value}
				{#if i === 0}
					<br />
					({getNameForUID(a.userId)})
				{/if}
			</p>
		{/each}
	</div>
{/if}

<style>
	.vote-wrapper {
		max-height: 340px;
		width: 100%;
		overflow-y: auto;
		box-sizing: border-box;

		display: grid;
		grid-template-columns: min-content 1fr;
		grid-template-rows: repeat(20px);
		gap: 6px;
	}

	.vote-button {
		margin: 0;
	}

	.vote-value {
		line-break: anywhere;
	}

	.vote-amount {
		text-align: center;
	}

	.vote-wrapper > p {
		font-size: 1em;
		color: white;
		background: black;
		padding: 5px;
		box-sizing: border-box;
	}

	textarea {
		max-width: 100%;
		resize: none;
	}

	.description {
		color: white;
		font-size: 1.2em;
		text-align: center;
	}

	.answer {
		font-size: 0.9em;
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
