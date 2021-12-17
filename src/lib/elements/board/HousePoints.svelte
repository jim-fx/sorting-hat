<script lang="ts">
	import type { HouseName } from '$lib/houses';
	import Glass from './Glass.svelte';

	export let houses: Record<HouseName, number> = {} as Record<HouseName, number>;

	$: _houses = Object.entries(houses).map(([name, pts]) => {
		return {
			name: name as HouseName,
			pts
		};
	});
	$: sortedHouses = _houses?.sort((a, b) => (a.pts > b.pts ? -1 : 1)) || [];

	$: maxPoints = Math.max(5, sortedHouses[0]?.pts) || 0;
</script>

<div class="house-wrapper">
	{#each _houses.sort((a, b) => (a.name > b.name ? -1 : 1)) as h}
		<div class="glass-wrapper">
			<Glass house={h} {maxPoints} />
		</div>
	{/each}
</div>

<style>
	.house-wrapper {
		display: flex;
		grid-area: left;
		place-self: center;
		justify-self: center;
		/* background: url('/card-front.png'); */
		max-width: 75vh;
		background-size: 100% 100%;
		padding: 20px 0px;
		box-sizing: border-box;
		height: fit-content;
	}

	.glass-wrapper {
		width: 23%;
		display: inline-block;
		filter: drop-shadow(7px 7px 18px black);
	}
</style>
