<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>A Nailbiter's Worst Enemy — Quitting</title>
	<meta
		name="description"
		content="Putting more pressure on trying to quit by keeping track of the number of days you've been clean. There's no better way."
	/>
</svelte:head>

<div class="flex flex-col items-center justify-center h-screen space-y-10">
	<h1>A Nailbiter's Worst Enemy</h1>
	{#if !data.sessionid}
		<p>You are not logged in.</p>
		<a href="/login" class="underline">Login</a>
	{:else}
		<p>You are logged in.</p>
		<form action="?/logout" method="post"><button class="underline">Log out</button></form>
	{/if}
</div>
