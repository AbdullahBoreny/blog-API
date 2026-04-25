import { matchedData, validationResult } from "express-validator";
import { prisma } from "../ORM/lib/prisma.js";
import { validateUser } from "../service/userValidation.js";
import bcrypt from "bcryptjs";
export const createUserPost = [
    validateUser,

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(403).json(errors.array());
        }
        let { email, password, name } = matchedData(req);
        password = await bcrypt.hash(password, 10);
        const account = await prisma.account.create({
            data: {
                email: email,
                password: password,
                user: {
                    create: {
                        name: name,

                    }
                }

            }
        });
        res.json(account);
    }
];
export const getUserById = async (req, res) => {
    const { userId } = req.params;
    console.log(userId);
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(userId) }

        });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};