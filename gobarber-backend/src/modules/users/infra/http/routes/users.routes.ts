import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import UsersAvatarsController from '../controllers/UsersAvatarsController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const usersAvatarsController = new UsersAvatarsController();

usersRouter.post('/', usersController.create);

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), usersAvatarsController.update);

export default usersRouter;
