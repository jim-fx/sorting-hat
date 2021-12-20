<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let values: string[] = [];
	export let value = values[0];

	const dispatch = createEventDispatcher();

	function handleSelect(v: string) {
		value = v;
		dispatch('select', v);
	}
</script>

<div class="wrapper">
	{#each values as v}
		<button class:selected={v === value} on:click={() => handleSelect(v)}>{v}</button>
	{/each}
</div>

<style>
	.wrapper {
		border-radius: 10px;
  overflow: hidden;
  width: fit-content;
		border: solid 2px black;
	}

	button {
  margin:0px;
		background-color: white;
		color: black;
  border-radius: 0px;
	}

	button.selected {
		background-color: black;
		color: white;
	}
</style>
