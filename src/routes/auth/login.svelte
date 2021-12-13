<script lang="ts">
	import * as c from '$lib/client-api';

	let name: string;
	let password: string;

	function handleLogin() {
		c.login(name, password);
	}
</script>

<input type="text" bind:value={name} />

<input type="password" name="" id="" bind:value={password} />

<button on:click={handleLogin} disabled={!name || !password}>login</button>
