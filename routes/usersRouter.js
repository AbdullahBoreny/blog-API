import { Router } from "express";
import * as userController from '../controllers/userController.js';
const usersRouter = Router();
usersRouter.post('/sign-up', userController.createUserPost);
usersRouter.get('/:userId', userController.getUserById);
export default usersRouter;