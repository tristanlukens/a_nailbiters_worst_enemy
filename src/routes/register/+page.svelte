<script>
	import { enhance } from '$app/forms';

	import Error from '$lib/error.svelte';

	import { page } from '$app/stores';
</script>

<form
	use:enhance
	class="flex w-3/4 flex-col space-y-2 md:w-1/2 lg:w-1/3 xl:w-96"
	method="POST"
	action="?/register"
>
	{#if $page.form?.missing}
		<Error>Fill in all fields to register.</Error>
	{/if}

	{#if $page.form?.alreadyExists}
		<Error>An account with this email address has already been registered.</Error>
	{/if}
	<div>
		<label for="firstName">First name</label>
		<input
			name="firstName"
			id="firstName"
			type="firstName"
			class="min-w-full rounded border-2 px-2 py-1"
		/>
	</div>
	<div>
		<label for="email">Email</label>
		<input
			name="email"
			id="email"
			type="email"
			value={$page.form?.email ?? ''}
			class="min-w-full rounded border-2 px-2 py-1"
		/>
	</div>
	<div>
		<label for="pronoun">Pronoun</label>
		<select name="pronoun" class="min-w-full rounded border-2 bg-white px-2 py-1" id="pronoun">
			<option value="empty" />
			<option value="his">his</option>
			<option value="her">her</option>
			<option value="their">their</option>
		</select>
	</div>
	<div>
		<label for="password">Password</label>
		<input
			name="password"
			id="password"
			type="password"
			class="min-w-full rounded border-2 px-2 py-1"
		/>
	</div>

	<!-- margin would make... more sense here. but of course, css is dumb (https://youtu.be/M15vVOJfRGg?t=199) -->
	<div class="mx-auto flex items-center space-x-1 pt-2">
		<input name="rememberMe" id="rememberMe" type="checkbox" />
		<label for="rememberMe" class="text-sm">Remember me for the next week</label>
	</div>

	<!-- TODO: use margin cleanly here (and on this whole page) -->
	<div class="pt-4">
		<button
			class="mx-auto block max-w-fit rounded bg-lime-500 py-2 px-8 font-bold uppercase tracking-wide text-white shadow transition hover:bg-opacity-70"
			>register</button
		>

		<hr class="mt-6" />

		<p class="mt-4 text-justify text-xs leading-relaxed">
			All data you provide is stored solely for the purposes of this site. Your data will
			never be sold to or shared with anyone. You may always edit your data, and completely
			delete your account at any time.
		</p>
	</div>
</form>
