import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <nav
            style={{
                display: 'flex',
                gap: '1rem',
                padding: '1rem',
                borderBottom: '1px solid #ccc',
                marginBottom: '1rem',
            }}
        >
            <Link to='/posts'>Posts</Link>

            <Link to='/comments'>Comments</Link>

            <Link to='/posts/new'>New Post</Link>

            <button onClick={handleLogout}>
                Logout
            </button>
        </nav>
    );
}