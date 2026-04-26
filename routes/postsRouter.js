import { Router } from "express";
import * as postsController from '../controllers/postsController.js';
import passport from 'passport';

const postsRouter = Router();
const protect = passport.authenticate('jwt', { session: false });

postsRouter.get('/', postsController.postsGet);                
postsRouter.get('/:postId', postsController.postDetailGet);    
postsRouter.get('/:postId/comments', postsController.postCommentsGet);

postsRouter.post('/', protect, postsController.postCreatePost);
postsRouter.patch('/:postId', protect, postsController.postUpdatePut);
postsRouter.delete('/:postId', protect, postsController.postDeleteDelete);

export default postsRouter;