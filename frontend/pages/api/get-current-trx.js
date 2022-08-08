import nookies from 'nookies'
import axios from 'axios';
import { BACKEND_URL } from '../../config/constant'

export default async (ctx) => {
    const cookies = nookies.get(ctx)
    let result = null;
    
    if (cookies?.jwt) {
        try {
            const { data } = await axios.get(BACKEND_URL+'/api/user-transferts?filters[id][$eq]='+ ctx.query.trx+'&populate=*', {
                headers: {
                    Authorization: `Bearer ${cookies.jwt}`,
                },
            });
            result = data.data;
        } catch (e) {
            console.log(e);
        }
    }else{
        return {
            redirect: {
              permanent: false,
              destination: '/login'
            }
        }
    }

  return {result};
}