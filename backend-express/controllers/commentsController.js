import { prisma } from "../ORM/lib/prisma.js";

export const getComments = async (req, res) => {
    // const { postId } = req.params;
    try {
        const comments = await prisma.comment.findMany({
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