import { Router } from 'express';
import UsersController from '@modules/users/infra/http/controllers/UsersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersAvatarsController from '@modules/users/infra/http/controllers/UsersAvatarsController';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const usersAvatarsController = new UsersAvatarsController();

usersRouter.post('/', usersController.create);

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), usersAvatarsController.update);

export default usersRouter;
