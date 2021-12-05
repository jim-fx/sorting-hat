<script lang="ts">
	import { onMount } from 'svelte';

	import { fade } from 'svelte/transition';

	export let text: string;
	export let duration: number;

	$: words = text.split(' ').map((w) => ' ' + w);
	$: singleDur = ((duration - 0.5) / words.length) * 1000;

	$: visible = !words?.length;
	$: if (words.length) {
		setTimeout(() => {
			visible = true;
		}, 200);
	}
</script>

<div class="wrapper">
	{#if visible}
		{#each words as word, i}
			<span in:fade={{ duration: singleDur, delay: i * singleDur }}>{word}</span>
		{/each}
	{/if}
</div>

<style>
	.wrapper {
		font-size: 1.7em;
		text-align: center;
		text-shadow: 5px 3px 7px #0000007d;
	}
</style>
