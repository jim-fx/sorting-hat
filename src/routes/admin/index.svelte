<script lang="ts">
	import * as c from '$lib/client-api';
	import { Quiz } from '$lib/elements/admin';
	import type { HouseName } from '$lib/houses';
	import houses from '$lib/houses';
	import { getStateStore } from '$lib/stores';
	import { onMount } from 'svelte';

	const state = getStateStore();

	const States = ['quiz', 'points'];

	function setState(state) {
		c.post('api/state', { state });
	}

	function addPoints(houseName: HouseName, pts: number) {
		c.post('api/state', { points: { [houseName]: pts } });
	}

	function handleReset() {
		confirm('Reset Points?') && c.post('api/state', { reset: true });
	}

	onMount(() => {
		state.init();
	});
</script>

{#if $state?.state === 'quiz'}
	<Quiz />
{:else}
	<button on:click={handleReset}> Reset Points </button>

	{#each houses as h}
		<button on:click={() => addPoints(h, 5)}>+5 {h}</button>
	{/each}
{/if}

<footer>
	{#each States as state}
		<button on:click={() => setState(state)}> {state} </button>
	{/each}
</footer>

<style>
	footer {
		position: fixed;
		bottom: 0px;
		left: 0px;
		width: 100%;
		padding: 20px;
		background-color: white;
	}
</style>
