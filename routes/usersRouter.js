import { Router } from "express";
import * as userController from '../controllers/userController.js';

const usersRouter = Router();

usersRouter.route('/sign-up')
  .post(userController.createUserPost);
usersRouter.post('/log-in', userController.userLoginPost);

usersRouter.get('/:id', userController.getUserById);
export default usersRouter;