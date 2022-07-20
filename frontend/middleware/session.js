import { withIronSession, ironSession } from 'iron-session';

const sessionConfig = {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: 'next-session',
  cookieOptions: {
    secure: false,
  },
};

export const sessionMiddleware = ironSession(sessionConfig);

export function withSession(handler) {
  return withIronSession(handler, sessionConfig);
}