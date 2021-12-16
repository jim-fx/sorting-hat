<script lang="ts">
	import { lerp } from '$lib/animator/helpers';

	import { capitalize, easeInOutQuint, hexToFilter } from '$lib/helpers';

	import { HouseColors } from '$lib/houses';
	import Crest from '../Crest.svelte';

	export let house: {
		name: string;
		pts: number;
	};
	$: housePoints = house?.pts || 0;
	export let maxPoints: number;

	let value = 0;
	let _value = 0;

	let isRendering = false;

	let t = 0;
	let duration = 120;

	$: if (housePoints || maxPoints) {
		let newValue = clamp(housePoints / maxPoints);
		if (newValue !== _value) {
			console.log('Animate', value, newValue);
			_value = newValue;
			t = 0;
			if (!isRendering) update();
		}
	}

	function clamp(v) {
		return Math.min(Math.max(v, 0), 1);
	}

	function update() {
		t++;
		const alpha = easeInOutQuint(t / duration);

		if (Math.abs(value - _value) > 0.01) {
			requestAnimationFrame(update);
		} else {
			value = _value;
			isRendering = false;
		}

		value = clamp(lerp(value, _value, 1 - alpha));
	}

	$: color = HouseColors[house.name];
	$: y = 300 - value * 240;

	$: path = `M 0 270 
	V ${y + 15} 
	C 30 ${y + 15} 30 ${y} 50 ${y} 
	C 70 ${y} 70 ${y + 15} 100 ${y + 15} 
	V 270 
	C 100 290 80 300 50 300 
	C 20 300 0 290 0 270 
	Z`;
</script>

<div class="container">
	<div class="top">
		<h2>{house.pts || 0}</h2>
		<p>{capitalize(house.name)}</p>
		<div class="crest">
			<Crest house={house.name} />
		</div>
	</div>

	<div class="bottom-container">
		<svg
			class="color-bottom width"
			viewBox="0 0 100 306"
			preserveAspectRatio="none"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d={path} fill={color} />
		</svg>

		<svg class="color-top width" viewBox="0 0 91 98" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				opacity="0.75"
				d="M 1 10 L 1 77 C 20 77 29 97 45 97 C 60 97 71 77 90 77 V 10 C 90 6 84 0 45 0 C 7 0 1 7 1 10 Z"
				fill={color}
			/>
		</svg>
	</div>

	<img class="glass" src="/sorting-glass.png" alt="" />
</div>

<style>
	.container {
		position: relative;
		width: 132%;
	}

	.top {
		position: relative;
		display: grid;
		place-items: center;
	}

	.top .crest {
		width: 100%;
		opacity: 0.2;
		transform: scale(0.8);
	}

	.top p {
		position: absolute;
		bottom: -0.5em;
		text-shadow: 0px 0px 5px 2px white;
	}

	.top h2 {
		z-index: 2;
		font-weight: bolder;
		margin: 0;
		font-size: 3em;
		text-shadow: 0px 0px 5px white;
		position: absolute;
	}

	.width {
		position: absolute;
		width: 42%;
		z-index: -1;
		left: 29%;
	}

	.glass {
		width: 100%;
		z-index: 5;
	}

	.container::before {
		content: '';
		position: absolute;
	}

	.glitter {
		opacity: 0.3;
	}

	.color-top {
		top: 29.5%;
	}

	.color-bottom {
		bottom: 0px;
		height: 73%;
		border-radius: 0px 0px 44px 44px;
	}
</style>
