<script lang="ts">
	export let flipped = false;

	import { orientation } from '$lib/stores';
	import Confetti from './Confetti.svelte';

	let showConfetti1;
	let showConfetti2;
	let showConfetti3;

	let flip = false;
	let hideAnimations = false;

	export const doAflip = () => {
		flip = true;
		setTimeout(() => {
			hideAnimations = true;
			setTimeout(() => {
				flip = false;
				setTimeout(() => {
					hideAnimations = false;
				}, 1000);
			}, 50);
		}, 2000);
	};

	export const showConfetti = () => {
		showConfetti1?.();
		showConfetti2?.();
		showConfetti3?.();
	};

	$: strength = flipped ? 1 : 10;
</script>

<div class="scene" class:flipped class:flip class:hideAnimations>
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
		--x:${$orientation.x * strength}deg;
		--y:${$orientation.y * -strength}deg;
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
		max-height: 90vh;
		max-width: 90vw;
		transition: perspective 2s, filter 2s ease;
		filter: drop-shadow(9px 18px 48px rgba(0, 0, 0, 2));
	}

	.card {
		background-image: url('/card-grid.webp');
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

	.flip > .card {
		animation: flip 2s forwards cubic-bezier(0.83, 0, 0.17, 1);
	}

	.hideAnimations > .card {
		animation-duration: 0s !important;
	}

	@keyframes flip {
		0% {
			transform: rotateY(var(--x)) rotateX(var(--y)) translateZ(0px);
		}
		100% {
			transform: rotateY(360deg) rotateX(var(--y)) translateZ(0px);
		}
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
			transform: rotateY(180deg) translateZ(0px) scale(0.7);
		}
	}

	@keyframes unflipCard {
		0% {
			transform: rotateY(180deg) translateZ(0px) scale(0.7);
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

		overflow-y: auto;

		position: absolute;
		backface-visibility: hidden;
	}

	#front {
		background-image: url('/card-front.webp');
		transform: rotateY(0deg) translateZ(10px);
	}

	#back {
		background-image: url('/card-back.webp');
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

		background-image: url("/card-corner.webp");
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
