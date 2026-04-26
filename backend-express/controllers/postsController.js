import { prisma } from "../ORM/lib/prisma.js";

export const postCommentsGet = async (req, res) => {
    const { postId } = req.params;

    try {
        const comments = await prisma.comment.findMany({
            where: {
                postId: Number(postId),
                parentId: null
            },
            include: {

                author: { select: { name: true } },
                replies: {
                    include: { author: { select: { name: true } } }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch comments" });
    }
};
export const postCreatePost = async (req, res) => {

    const { title, content, published } = req.body;


    try {
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                published,
                authorId: req.user.userId // ID from JWT payload
            }
        });
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ error: "Could not create post" });
    }
};

export const postDetailGet = async (req, res) => {
    const { postId } = req.params;
    try {
        const post = await prisma.post.findUnique({
            where: { id: Number(postId) },
            include: { author: true }
        });
        return post ? res.json(post) : res.json({ message: `post ${postId} doesn't exists` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const postsGet = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({});
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const postUpdatePut = async (req, res) => {
    const { postId } = req.params;
    const { title, content, published } = req.body;

    try {
        const post = await prisma.post.update({
            where: { authorId: req.user.userId, id: Number(postId) },
            data: { content: content, title: title, published: published }
        });
        res.json({ updatedPost: post, message: 'post updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "could not update post error" });
    }
};
export const postDeleteDelete = async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await prisma.post.delete({
            where: { authorId: req.user.authorId, id: Number(postId) }
        });
        res.json({ deletedPost: post, message: "deleted successfully " });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "couldn't delete post error" });
    }
};