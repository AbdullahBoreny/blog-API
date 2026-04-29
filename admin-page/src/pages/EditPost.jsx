import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFetch } from '../api/api';

export default function EditPost() {
    const { id: postId } = useParams();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [published, setPublished] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!postId) return;

        async function fetchPost() {
            const data = await apiFetch(`/posts/${postId}`);

            setTitle(data.title);
            setContent(data.content);
            setPublished(data.published);
        }

        fetchPost();
    }, [postId]);

    async function handleSubmit(e) {
        e.preventDefault();

        const body = {
            title,
            content,
            published,
        };

        if (postId) {
            await apiFetch(`/posts/${postId}`, {
                method: 'PATCH',
                body: JSON.stringify(body),
            });
        } else {
            await apiFetch('/posts', {
                method: 'POST',
                body: JSON.stringify(body),
            });
        }

        navigate('/posts');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='title'
            />

            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='content'
            />

            <label>
                Published
                <input
                    type='checkbox'
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                />
            </label>

            <button>Save</button>
        </form>
    );
}