<script lang="ts">
	import { goto } from '$app/navigation';
	import Select from '$lib/elements/Select.svelte';
	import * as c from '$lib/client-api';
	import { setUserStore } from '$lib/client-api';
	import { getStateStore, userData } from '$lib/stores';
	import { onMount } from 'svelte';

	const stateStore = getStateStore();

	const States = ['quiz', 'points'];

	function setState(state: typeof States[number]) {
		c.post('api/state', { state });
		goto('/admin/' + state);
	}

	onMount(() => {
		setUserStore(userData);
	});
</script>

{#if $userData.role === 'ADMIN'}
	<slot />

	<footer>
		<Select values={States} value={$stateStore.state} on:select={({ detail: v }) => setState(v)} />
	</footer>

	<style>
		footer {
			position: fixed;
			bottom: 0px;
			left: 0px;
			width: 100%;
			padding: 20px;
			background-color: white;
		}
	</style>
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
