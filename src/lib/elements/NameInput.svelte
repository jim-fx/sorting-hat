<script lang="ts">
	export let callback: (v: string) => void;

	let value: string;

	let confirmName = false;

	function handleKeyDown({ key }) {
		if (key === 'Enter') {
			confirmName = true;
		}
	}
</script>

<div class="wrapper">
	{#if confirmName}
    <p>
		Alles klar, <b>{value}</b>, ist das der richtige Name?
    </p>

		<br />
		<div>
			<button on:click={() => callback(value)}>Ja</button>
			<button
				on:click={() => {
					confirmName = false;
				}}>Nein</button
			>
		</div>
	{:else}
		<p>Ganzen Namen eingeben:</p>
		<input placeholder="Namen..." type="text" bind:value on:keydown={handleKeyDown} />
		<br />
		<button
			on:click={() => {
				confirmName = true;
			}}>fertig</button
		>
	{/if}
</div>

<style>
	.wrapper {
		display: grid;
		font-size: 1.2em;
		justify-items: center;
	}
</style>
