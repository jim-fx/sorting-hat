<script lang="ts">
	import type { QuizState } from '$lib/quiz';

	export let users: QuizState['users'];
</script>

<table>
	<thead>
		<td>Name</td>
		<td>House</td>
	</thead>
	{#each users as user}
		<tr>
			<td>
				{user.name}
			</td>
			<td>
				{user.house}
			</td>
		</tr>
	{/each}
</table>
<p>{users.length} registrations</p>

<style>
	table {
		border-collapse: collapse;
	}
	table td {
		border: 1px solid rgb(68, 68, 68);
		padding: 8px;
	}

	table tr {
		background: rgba(196, 196, 196, 1);
	}

	table tr:nth-child(even) {
		background: rgba(196, 196, 196, 0.33);
	}
</style>
