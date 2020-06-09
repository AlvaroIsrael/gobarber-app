import {Router} from 'express';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const {name, email, password} = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name, email, password,
  });

  /* We should not return a users password in the request.
  * Not a good practice, even if it is encrypted. So we remove it here.*/
  delete user.password;

  return response.status(200).json(user);
});

usersRouter.patch('/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();
    const user = await updateUserAvatar.execute({
      userId: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.status(200).json(user);
  });

export default usersRouter;
