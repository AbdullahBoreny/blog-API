const { prisma } = require('../ORM/lib/prisma');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

function initPassport() {

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
        async function (email, password, cb) {


            return prisma.account.findFirst({ where: { email: email } })
                .then(async user => {
                    if (!user) {
                        return cb(null, false, { message: 'Incorrect email or password.' });
                    }
                    const match = await bcrypt.compare(password, user.password);

                    if (!match) {
                        return cb(null, false, { message: 'Incorrect email or password.' });
                    }
                    return cb(null, user, { message: 'Logged In Successfully' });
                })
                .catch(err => cb(err));
        }
    ));
    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.secret
    },
        function (jwtPayload, cb) {
            console.log(jwtPayload);
            return prisma.user.findFirst({ where: { id: jwtPayload.id } })
                .then(user => {
                    return cb(null, user);
                })
                .catch(err => {
                    return cb(err);
                });
        }
    ));
}
module.exports = initPassport;