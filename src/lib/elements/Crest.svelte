<script lang="ts">
	import { capitalize } from '$lib/helpers';

	import type { HouseName } from '$lib/houses';
	export let house: HouseName | string = 'gryffindor';
	export let showName = false;
</script>

<div>
	<img src="/icons/{house}.svg" alt="Crest of house {house}" />
	{#if showName}
		<p>{capitalize(house)}</p>
	{/if}
</div>

<style>
	img {
		max-height: 100%;
		max-width: 100%;
		object-fit: contain;
	}
	p {
		width: 100%;
		margin: 0;
		padding: 0;
		padding-top: 10px;
		text-align: center;
	}
</style>
