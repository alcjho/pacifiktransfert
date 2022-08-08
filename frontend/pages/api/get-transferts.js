import nookies from 'nookies'
import axios from 'axios';
import { BACKEND_URL } from '../../config/constant'
import _ from 'underscore';

export default async (ctx, user) => {
    const cookies = nookies.get(ctx)
    let result = [];
    let page = ctx.query.page ? ctx.query.page : 1;
    let nbrLines = ctx.query.items ? ctx.query.items : 100;
    
    if (cookies?.jwt) {
        try {
            const { data } = await axios.get(BACKEND_URL+'/api/user-transferts?pagination[page]='+page+'&pagination[pageSize]='+nbrLines+'&filters[user][id][$eq]='+ user?.id + '&sort=createdAt:DESC&populate=*', {
                headers: {
                    Authorization: `Bearer ${cookies.jwt}`,
                },
            });
            result = _.uniq(data?.data, true, x => x.attributes.to_email);
            result.pagination = data?.meta.pagination
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