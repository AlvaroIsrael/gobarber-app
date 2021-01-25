import User from '@modules/users/infra/typeorm/entities/User';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';
import AppError from '@shared/errors/AppError';
import * as HttpStatus from 'http-status-codes';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  userId: string,
  avatarFilename: string
}

class UpdateUserAvatarService {
  private usersRepository: IUsersRepository;

  constructor(
    usersRepository: IUsersRepository,
  ) {
    this.usersRepository = usersRepository;
  }

  public async execute({ userId, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('You must be authenticated to change the avatar.', HttpStatus.UNAUTHORIZED);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath).catch(() => false);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;
    await this.usersRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
