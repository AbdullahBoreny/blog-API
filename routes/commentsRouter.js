import { Router } from "express";
import { prisma } from "../ORM/lib/prisma.js";
const commentsRouter = Router();
commentsRouter.get('/', async (req, res) => {
    const comments = await prisma.comment.findMany({
        include: { author: true, post: true},
        distinct: "id"
    });
    res.json(comments);
});



export default commentsRouter;