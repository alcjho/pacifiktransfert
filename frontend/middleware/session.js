import { withIronSession, ironSession } from 'next-iron-session';
import { SECRET_COOKIE_PASSWORD } from '../config/constant';

const sessionConfig = {
  password: SECRET_COOKIE_PASSWORD,
  cookieName: 'next-session',
  cookieOptions: {
    secure: false,
  },
};

const sessionMiddleware = ironSession(sessionConfig);

function withSession(handler) {
  return withIronSession(handler, sessionConfig);
}

export {sessionMiddleware, withSession};