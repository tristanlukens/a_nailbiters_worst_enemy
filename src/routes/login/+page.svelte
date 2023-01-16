<script>
	import { enhance } from '$app/forms';
</script>

<main class="flex flex-col justify-center items-center h-screen">
	<form
		class="flex flex-col w-3/4 md:w-1/2 lg:w-1/3 xl:w-96"
		method="POST"
		use:enhance
		action="?/login"
	>
		<label for="email">Email</label>
		<input
			name="email"
			id="email"
			type="email"
			placeholder="name@example.com..."
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
				class="uppercase bg-sky-500 font-bold tracking-wide rounded shadow text-white py-2 px-8 hover:bg-opacity-70 transition"
				>login</button
			>
			<button
				class="uppercase bg-gray-200 font-semibold tracking-wide rounded shadow text-gray-500 py-2 px-8 hover:bg-opacity-70 transition"
				>sign up</button
			>
		</div>
		<div class="mx-auto mt-8 flex items-center space-x-1">
			<input name="rememberMe" id="rememberMe" type="checkbox" />
			<label for="rememberMe" class="text-sm">Remember me for the next week</label>
		</div>
	</form>
</main>
