import { Router } from 'express';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';
import * as HttpStatus from 'http-status-codes';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const usersRepository = new UsersRepository();
  const createUser = new CreateUserService(usersRepository);

  const user = await createUser.execute({
    name, email, password,
  });

  /* We should never return a user's password in the request.
   * Not a good practice, even if it is encrypted. So we remove it here.*/
  delete user.password;

  return response.status(HttpStatus.OK).json(user);
});

usersRouter.patch('/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {

    const usersRepository = new UsersRepository();
    const updateUserAvatar = new UpdateUserAvatarService(usersRepository);
    const user = await updateUserAvatar.execute({
      userId: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.status(HttpStatus.OK).json(user);
  });

export default usersRouter;
