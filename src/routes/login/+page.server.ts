import * as shajs from 'sha.js';
const hash = (text: string) => new shajs.sha256().update(text).digest('hex');

import { gql, GraphQLClient } from 'graphql-request';
import { PUBLIC_READONLY_CONTENT_API } from '$env/static/public';

const getUserInfo = async (email: string) => {
	const client = new GraphQLClient(PUBLIC_READONLY_CONTENT_API);
	const query = gql`
		{
			userRecord(where: { email: "${email}" }) {
				firstName
				password
			}
		}
	`;

	const data = await client.request(query);

	return {
		user: data.userRecord
	};
};

import type { Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';

import * as luxon from 'luxon';

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');
		const rememberMe = formData.get('rememberMe');

		if (!email) {
			return fail(400, { email, missing: true });
		}

		const { user } = await getUserInfo(email as string);

		// if user.firstName is not a string (or null, undefined or the like), no user could be found
		if (!user.firstName) {
			return fail(400, { email, missing: true });
		}

		if (!user || user.password !== password) {
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
