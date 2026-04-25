import initPassport from "../service/pass.cjs";
import { matchedData, validationResult } from "express-validator";
import { validateUser } from "../service/userValidation.js";
import bcrypt from "bcryptjs";
import passport from "passport";
import jwt from 'jsonwebtoken';
import { prisma } from "../ORM/lib/prisma.js";
initPassport();

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

export const createUserLogin = (req, res, next) => {
    passport.authenticate('local', { failureMessage: true, session: false }, (err, user, info) => {
        if (err || !user) {

            return res.status(400).json({
                message: 'please sign up',
                user: user
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            const token = jwt.sign(user, process.env.secret, { expiresIn: '1h' });
            return res.json({ user, token });
        });
    })(req, res);
};
