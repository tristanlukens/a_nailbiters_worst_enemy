import { GraphQLClient, gql } from 'graphql-request';
import { PUBLIC_READONLY_CONTENT_API } from '$env/static/public';
import { PUBLIC_CONTENT_API } from '$env/static/public';

export const getUser = async (email: string) => {
	const client = new GraphQLClient(PUBLIC_READONLY_CONTENT_API);
	const query = gql`
		query getUserRecord {
			userRecord(where: {email: "${email}"}) {
				firstName
				password
			}
		}
	`;

	const { userRecord } = await client.request(query);

	// no user could be found, so return null
	if (!userRecord?.firstName) return { user: null, missing: true };

	return { user: userRecord };
};

export type User = {
	firstName: string;
	email: string;
	pronoun: string;
};

export const createUser = async ({ firstName, email, pronoun }: User, password: string) => {
	const client = new GraphQLClient(PUBLIC_CONTENT_API);
	const query = gql`
		mutation createUserRecord {
			createUserRecord(
				data: { email: "${email}", password: "${password}", firstName: "${firstName}", possesivePronoun: ${pronoun} }
			) {
				email
				firstName
				password
				possesivePronoun
			}
		}
	`;

	let user = await getUser(email);
	// missing is false — an account using this email address alreay exists
	if (!user?.missing) return { user, success: false, alreadyExists: true };

	user = await client.request(query);

	return { user };
};
