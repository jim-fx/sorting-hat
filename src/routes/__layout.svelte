<script lang="ts">
	import * as c from '$lib/client-api';
	import Overlay from '$lib/elements/Overlay.svelte';
	import pointerStore from '$lib/pointerStore';
	import { quiz, userData } from '$lib/stores';
	import { onMount } from 'svelte';

	onMount(async () => {
		const res = await c.get('api/quiz');
		quiz.set(await res.json());
		pointerStore.init();
		c.setUserStore(userData);
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
