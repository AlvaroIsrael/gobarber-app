import {getRepository} from 'typeorm';
import User from '../models/User';
import path from 'path';
import uploadConfig from '../config/upload';
import fs from 'fs';

interface Request {
  userId: string,
  avatarFilename: string
}

class UpdateUserAvatarService {
  public async execute({userId, avatarFilename}: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(userId);

    if (!user) {
      throw new Error('You must be authenticated to change the avatar.');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath).catch(() => false);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;
    await userRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
