<script>
	import { userData } from '$lib/stores';
	import { setUserStore } from '$lib/client-api';
	import { onMount } from 'svelte';

	onMount(() => {
		setUserStore(userData);
	});
</script>

{#if $userData.role === 'ADMIN'}
	<slot />
{:else}
	<a href="/auth/login">login</a>
{/if}

<style>
	:global(main) {
		justify-content: flex-start !important;
		align-items: baseline !important;
		padding: 10px;
	}

	:global(.overlay-wrapper) {
		display: none;
	}
</style>
