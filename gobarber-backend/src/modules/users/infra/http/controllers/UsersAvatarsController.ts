import { Request, Response } from 'express';
import { container } from 'tsyringe';
import * as HttpStatus from 'http-status-codes';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

class UsersAvatarsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);
    const user = await updateUserAvatar.execute({
      userId: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.status(HttpStatus.OK).json(user);
  }
}

export default UsersAvatarsController;
