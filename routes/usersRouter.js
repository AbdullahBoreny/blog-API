import { Router } from "express";
import { prisma } from "../ORM/lib/prisma.js";
const usersRouter = Router();
usersRouter.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    const user = await prisma.user.findFirst({
        where: { id: Number(userId) },
        include: { accounts: true }
    });
    res.json(user);
});



export default usersRouter;