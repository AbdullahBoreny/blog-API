import { Router } from "express";
import { prisma } from "../ORM/lib/prisma.js";
const postsRouter = Router();
postsRouter.get('/', async (req, res) => {
    const posts = await prisma.post.findMany({});
    res.json(posts);
});



export default postsRouter;