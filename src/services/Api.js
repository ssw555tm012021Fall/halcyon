import * as axios from 'axios';

export class Api {
	constructor(host) {
		this.host = host;
	}

	signUp = async ({ email, password }) => {
		const url = `${this.host}/auth/register`;
		try {
			const { data } = await axios.post(url, {
				email,
				password,
			});
			return {
				success: true,
			};
		} catch (e) {
			console.error(e);
		}

		return null;
	};

	signIn = async ({ email, password }) => {
		const url = `${this.host}/auth/login`;
		try {
			const { data } = await axios.post(url, {
				email,
				password,
			});
			const { auth_token } = data;
			return auth_token;
		} catch (e) {
			throw new Error(e.response.data.message);
		}
	};
}
