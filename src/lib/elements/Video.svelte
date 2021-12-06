<script lang="ts">
	import { onMount } from 'svelte';

	export const showText = false;

	let stupidHack = '';

	onMount(() => {
		stupidHack = window.location.pathname;
	});
</script>

<video width="500" height="281" controls autoplay>
	<source src="{stupidHack}video/video.webm" type="video/webm" />
	<source src="{stupidHack}video/video.mp4" type="video/mp4" />
	<track kind="captions" />
</video>

<style>
	video {
		width: 100%;
		height: 200px;
	}
</style>
