<script lang="ts">
	import type { QuestionType, QuizType } from '$lib/stores';
	import { createEventDispatcher } from 'svelte';
	import Timer from '../Timer.svelte';

	const dispatch = createEventDispatcher();

	export let quiz: QuizType;

	$: question = quiz?.activeQuestion;
	$: quizState = quiz?.state;
	$: questionState = question?.state;

	function send(type, data?: unknown) {
		dispatch('action', { type, data });
	}
</script>

<header>
	<h1>{quizState}{questionState ? '.' + questionState : ''}</h1>
	<div class="scroller">
		{#if quizState === 'registration'}
			<button on:click={() => send('start-quiz')}>Start Quiz</button>
			{#if quiz.startsAt}
				<Timer endsAt={quiz.startsAt} />
			{:else if !quiz.startsAt}
				<button on:click={() => send('start-quiz-timer', { time: 10 * 1000 })}>Start in 10s</button>
				<button on:click={() => send('start-quiz-timer', { time: 60 * 1000 })}>Start in 1m</button>
				<button on:click={() => send('start-quiz-timer', { time: 60 * 1000 * 5 })}
					>Start in 5m</button
				>
			{/if}
		{:else if quizState === 'running'}
			{#if questionState === 'open'}
				<button on:click={() => send('close-question')}
					>{question?.type === 'voting' ? 'Start Voting' : 'End Question'}</button
				>
			{:else if questionState === 'voting-open'}
				<button on:click={() => send('close-voting')}>Close Voting</button>
			{:else if questionState === 'closed'}
				<button on:click={() => send('end-question')}>Next Question</button>
			{/if}

			<button on:click={() => confirm('End Quiz?') && send('end-quiz')}>End Quiz</button>
		{/if}
	</div>
</header>

<style>
	header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		background: rgba(255, 255, 255, 0.5);
		padding: 10px;
	}

	.scroller {
		max-width: 100vw;
		overflow-x: auto;
		display: flex;
	}

	.scroller > button {
		margin: 0px;
		min-width: max-content;
		margin-right: 10px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	header > h1 {
		margin: 5px;
	}
</style>
