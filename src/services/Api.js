import * as axios from 'axios';

export default class Api {
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
			console.log(data);
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
			console.log(auth_token)
			return auth_token;
		} catch (e) {
			throw new Error(e.response.data.message);
		}
	};
}
