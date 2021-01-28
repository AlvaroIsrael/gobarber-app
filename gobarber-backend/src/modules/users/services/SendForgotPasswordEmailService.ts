import { injectable, inject } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {
  }

  public async execute({ email }: IRequest): Promise<void> {

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist.');
    }

    await this.userTokensRepository.generate(user.id);

    await this.mailProvider.sendMail(
      email,
      'Password recovery request recieved',
    );
  }
}

export default SendForgotPasswordEmailService;
