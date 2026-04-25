import express from "express";
const app = express();
import path from "node:path";
import morgan from "morgan";
import "dotenv/config";
import routes from "./routes/routes.js";
import passport from "passport";

app.use(express.json());
app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(express.static(path.join(import.meta.dirname, "public")));


app.use(express.urlencoded({ extended: false }));
app.use('/api/authentication', routes.authRouter);
app.use('/api/users', passport.authenticate('jwt', { session: false }), routes.usersRouter);
app.use('/api/comments', routes.commentsRouter);
app.use('/api/posts', routes.postsRouter);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        status: 'error',
        message: err.message || 'Internal Server Error'
    });
});
app.listen(process.env.PORT, () => {
    console.log(`Backend running on http://localhost:${process.env.PORT}/ ${process.env.PORT}`);
});

export { app };