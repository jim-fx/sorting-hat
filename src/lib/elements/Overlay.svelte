<script lang="ts">
	import Pattern from './pattern.svelte';
</script>

<div class="wrapper">
	<div class="pattern-wrapper">
		<Pattern />
	</div>
	<div class="pattern-wrapper p-tr">
		<Pattern rotate="90deg" />
	</div>
	<div class="pattern-wrapper p-br">
		<Pattern rotate="180deg" />
	</div>
	<div class="pattern-wrapper p-bl">
		<Pattern rotate="-90deg" />
	</div>

	<div class="bar b-t" />
	<div class="bar b-r" />
	<div class="bar b-l" />
	<div class="bar b-b" />

	<div class="overlay" />
</div>

<style>
	.wrapper {
		position: fixed;
		opacity: 0.9;
		z-index: -1;
	}

	@media only screen and (max-width: 500px) {
		.wrapper {
			opacity: 0.4;
		}
	}

	.overlay {
		position: fixed;
		width: 100vw;
		pointer-events: none;
		height: 100vh;
		background-blend-mode: multiply;
		background: radial-gradient(transparent, rgba(0, 0, 0, 0.8));
	}

	.bar {
		border: 2px solid black;
		border-radius: 2px;
		position: fixed;
	}

	.bar::after {
		content: '';
		position: absolute;
		width: 100%;
		border-radius: 5px;
		height: 2px;
		background-color: black;
	}

	.b-t {
		top: -2px;
		width: calc(100vw - 240px);
		height: 8px;
		left: 120px;
	}

	.b-t::after {
		top: 23px;
	}
	.b-b {
		bottom: -2px;
		width: calc(100vw - 240px);
		height: 8px;
		left: 120px;
	}

	.b-b::after {
		bottom: 23px;
	}
	.b-r {
		right: -2px;
		height: calc(100vh - 240px);
		width: 8px;
		top: 120px;
	}

	.b-r::after {
		right: 23px;
		height: 100%;
		width: 2px;
	}

	.b-l {
		left: -2px;
		height: calc(100vh - 240px);
		width: 8px;
		top: 120px;
	}

	.b-l::after {
		left: 23px;
		height: 100%;
		width: 2px;
	}
	.pattern-wrapper {
		width: 100px;
		height: 100px;
		position: fixed;
		z-index: 2;
	}

	.p-tr {
		right: 0;
	}

	.p-br {
		right: 0;
		bottom: 0;
	}

	.p-bl {
		bottom: 0;
		left: 0;
	}
</style>
