<script lang="ts">
	import { goto } from '$app/navigation';

	import SelectHouse from '$lib/elements/SelectHouse.svelte';
	import type { HouseName } from '$lib/houses';

	import { userData } from '$lib/stores';
	import { onMount } from 'svelte';

	let name: string;
	let house;

	let isTextFocused = false;

	function callback(houseName: HouseName) {
		$userData.house = houseName;
		$userData.name = name;
		goto('/quiz');
	}

	onMount(() => {
		if ($userData.house && $userData.name) {
			goto('/quiz');
		}
	});
</script>

<h1>Quiz Registration</h1>

<h2>Name:</h2>

<input
	type="text"
	bind:value={name}
	name="Username"
	on:blur={() => {
		isTextFocused = false;
	}}
	on:focus={() => {
		isTextFocused = true;
	}}
	on:keydown={function (ev) {
		if (ev.key === 'Enter') this.blur();
	}}
/>

{#if name && !isTextFocused}
	<h2>Haus:</h2>
	<SelectHouse {callback} />
{/if}
