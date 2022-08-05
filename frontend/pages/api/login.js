import axios from 'axios';
import nookies from 'nookies';
import { setCookie } from 'nookies'
import { BACKEND_URL } from '../../config/constant';

export default async (req, res, redirectUrl) => {
    const userdata  = req.body;
    try {
        const { data } = await axios.post(BACKEND_URL+'/api/auth/local?populate=*', userdata);
        let cookies = nookies.get({ req }, 'redirect');
        data.redirect = cookies?.redirect;

        setCookie({ res }, 'jwt', data.jwt, {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 3600,
            path: '/',
        });

        res.json({ success: true, redirect: cookies?.redirect? cookies.redirect: '/transactions' });
    } catch (e) {
        console.log(e.response?.data)
        res.status(400).send(e.response?.data);
    }
}