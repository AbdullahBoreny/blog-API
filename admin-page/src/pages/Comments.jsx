import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

import { apiFetch } from '../api/api';

export default function Comments() {
    const [comments, setComments] = useState([]);

    async function fetchComments() {
        const data = await apiFetch('/comments');
        setComments(data);
    }

    useEffect(() => {
        fetchComments();
    }, []);

    async function deleteComment(id) {
        await apiFetch(`/comments/${id}`, {
            method: 'DELETE',
        });

        fetchComments();
    }

    return (
        <div>
            <Navbar />
            {comments.map((comment) => (
                <div key={comment.id}>
                    <p>{comment.content}</p>
                    <p>@{comment.author.name}</p>

                    <button onClick={() => deleteComment(comment.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}