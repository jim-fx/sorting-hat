<script lang="ts">
	import * as c from '$lib/client-api';
	import type { HouseName } from '$lib/houses';

	import houses from '$lib/houses';
	import { getStateStore } from '$lib/stores';
	import { onMount } from 'svelte';
	function addPoints(houseName: HouseName, pts: number) {
		c.post('api/state', { points: { [houseName]: pts } });
	}

	const state = getStateStore();

	function handleReset() {
		confirm('Reset Points?') && c.post('api/state', { reset: true });
	}

	onMount(() => {
		state.init();
	});
</script>

<button on:click={handleReset}>Reset Points</button>
<br>
{#each houses as h}
	<h2>{h}</h2>
	<div class="points">
		<button on:click={() => addPoints(h, 10)}>+10</button>
		<button on:click={() => addPoints(h, 5)}>+5</button>
		<button on:click={() => addPoints(h, 1)}>+1</button>
		<button on:click={() => addPoints(h, -1)}>-1</button>
		<button on:click={() => addPoints(h, -5)}>-5</button>
		<button on:click={() => addPoints(h, -10)}>-10</button>
	</div>
{/each}
