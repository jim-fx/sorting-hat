<script lang="ts">
import { get } from '$lib/client-api';

	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';

	export const showText = false;

	const houses = ['ravenclaw', 'gryffindor', 'slytherin', 'hufflepuff'];

	async function getHouse() {
		const res =	await (await get("api/houses")).text();
    if (res.length > 20) {
			return houses[Math.floor(Math.random() * houses.length)];
		}
		return res;
	}

	let house = getHouse();
	export let callback;

	onMount(async () => {
		/* house = houses[Math.floor(Math.random() * houses.length)]; */

		const h = await house;

		const audio = new Audio('audio/' + h + '.mp3');

		audio.play();

		const cheers = new Audio('audio/cheers.mp3');

		const int = setInterval(() => {
			if (audio.currentTime / audio.duration > 0.2 && cheers.paused) {
				cheers.play();
				clearInterval(int);
			}
		}, 50);

		audio.addEventListener('progress', () => {});
	});
</script>

{#await house then h}
	<h1>{h}</h1>

	<img transition:scale src="icons/{h}.svg" alt="crest of house {house}" />

	<button on:click={() => callback(h)}>Okay</button>
{/await}

<style>
	h1 {
		text-align: center;
		text-transform: capitalize;
		font-size: 4em;
	}
	img {
		width: 80%;
		height: 80%;
		position: fixed;
		z-index: -1;
		opacity: 0.2;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
