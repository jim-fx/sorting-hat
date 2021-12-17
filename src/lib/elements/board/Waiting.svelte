<script lang="ts">
	import type { QuizState } from '$lib/quiz';
	import { slide, scale } from 'svelte/transition';
	import Crest from '../Crest.svelte';
	import Timer from '../Timer.svelte';

	export let quiz: QuizState;
	$: users = quiz?.users || [];
</script>

{#if quiz.startsAt}
	<Timer endsAt={quiz.startsAt} let:secondsLeft>
		<h1>Quiz startet in {secondsLeft}</h1>
	</Timer>
{:else}
	<h3>Registriert euch für</h3>
	<h1>{quiz.description}</h1>
	<div class="users">
		{#each users as u}
			<div class="user" in:slide>
				<div class="crest" in:scale={{ delay: 500 }}>
					<Crest house={u.house} />
				</div>
				<p>{u.name} registered</p>
			</div>
		{/each}
	</div>
{/if}

<style>
	.users {
		max-height: 30vh;
		overflow: hidden;
	}

	.user {
		display: flex;
		margin: 10px 0px;
		align-items: center;
	}

	h1,
	h3 {
		margin: 2px 0px;
	}

	p {
		margin: 0px;
	}

	.crest {
		width: 40px;
		margin-right: 10px;
	}
</style>
