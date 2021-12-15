<script lang="ts">
	import type { QuizType } from '$lib/stores';
	import { slide, scale } from 'svelte/transition';
	import Crest from '../Crest.svelte';
	import Timer from '../Timer.svelte';

	export let quiz: QuizType;
	$: users = quiz?.users || [];
</script>

{#if quiz.startsAt}
	<Timer endsAt={quiz.startsAt} let:secondsLeft>
		<h1>Quiz startet in {secondsLeft}</h1>
	</Timer>
{:else}
	<h1>Registriert euch</h1>
	{#each users as u}
		<div class="user" in:slide>
			<div class="crest" in:scale={{ delay: 500 }}>
				<Crest house={u.house} />
			</div>
			<p>{u.name} registered</p>
		</div>
	{/each}
{/if}

<style>
	.user {
		display: flex;
		margin: 10px 0px;
		align-items: center;
	}

	p {
		margin: 0px;
	}

	.crest {
		width: 40px;
		margin-right: 10px;
	}
</style>
