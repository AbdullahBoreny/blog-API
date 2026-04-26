import { useState, useEffect } from "react";

export default function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {

        const fetchPosts = async () => {
            const result = await fetch('http://localhost:3000/api/posts');
            const data = await result.json();
            setPosts(data);
        };
        fetchPosts();

    }, []);
    return (

        <>
            <div className="titles">
                {posts.map(post => <h1 key={post.id}>{post.title}</h1>)}
            </div>



        </>
    );
};