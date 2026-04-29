import { Router } from "express";
import * as postsController from '../controllers/postsController.js';
import passport from 'passport';
import { prisma } from "../ORM/lib/prisma.js";
const postsRouter = Router();
const protect = passport.authenticate('jwt', { session: false });

postsRouter.get('/', postsController.postsGet);
postsRouter.post('/', protect, postsController.postCreatePost);

postsRouter.get('/:postId', postsController.postDetailGet);
// postsRouter.get('/:postId/comments', postsController.postCommentsGet);
// comments already fetched with the above call

postsRouter.patch('/:postId', protect, postsController.postUpdatePut);
postsRouter.delete('/:postId', protect, postsController.postDeleteDelete);

postsRouter.patch('/:id/publish', protect, async (req, res) => {
    const id = Number(req.params.id);

    const post = await prisma.post.findUnique({
        where: { id },
    });

    const updatedPost = await prisma.post.update({
        where: { id },
        data: {
            published: !post.published,
        },
    });

    res.json(updatedPost);
});


export default postsRouter;
