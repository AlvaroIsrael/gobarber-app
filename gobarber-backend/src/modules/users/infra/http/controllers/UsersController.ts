import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { StatusCodes } from 'http-status-codes';
import CreateUserService from '@modules/users/services/CreateUserService';
import { instanceToInstance } from 'class-transformer';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name, email, password,
    });

    return response.status(StatusCodes.OK).json(instanceToInstance(user));
  }
}

export default UsersController;
