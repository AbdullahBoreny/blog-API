import { Router } from "express";
import * as userController from '../controllers/userController.js';

const usersRouter = Router();


usersRouter.get('/accounts', userController.getUserAccounts);
export default usersRouter;