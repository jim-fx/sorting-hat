<script lang="ts">
	import { getStateStore, pointStore, quiz } from '$lib/stores';
	import { get } from '$lib/client-api';

	import { Running, Waiting, Results, HousePoints } from '$lib/elements/board';
	import { onMount } from 'svelte';
	import { browser } from '$app/env';

	const state = getStateStore();

	$: if ($quiz?.state !== 'running' && browser) {
		setTimeout(() => {
			if ($quiz?.state !== 'running') {
				const el = document.getElementById('board-running');
				if (el) el.remove();
			}
		}, 1000);
	}

	onMount(async () => {
		const response = await get('api/quiz/points');
		const pts = await response.json();
		pointStore.set(pts);

		state.init();
	});
</script>

{#if $state?.state === 'quiz'}
	{#if $quiz?.state === 'registration'}
		<Waiting quiz={$quiz} />
	{:else if $quiz?.state === 'running'}
		<Running quiz={$quiz} />
	{:else if $quiz?.state === 'results'}
		<Results quiz={$quiz} />
	{/if}
{:else}
	<HousePoints houses={$state.points} />
{/if}

<style>
	:global(main) {
		padding: 0px;
		margin: 0px;
		overflow: hidden;
	}
</style>
