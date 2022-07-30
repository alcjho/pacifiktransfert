import nookies from 'nookies'

export default async (ctx) => {
    const cookies = nookies.get(ctx)
    let user = null;
    
    if (cookies?.jwt) {
        try {
            const { data } = await axios.get(BACKEND_URL+'/api/users/me?populate=*', {
                headers: {
                    Authorization: `Bearer ${cookies.jwt}`,
                },
            });

            data.jwt = cookies.jwt;
            user = data;

        } catch (e) {
            console.log(e);
        }
    }

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      }
    }
  }else{
    return user;
  }
}