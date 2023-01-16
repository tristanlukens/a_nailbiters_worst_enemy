import type { PageServerLoad, Actions } from './$types';

import { redirect } from '@sveltejs/kit';

export const load = (({ cookies }) => {
	return {
		sessionid: cookies.get('sessionid')
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	logout: async ({ cookies }) => {
		cookies.delete('sessionid');

		// otherwise the ?/logout form action name will still be visible in the url
		throw redirect(303, '/');
	}
};
