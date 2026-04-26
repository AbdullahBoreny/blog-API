import { Router } from "express";
import * as commentsController from '../controllers/commentsController.js';
const commentsRouter = Router();
commentsRouter.get('/:postId', commentsController.postCommentsGet);


export default commentsRouter;