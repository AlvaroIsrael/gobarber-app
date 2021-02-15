import { Secret } from 'jsonwebtoken';

export default {
  jwt: {
    secret: process.env.JWT_SECRET as Secret,
    expiresIn: '1d',
  },
};
