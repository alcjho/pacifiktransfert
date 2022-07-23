import axios from 'axios';
import { setCookie } from 'nookies'
import { BACKEND_URL } from '../../config/constant';

export default async (req, res) => {
    const { username, password, email } = req.body;
    console.log('body',req.body)

    try {
    const response = await axios.post(BACKEND_URL+'/api/auth/local/register', {
        username,
        email,
        password,
    });

    setCookie({ res }, 'jwt', response.data.jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
    });

    res.status(200).end();
    } catch (e) {
        console.log(e.response?.data)
        res.status(400).send(e.response?.data);
    }
}