import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import * as HttpStatus from 'http-status-codes';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '@modules/users/infra/providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string,
  email: string,
  password: string,
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {
  }

  public async execute({ name, email, password }: IRequest): Promise<User> {

    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email already used.', HttpStatus.NOT_FOUND);
    }

    const hashedPasswod = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name, email, password: hashedPasswod,
    });

    return user;
  }
}

export default CreateUserService;
