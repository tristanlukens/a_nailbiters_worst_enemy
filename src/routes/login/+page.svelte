<script>
	import { enhance } from '$app/forms';

	import Error from '$lib/error.svelte';

	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>A Nailbiter's Worst Enemy | Login</title>
	<meta name="description" content="Log in to your account for A Nailbiter's Worst Enemy" />
</svelte:head>

<main class="flex flex-col justify-center items-center h-screen">
	{#if $page.form?.missing}
		<Error>Fill in all fields to login.</Error>
	{/if}

	{#if $page.form?.incorrect}
		<Error>Email and/or password incorrect.</Error>
	{/if}

	<form
		use:enhance
		class="flex flex-col w-3/4 md:w-1/2 lg:w-1/3 xl:w-96 transition"
		method="POST"
		action="?/login"
	>
		<label for="email">Email</label>
		<input
			name="email"
			id="email"
			type="email"
			placeholder="name@example.com..."
			value={$page.form?.email ?? ''}
			class="border-2 rounded px-2 py-1 min-w-full mb-4"
		/>
		<label for="password">Password</label>
		<input
			name="password"
			id="password"
			type="password"
			placeholder="your password..."
			class="border-2 rounded px-2 py-1"
		/>

		<div class="flex space-x-2 mt-10 mx-auto">
			<button
				class="uppercase bg-lime-500 font-bold tracking-wide rounded shadow text-white py-2 px-8 hover:bg-opacity-70 transition"
				>login</button
			>
			<a
				href="/register"
				class="uppercase bg-gray-200 font-semibold tracking-wide rounded shadow text-gray-500 py-2 px-8 hover:bg-opacity-70 transition"
				>register</a
			>
		</div>
		<div class="mx-auto mt-8 flex items-center space-x-1">
			<input name="rememberMe" id="rememberMe" type="checkbox" />
			<label for="rememberMe" class="text-sm">Remember me for the next week</label>
		</div>
	</form>
</main>
