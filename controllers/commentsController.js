import { prisma } from "../ORM/lib/prisma.js";

export const postCommentsGet = async (req, res) => {
    const { postId } = req.params;
    try {
        const comments = await prisma.comment.findMany({
            where: { postId: Number(postId) },
            select: {
                content: true,
                author: { select: { name: true, createdAt: true, updatedAt: true } }
            }
        });
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};