import { Router } from "express";
import * as authController from '../controllers/authController.js';
const authRouter = Router();
authRouter.route('/sign-up')
    .post(authController.createUserPost);

authRouter.post('/log-in', authController.createUserLogin);

export default authRouter;