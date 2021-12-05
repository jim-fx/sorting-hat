<script lang="ts">
	import RangeSlider from 'svelte-range-slider-pips';
	export let callback;

  export const showText = true;

	let values = [5];
</script>

<div class="wrapper">
	<div class="range-wrapper">
		<RangeSlider
			bind:values
			max={10}
			pips
			id="range-slider"
			all="label"
			--handle-focus="white"
			--range-slider="black"
			--range-handle="black"
			--range-float-text="white"
		/>
	</div>
	<button on:click={() => callback(values[0])}>Okay</button>
</div>

<style lang="scss">
	.wrapper {
		display: grid;
		place-items: center;
		margin: 20px 0px;
		max-width: 500px;
		width: 90%;
		z-index: 99;
	}

	.range-wrapper {
		width: 100%;
	}
</style>
