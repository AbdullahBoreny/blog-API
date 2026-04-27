import { useState, useEffect } from "react";
import usePostsData from "../customHooks/usePostsData";

export default function Posts() {
    const { posts, error, loading } = usePostsData();
    if (error) return <p>{error.message}</p>;
    if (loading) return <p>loading...</p>;
    return (
        <>
            <div className="titles">
                {posts.map(post => <h1 key={post.id}>{post.title}</h1>)}
            </div>



        </>
    );
};