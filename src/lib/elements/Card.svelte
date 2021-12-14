<script lang="ts">
	export let flipped = false;

	import { store } from '$lib/pointerStore';
	import Confetti from './Confetti.svelte';

	let showConfetti1;
	let showConfetti2;
	let showConfetti3;

	export const showConfetti = () => {
		console.log('ShowCOnfetti');
		showConfetti1?.();
		showConfetti2?.();
		showConfetti3?.();
	};

	$: strength = flipped ? 1 : 10;
</script>

<div class="scene" class:flipped>
	<Confetti
		amount={200}
		--opacity="0.4"
		bind:show={showConfetti1}
		--z={flipped ? '-30px' : '30px'}
	/>

	<Confetti amount={50} bind:show={showConfetti3} --z={flipped ? '-70px' : '70px'} />

	<div
		class="card"
		style={`
		--x:${$store.x * strength}deg;
		--y:${$store.y * -strength}deg;
		`}
	>
		<div class="corner-wrapper">
			<span class="corner tr" />
			<span class="corner tl" />
			<span class="corner br" />
			<span class="corner bl" />
		</div>

		<div class="corner-wrapper back">
			<span class="corner tr" />
			<span class="corner tl" />
			<span class="corner br" />
			<span class="corner bl" />
		</div>

		<div class="card-face" id="front">
			<slot name="front">
				<p>No Frontside</p>
			</slot>
		</div>

		<div class="card-face" id="back">
			<slot name="back">
				<p />
			</slot>
		</div>
	</div>

	<slot name="info">
		<span />
	</slot>
</div>

<style>
	.scene {
		perspective: 500px;
		width: 300px;
		height: 500px;
		max-height: 80vh;
		max-width: 80vw;
		transition: perspective 2s, filter 2s ease;
		filter: drop-shadow(9px 18px 48px rgba(0, 0, 0, 2));
	}

	.card {
		background-image: url('/card-grid.png');
		background-size: 100% 100%;

		position: relative;
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
		transform-origin: center;

		transform: rotateY(var(--x)) rotateX(var(--y)) translateZ(0px);

		animation: unflipCard 1s cubic-bezier(0.83, 0, 0.17, 1);
	}

	.flipped {
		perspective: 1000px;
		filter: drop-shadow(6px 8px 2px rgba(0, 0, 0, 0.7));
	}

	.flipped > .card {
		animation: flipCard 2s forwards cubic-bezier(0.83, 0, 0.17, 1);
	}

	@keyframes flipCard {
		0% {
			transform: rotateY(var(--x)) rotateX(var(--y)) translateZ(0px);
		}
		50% {
			transform: rotateY(180deg) translateZ(-100px);
		}
		60% {
			transform: rotateY(180deg) translateZ(-100px);
		}
		100% {
			transform: rotateY(180deg) translateZ(0px);
		}
	}

	@keyframes unflipCard {
		0% {
			transform: rotateY(180deg) translateZ(0px);
		}
		100% {
			transform: rotateY(var(--x)) rotateX(var(--y)) translateZ(0px);
		}
	}

	.card-face {
		box-sizing: border-box;
		padding: 40px;
		margin: 10px;
		width: calc(100% - 20px);
		height: calc(100% - 20px);
		background-size: 100% 100%;

		position: absolute;
		backface-visibility: hidden;
	}

	#front {
		background-image: url('/card-front.png');
		transform: rotateY(0deg) translateZ(10px);
	}

	#back {
		background-image: url('/card-back.png');
		transform: rotateY(180deg) translateZ(10px);
	}

	.corner-wrapper {
		position: absolute;
		transform-origin: center;
		transform-style: preserve-3d;
		transform: translateZ(20px);
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.corner-wrapper.back {
		transform: translateZ(-20px);
	}

	.corner {
		position: absolute;
		display: block;
		width: 70px;
		height: 70px;
		background-size: cover;
		transform-origin: center;
		transform-style: preserve-3d;

		background-image: url(/card-corner.png);
	}

	.corner.tr {
		right: 0px;
		transform: rotate(90deg);
	}

	.corner.br {
		bottom: 0;
		right: 0;
		transform: rotate(180deg);
	}
	.corner.bl {
		bottom: 0;
		left: 0;
		transform: rotate(-90deg);
	}
</style>
