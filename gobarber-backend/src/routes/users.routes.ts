import {Router} from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

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

export default usersRouter;
