<script lang="ts">
	import { HouseColors } from '$lib/houses';

	import type { QuizState } from '$lib/quiz';
	import { pointStore } from '$lib/stores';
	import * as c from '$lib/client-api';
	import { onMount } from 'svelte';
	import Crest from '../Crest.svelte';
	import { capitalize } from '$lib/helpers';
	import { fade, scale } from 'svelte/transition';
	import Confetti from '../Confetti.svelte';

	export let quiz: QuizState;

	$: winningHouse = Object.entries($pointStore.house)
		.map(([name, pts]) => {
			return { name, pts };
		})
		.sort((a, b) => (a.pts > b.pts ? -1 : 1))[0];

	$: winningUser = Object.entries($pointStore.users)
		.map(([id, pts]) => {
			return { id, pts };
		})
		.sort((a, b) => (a.pts > b.pts ? -1 : 1))[0];

	$: winningUserData = winningUser && quiz.users.find((u) => u.id === winningUser.id);

	let showHouseConfetti;
	let showUserConfetti;

	let width = 500;
	let height = 500;

	onMount(async () => {
		height = window.innerHeight;
		width = window.innerWidth / 2;
		const res = await c.get('api/quiz/points');
		$pointStore = await res.json();
		setTimeout(() => {
			showUserConfetti?.();
		}, 5000);
		setTimeout(() => {
			showHouseConfetti?.();
		}, 9000);
	});
</script>

<div class="wrapper">
	<h1>Und die Gewinner sind:</h1>

	<div
		class="left"
		style={`background-color: ${HouseColors[winningHouse.name]}`}
		in:fade={{ delay: 8000, duration: 2000 }}
	>
		<div in:scale={{ delay: 8500, duration: 1000 }}>
			<h2>{capitalize(winningHouse.name)}</h2>
			<div class="crest">
				<Crest house={winningHouse.name} />
			</div>
			<h3>{winningHouse.pts} Punkte</h3>
			<div class="confetti-wrapper">
				<Confetti bind:show={showHouseConfetti} {width} {height} repeat />
			</div>
		</div>
	</div>

	<div
		class="right"
		style={`background-color:  ${HouseColors?.[winningUserData?.house]}`}
		in:fade={{ delay: 4000, duration: 2000 }}
	>
		<div in:scale={{ delay: 4500, duration: 1000 }}>
			<h2>{winningUserData?.name}</h2>
			<h3>{winningUser?.pts} Punkte</h3>
			<div class="confetti-wrapper">
				<Confetti bind:show={showUserConfetti} {width} {height} repeat />
			</div>
		</div>
	</div>
</div>

<style>
	.wrapper {
		position: absolute;
		display: flex;
		flex-flow: row;
	}

	.crest {
		height: 30vh;
		width: 30vh;
	}

	.left,
	.right {
		position: relative;
		display: grid;
		align-content: center;
		place-items: center;
		height: 100vh;
		width: 50vw;
	}

	.confetti-wrapper {
		height: 100%;
		width: 100%;
		top: 0px;
		left: 0px;
		position: absolute;
	}

	h1 {
		position: fixed;
		width: 100%;
		top: 0px;
		text-align: center;
		font-size: 2em;
		z-index: 9999;
	}

	h3,
	h2 {
		text-align: center;
	}

	.left {
		grid-area: house;
	}

	.right {
		grid-area: user;
	}
</style>
