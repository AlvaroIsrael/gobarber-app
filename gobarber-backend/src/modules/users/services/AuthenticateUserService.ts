import User from '@modules/users/infra/typeorm/entities/User';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import * as HttpStatus from 'http-status-codes';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  email: string,
  password: string;
}

interface IResponse {
  user: User,
  token: string;
}

class AuthenticateUserService {
  private usersRepository: IUsersRepository;

  constructor(
    usersRepository: IUsersRepository,
  ) {
    this.usersRepository = usersRepository;
  }

  public async execute({ email, password }: IRequest): Promise<IResponse> {

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', HttpStatus.UNAUTHORIZED);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', HttpStatus.UNAUTHORIZED);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };

  }
}

export default AuthenticateUserService;
