import axios from 'axios';
import { setCookie } from 'nookies'
import { BACKEND_URL } from '../../config/constant';

export default async (userdata) => {
    try {
        const response = await axios.post(BACKEND_URL+'/api/auth/local/register', userdata);
        setCookie({ res }, 'jwt', response.data.jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 24 * 60 * 60,
            path: '/',
        });

        return response.data;
    } catch (e) {
        return e.response.data
    }
}