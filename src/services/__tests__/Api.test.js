const { Api } = require('../Api');
const axios = require('axios');

jest.mock('axios');
let api;
beforeEach(() => {
	api = new Api('http://localhost:3000');
});

it('It should register a user', async () => {
	axios.post.mockResolvedValue({
		data: { success: true },
	});

	const {success} = await api.signUp({
        email: 'jjzcru@gmail.com',
        password: 'password'
    });
	expect(success).toEqual(true);
});

it('It should login a user', async () => {
	axios.post.mockResolvedValue({
		data: { 
            auth_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
        },
	});

	const token = await api.signIn({
        email: 'viyeta@gmail.com',
        password: 'password'
    });
    expect(typeof token).toBe("string");
	expect(token.length).toBeGreaterThan(0);
});
