import { sessionMiddleware } from '../../middleware/session';
import { createStrapiAxios } from '../../utils/strapi';
import { createRouter } from "next-connect";


const router = createRouter();
router
  .post(async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await createStrapiAxios()
        .post(`/auth/local`, {
          identifier: email,
          password,
        })
        .then((res) => res.data)
        .then((data) => ({
          ...data.user,
          strapiToken: data.jwt,
        }));

      if (!user.confirmed) {
        return res.status(401).json({
          statusCode: 401,
          message: 'User not confirmed'
        });
      }

      req.session.set('user', user);
      await req.session.save();
      res.json(user);
    } catch (error) {
      const { response: fetchResponse } = error;
      if (fetchResponse) {
        return res.status(fetchResponse?.status || 500).json(error.response?.data);
      }
      res.status(500).json(error);
    }
  });

  export default router;