import {Router} from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';
import * as HttpStatus from 'http-status-codes';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const {email, password} = request.body;
  const authenticateUser = new AuthenticateUserService();

  const {user, token} = await authenticateUser.execute({
    email,
    password,
  });

  delete user.password;

  return response.status(HttpStatus.OK).json({user, token});
});

export default sessionsRouter;
