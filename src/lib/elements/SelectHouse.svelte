<script lang="ts">
	import { scale } from 'svelte/transition';

	export let callback;

	const houses = ['ravenclaw', 'gryffindor', 'slytherin', 'hufflepuff'];

	function playSound(h) {
		const audio = new Audio('audio/' + h + '.mp3');
		audio.onerror = () => {
			callback?.(h);
		};
		audio.play();

		audio.addEventListener('ended', () => {
			setTimeout(() => {
				callback(h);
			}, 200);
		});
	}
</script>

<div class="wrapper">
	{#each houses as h, i}
		<img
			in:scale={{ delay: i * 200, duration: 1200 }}
			src="/icons/{h}.svg"
			alt="crest of house {h}"
			on:click={() => playSound(h)}
		/>
	{/each}
</div>

<style>
	.wrapper {
		width: 100%;
		flex-direction: row;
		flex-wrap: wrap;
		margin-top: 20px;
		display: flex;
		justify-content: center;
		max-width: 90vw;
	}

	img {
		cursor: pointer;
		width: 35%;
		transition: transform 0.66s ease, filter 0.6s ease;
		transform: scale(1);
		filter: drop-shadow(5px 5px 20px rgba(0, 0, 0, 0.8));
	}
	img:hover {
		transform: scale(0.8);
		filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 1));
	}
</style>
