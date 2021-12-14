<script lang="ts">
	import * as c from '$lib/client-api';
	import { quiz, quiz as quizStore, userData } from '$lib/stores';
	import { onMount } from 'svelte';

	$: quizState = $quiz?.state;
	$: activeQuestion = $quiz?.activeQuestion;
	$: questionState = activeQuestion?.state || '';
	$: users = $quiz?.users;

	$: if ($quiz) {
		console.log($quiz);
	}

	onMount(() => {
		c.emit('quiz.admin', $userData);
		c.on('question.answers', (d: { id: string; answers: any }) => {
			activeQuestion.answers = d.answers;
		});
	});
</script>

<h1>{quizState}.{questionState}</h1>
{#if quizState === 'registration'}
	<button
		on:click={() => {
			c.post('api/quiz', { action: 'start-quiz' });
		}}>Start Quiz</button
	>

	<p>Users {$quizStore.users.length}</p>
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
{:else if quizState === 'running'}
	<h3>Active Question:</h3>
	<p>{activeQuestion?.description}</p>

	{#if activeQuestion?.answers}
		<table>
			<thead>
				<td>User</td>
				{#each activeQuestion.answers as answer}
					<td>{answer.value}</td>
				{/each}
			</thead>
			{#each users as u}
				<tr>
					<td>{u.name}</td>
					{#each activeQuestion.answers as a}
						<td>{a.votes.includes(u.id) ? 'X' : ' '}</td>
					{/each}
				</tr>
			{/each}
		</table>
	{/if}

	{#if questionState === 'open'}
		<button
			on:click={() => {
				c.post('api/quiz', { action: 'close-question' });
			}}>Close Question</button
		>
	{:else if questionState === 'voting-open'}
		<button
			on:click={() => {
				c.post('api/quiz', { action: 'close-voting' });
			}}>Close Voting</button
		>
	{:else if questionState === 'closed'}
		<button
			on:click={() => {
				c.post('api/quiz', { action: 'end-question' });
			}}>End Question</button
		>
	{/if}
{:else if quizState === 'results'}
	<p>results</p>
{/if}

<style>
	table {
		border-collapse: collapse;
	}

	table td {
		border: 1px solid #ddd;
		padding: 8px;
	}

	table tr:nth-child(even) {
		background-color: #f2f2f2;
	}
</style>
