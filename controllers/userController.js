import { prisma } from "../ORM/lib/prisma.js";




export const getUserById = async (req, res) => {
    const { id } = req.params;


    try {
        const user = await prisma.user.findFirst({
            where: { id: Number(id) },

            include: { posts: true  },
        });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};