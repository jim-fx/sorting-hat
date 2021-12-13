<script lang="ts">
	import * as c from '$lib/client-api';
	import { quiz } from '$lib/stores';
	import { onMount } from 'svelte';
	import Overlay from '$lib/elements/Overlay.svelte';
	import { page } from '$app/stores';

	onMount(async () => {
		const res = await c.get('api/quiz');
		quiz.set(await res.json());
	});
</script>

<Overlay />

<main>
	<slot />
</main>

{#if $quiz?.state === 'registration' && !$page?.path.includes('quiz')}
	<a href="/quiz">Enter Quiz</a>
{/if}

<style>
	a {
		position: fixed;
		bottom: 20px;
		right: 20px;
		background-color: black;
		color: white;
		padding: 5px;
		text-decoration: none;
	}

	main {
		height: 100%;
		width: 100%;
		max-height: 100vh;
		display: flex;
		justify-content: center;
		flex-direction: column;
		overflow-y: auto;
	}
</style>
