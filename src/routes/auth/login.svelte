<script lang="ts">
	import { goto } from '$app/navigation';

	import * as c from '$lib/client-api';

	let name: string;
	let password: string;

	let isLoading = false;

	async function handleLogin() {
		isLoading = true;
		const success = await c.login(name, password);
		if (success) {
			goto('/admin');
		} else {
			isLoading = false;
		}
	}
</script>

{#if isLoading}
	<p>Loading</p>
{:else}
	<input type="text" bind:value={name} />

	<input type="password" name="" id="" bind:value={password} />

	<button on:click={handleLogin} disabled={!name || !password}>login</button>
{/if}
