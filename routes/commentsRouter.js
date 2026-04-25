import { Router } from "express";
const commentsRouter = Router();
commentsRouter.get('/', async (req, res) => {
    res.status(301).json({ user: "name" });
});



export default commentsRouter;