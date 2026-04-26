import initPassport from "../service/passport.cjs";
import { matchedData, validationResult } from "express-validator";
import { validateUser } from "../service/userValidation.js";
import bcrypt from "bcryptjs";
import passport from "passport";
import jwt from 'jsonwebtoken';
import { prisma } from "../ORM/lib/prisma.js";
initPassport();

export const createAccount = [
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
    passport.authenticate('local', { session: false }, (error, account, info) => {

        if (error || !account) {

            return res.status(400).json({
                message: info

            });
        }
        req.login(account, { session: false }, (err) => {
            if (err) {
                res.json(err);
            }
          
            const token = jwt.sign({ accountId: account.id }, process.env.secret, { expiresIn: '1h' });

            return res.json({ token, message: info });
        });
    })(req, res);
};
