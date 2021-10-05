import * as axios from 'axios';

export default class Api {
    constructor(host) {
        this.host = host;
    }

    signUp = async ({email, password}) => {
        const url = `${this.host}/auth/register`;
        try {
            const response = await axios.post(url, {
                email,
                password
            });
            console.log(response);
        } catch(e) {
            console.error(e);
        }
        
        
        return null;
    }

    signIn = async ({email, password}) => {
        const url = `${this.host}/auth/login`;
        try {
            const response = await axios.post(url, {
                email,
                password
            });
            console.log(response);
        } catch(e) {
            console.error(e);
        }
        return null;
    }
}