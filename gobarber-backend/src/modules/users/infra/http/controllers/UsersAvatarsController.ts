import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { StatusCodes } from 'http-status-codes';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { classToClass } from 'class-transformer';

class UsersAvatarsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);
    const user = await updateUserAvatar.execute({
      userId: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.status(StatusCodes.OK).json(classToClass(user));
  }
}

export default UsersAvatarsController;
