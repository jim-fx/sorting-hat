<script lang="ts">
	import { onMount } from 'svelte';

	export let endsAt: number;

	export let secondsLeft = 0;

	function parseSeconds(input: string) {
		const sec_num = parseInt(input, 10); // don't forget the second param
		let hours = Math.floor(sec_num / 3600);
		let minutes = Math.floor((sec_num - hours * 3600) / 60);
		let seconds = sec_num - hours * 3600 - minutes * 60;

		if (!hours) {
			return `${minutes}:${seconds.toString().padStart(2, '0')}`;
		}

		if (!minutes) {
			return `${seconds}s`;
		}

		return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	}

	onMount(() => {
		let int = setInterval(() => {
			secondsLeft = Math.max(0, Math.round((endsAt - Date.now()) / 1000));
		}, 500);

		return () => clearInterval(int);
	});
</script>

<slot secondsLeft={parseSeconds(secondsLeft + '')}>
	<p>{parseSeconds(secondsLeft + '')}</p>
</slot>
