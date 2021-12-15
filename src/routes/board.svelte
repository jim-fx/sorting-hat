<script lang="ts">
	import { pointStore, quiz } from '$lib/stores';
	import { get } from '$lib/client-api';

	import { Running, Waiting, Results } from '$lib/elements/board';
	import { onMount } from 'svelte';

	onMount(async () => {
		const response = await get('api/quiz/points');
		const pts = await response.json();
		pointStore.set(pts);
	});
</script>

{#if $quiz?.state === 'registration'}
	<Waiting quiz={$quiz} />
{:else if $quiz?.state === 'running'}
	<Running quiz={$quiz} />
{:else if $quiz?.state === 'results'}
	<Results quiz={$quiz} />
{/if}

<style>
	:global(main) {
		padding: 0px;
		margin: 0px;
		overflow: hidden;
	}
</style>
