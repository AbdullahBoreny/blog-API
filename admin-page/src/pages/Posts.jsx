import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../api/api';
import Navbar from '../components/Navbar';

export default function Posts() {
    const [posts, setPosts] = useState([]);

    async function fetchPosts() {
        const data = await apiFetch('/posts');
        setPosts(data);
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    async function deletePost(id) {
        await apiFetch(`/posts/${id}`, {
            method: 'DELETE',
        });

        fetchPosts();
    }

    async function togglePublish(id) {
        await apiFetch(`/posts/${id}/publish`, {
            method: 'PATCH',

        });

        fetchPosts();
    }

    return (
        <div>
            <Navbar />

            <Link to='/posts/new'>New Post</Link>


            {posts.map((post) => (
                <div key={post.id}>
                    <h2>{post.title}</h2>

                    <p>
                        {post.published ? 'Published' : 'Draft'}
                    </p>

                    <Link to={`/posts/${post.id}/edit`}>
                        Edit
                    </Link>

                    <button onClick={() => deletePost(post.id)}>
                        Delete
                    </button>

                    <button onClick={() => togglePublish(post.id)}>
                        {post.published ? 'Unpublish' : 'Publish'}
                    </button>
                </div>
            ))}
        </div>
    );
}