import { prisma } from "../ORM/lib/prisma.js";




export const getUserAccounts = async (req, res) => {
  

    try {

        const user = await prisma.account.findUnique({
            where: { id: Number(req.user.id) },
            omit: { userId: true, id: true }
        });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};