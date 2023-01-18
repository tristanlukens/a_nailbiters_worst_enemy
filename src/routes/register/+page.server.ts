import * as shajs from 'sha.js';
import * as luxon from 'luxon';

import type { User } from '$lib/db';
import { createUser } from '$lib/db';

import type { Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';

const hash = (text: string) => new shajs.sha256().update(text).digest('hex');

export const actions: Actions = {
	register: async ({ request, cookies }) => {
		const formData = await request.formData();

		const user: User = {
			firstName: formData.get('firstName') as string,
			email: formData.get('email') as string,
			pronoun: formData.get('pronoun') as string,
			password: formData.get('password') as string
		};

		if (!user?.firstName || !user?.email || !user?.pronoun || !user?.password) {
			return fail(400, { user, missing: true });
		}

		// const { user } = await getUser(email as string);

		// if (!user || user.password !== hash(password as string)) {
		// 	return fail(400, { email, incorrect: true });
		// }

		// if (!rememberMe) {
		// 	cookies.set('sessionid', hash(email as string));
		// } else {
		// 	cookies.set('sessionid', hash(email as string), {
		// 		expires: luxon.DateTime.now().plus({ weeks: 1 }).toJSDate()
		// 	});
		// }

		// throw redirect(303, '/');

		console.log('boo');
	}
};
