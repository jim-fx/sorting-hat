<script lang="ts">
	import * as c from '$lib/client-api';
	import Overlay from '$lib/elements/Overlay.svelte';
	import { orientation, quiz, userData } from '$lib/stores';
	import { onMount } from 'svelte';

	onMount(async () => {
		const res = await c.get('api/quiz');
		quiz.set(await res.json());
		c.setUserStore(userData);
		orientation.init();
	});
</script>

<Overlay />

<main>
	<slot />
</main>

<style>
	main {
		height: 100%;
		width: 100%;
		max-width: 100vw;
		max-height: 100vh;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		overflow-y: auto;
	}
</style>
