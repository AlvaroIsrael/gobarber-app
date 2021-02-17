import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '../controllers/UsersController';
import UsersAvatarsController from '../controllers/UsersAvatarsController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig.multer);
const usersController = new UsersController();
const usersAvatarsController = new UsersAvatarsController();

usersRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }), usersController.create);

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), usersAvatarsController.update);

export default usersRouter;
