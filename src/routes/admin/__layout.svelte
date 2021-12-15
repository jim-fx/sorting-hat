<script>
	import { userData } from '$lib/stores';
</script>

{#if $userData.role === 'ADMIN'}
	<slot />
{:else}
	<a href="/auth/login">login</a>
{/if}

<style>
	:global(main) {
		justify-content: flex-start !important;
	}
</style>
