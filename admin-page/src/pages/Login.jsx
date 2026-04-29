import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../api/api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const data = await apiFetch('/log-in', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });

            localStorage.setItem('token', data.token);

            navigate('/posts');
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type='password'
                placeholder='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button>Login</button>
        </form>
    );
}