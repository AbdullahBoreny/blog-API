import { Router } from "express";
import * as commentsController from '../controllers/commentsController.js';
const commentsRouter = Router();
commentsRouter.get('/', commentsController.getComments);


export default commentsRouter;