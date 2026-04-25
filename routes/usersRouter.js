import { Router } from "express";
import * as userController from '../controllers/userController.js';

const usersRouter = Router();


usersRouter.get('/:id', userController.getUserById);
export default usersRouter;