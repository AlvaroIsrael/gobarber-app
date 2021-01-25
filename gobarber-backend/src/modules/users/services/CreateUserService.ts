import User from '@modules/users/infra/typeorm/entities/User';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import * as HttpStatus from 'http-status-codes';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  name: string,
  email: string,
  password: string,
}

class CreateUserService {
  private usersRepository: IUsersRepository;

  constructor(
    usersRepository: IUsersRepository,
  ) {
    this.usersRepository = usersRepository;
  }

  public async execute({ name, email, password }: IRequest): Promise<User> {

    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email already used.', HttpStatus.NOT_FOUND);
    }

    const hashedPasswod = await hash(password, 8);

    const user = await this.usersRepository.create({
      name, email, password: hashedPasswod,
    });

    return user;
  }
}

export default CreateUserService;
