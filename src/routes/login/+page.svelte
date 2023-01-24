<script>
	import { enhance } from '$app/forms';

	import Error from '$lib/error.svelte';

	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>A Nailbiter's Worst Enemy | Login</title>
	<meta name="description" content="Log in to your account for A Nailbiter's Worst Enemy" />
</svelte:head>

<main class="flex h-screen flex-col items-center justify-center">
	{#if $page.form?.missing}
		<Error>Fill in all fields to login.</Error>
	{/if}

	{#if $page.form?.incorrect}
		<Error>Email and/or password incorrect.</Error>
	{/if}

	<form
		use:enhance
		class="flex w-3/4 flex-col transition md:w-1/2 lg:w-1/3 xl:w-96"
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
			class="mb-4 min-w-full rounded border-2 px-2 py-1"
		/>
		<label for="password">Password</label>
		<input
			name="password"
			id="password"
			type="password"
			placeholder="your password..."
			class="rounded border-2 px-2 py-1"
		/>

		<div class="mx-auto mt-10 flex space-x-2">
			<button
				class="rounded bg-lime-500 py-2 px-8 font-bold uppercase tracking-wide text-white shadow transition hover:bg-opacity-70"
				>login</button
			>
			<a
				href="/register"
				class="rounded bg-gray-200 py-2 px-8 font-semibold uppercase tracking-wide text-gray-500 shadow transition hover:bg-opacity-70"
				>register</a
			>
		</div>
		<div class="mx-auto mt-8 flex items-center space-x-1">
			<input name="rememberMe" id="rememberMe" type="checkbox" />
			<label for="rememberMe" class="text-sm">Remember me for the next week</label>
		</div>
	</form>
</main>
