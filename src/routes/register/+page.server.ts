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

		const credentials: User = {
			firstName: formData.get('firstName') as string,
			email: formData.get('email') as string,
			pronoun: formData.get('pronoun') as string
		};

		const password = formData.get('password') as string;

		const rememberMe = formData.get('rememberMe') as string;

		if (
			!credentials.firstName ||
			!credentials.email ||
			credentials.pronoun == 'empty' ||
			!password
		) {
			return fail(400, { user: credentials, missing: true });
		}

		const user = await createUser(credentials, hash(password));

		if (user?.alreadyExists) {
			return fail(422, { user, alreadyExists: true });
		}

		if (!rememberMe) {
			cookies.set('sessionid', hash(credentials.email as string));
		} else {
			cookies.set('sessionid', hash(credentials.email as string), {
				expires: luxon.DateTime.now().plus({ weeks: 1 }).toJSDate()
			});
		}

		throw redirect(303, '/');
	}
};
