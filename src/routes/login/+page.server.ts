import * as shajs from 'sha.js';
import * as luxon from 'luxon';

import { getUser } from '$lib/db';

import type { Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';

const hash = (text: string) => new shajs.sha256().update(text).digest('hex');

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();

		const email = formData.get('email');
		const password = formData.get('password');
		const rememberMe = formData.get('rememberMe');

		if (!email || !password) {
			return fail(400, { email, missing: true });
		}

		const { user } = await getUser(email as string);

		if (!user || user.password !== hash(password as string)) {
			return fail(400, { email, incorrect: true });
		}

		if (!rememberMe) {
			cookies.set('sessionid', hash(email as string));
		} else {
			cookies.set('sessionid', hash(email as string), {
				expires: luxon.DateTime.now().plus({ weeks: 1 }).toJSDate()
			});
		}

		throw redirect(303, '/');
	}
};
