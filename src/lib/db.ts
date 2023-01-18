import { GraphQLClient, gql } from 'graphql-request';
import { PUBLIC_READONLY_CONTENT_API } from '$env/static/public';

export const getUser = async (email: string) => {
	const client = new GraphQLClient(PUBLIC_READONLY_CONTENT_API);
	const query = gql`
				{
					userRecord(where: { email: "${email}" }) {
						firstName
						password
					}
				}
			`;

	const { userRecord } = await client.request(query);

	// no user could be found, so return null
	if (!userRecord?.firstName) return { user: null };

	return { user: userRecord };
};

export type User = {
	firstName: string;
	email: string;
	password: string;
	pronoun: string;
};

export const createUser = async ({ firstName, email, password, pronoun }: User) => {
	console.log(firstName, email, password, pronoun);
};
