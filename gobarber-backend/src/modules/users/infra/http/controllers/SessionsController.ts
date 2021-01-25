import { Request, Response } from 'express';
import { container } from 'tsyringe';
import * as HttpStatus from 'http-status-codes';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.status(HttpStatus.OK).json({ user, token });
  }
}

export default SessionsController;
