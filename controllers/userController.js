import { matchedData, validationResult } from "express-validator";
import { prisma } from "../ORM/lib/prisma.js";
import { validateUser } from "../service/userValidation.js";
import bcrypt from "bcryptjs";
import passport from "passport";
import jwt from 'jsonwebtoken';
import initPassport from "../service/pass.cjs";
initPassport();
export const createUserPost = [
    // validateUser,

    async (req, res) => {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(403).json(errors.array());
        // }
        let { email, password, name } = req.body;
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

export const userLoginPost = function (req, res, next) {
    passport.authenticate('local', { failureMessage: true, session: false }, (err, user, info) => {
        if (err || !user) {
            console.log(err);
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(user, 'your_jwt_secret');
            return res.json({ user, token });
        });
    })(req, res);
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.account.findFirst({
            where: { userId: Number(id) }
        });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};