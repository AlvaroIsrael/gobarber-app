import { Secret } from 'jsonwebtoken';

export default {
  jwt: {
    secret: process.env.APP_SECRET as Secret,
    expiresIn: '1d',
  },
};
