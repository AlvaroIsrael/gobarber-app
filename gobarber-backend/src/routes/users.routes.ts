import {Router} from 'express';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const {name, email, password} = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name, email, password,
    });

    /* We should not return a users password in the request.
    * Not a good practice, even if it is encrypted. So we remove it here.*/
    delete user.password;

    return response.status(200).json(user);

  } catch (err) {
    return response.status(400).json({error: err.message});
  }
});

usersRouter.patch('/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService();
      const user = await updateUserAvatar.execute({
        userId: request.user.id,
        avatarFilename: request.file.filename,
      });

      delete user.password;

      return response.status(200).json(user);
    } catch (err) {
      return response.status(400).json({error: err.message});
    }
  });

export default usersRouter;
