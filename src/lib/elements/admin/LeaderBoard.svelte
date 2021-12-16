<script lang="ts">
	import { HouseColors } from '$lib/houses';

	import SortableList from 'svelte-sortable-list';

	export let users: any[];
</script>

<div class="leader-board" class:visible={!!users.length}>
	<SortableList list={users} key="name" let:item>
		<div class="user" style={`--color: ${HouseColors[item.house]}`}>
			<h2>
				{item.pts} Punkt{item.pts > 0 ? 's' : ''} | &nbsp;{item.name}
			</h2>
		</div>
	</SortableList>
</div>

<style>
	.leader-board {
		margin-bottom: -25px;
		margin-right: 40px;
		margin-left: -20px;
		padding: 20px;
		background: url('/card-front.png');
		background-size: 100%;
		filter: drop-shadow(0px 0px 10px black);
		overflow: hidden;
		transition: transform 1s ease-out;
		transform: translateY(50vh);
	}

	.leader-board.visible {
		transform: translateY(0px);
	}

	h2 {
		margin: 0;
		padding: 15px;
	}

	.user {
		position: relative;
		box-sizing: border-box;
		margin: 10px;
		box-shadow: 0px 0px 10px var(--color);
	}

	.user::before {
		content: '';
		position: absolute;
		width: 100%;
		border-radius: 10px;
		height: 100%;
		opacity: 0.9;
		background-color: var(--color);
		background-blend-mode: multiply;
		z-index: -1;
	}
</style>
