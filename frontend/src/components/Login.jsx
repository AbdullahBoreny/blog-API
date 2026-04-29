import { useEffect } from "react";
import useFormSubmit from "../customHooks/useFormLogin";

import '../styles/styles.css';
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { UserPlus } from "lucide-react";
export default function Login() {
    const { handleSubmit, loading, error, success } = useFormSubmit();
    const user = JSON.parse(localStorage.getItem('user'));
    const isLoggedIn = localStorage.getItem('isLogged');
    const navigate = useNavigate();
    const logout = () => {
        window.localStorage.removeItem('isLogged');
        navigate('/log-in', { replace: true });
    };
    useEffect(() => {
        if (success) {
            navigate('/', { replace: true });
        }

    }, [success]);
    if (isLoggedIn) {
        return (
            <>
                <div>welcome back {user.account.user.name}</div>
                <button onClick={logout}>log out</button>
            </>
        );

    }
    return (
        <div className="wrapper signIn">

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input name="email" type="email" required />
                </div>

                <div>
                    <label>Password</label>
                    <input name="password" type="password" required />
                </div>

                <button

                    type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Log In"}


                </button>
                <p >
                    <Link to='/sign-up'>
                        <UserPlus /></Link>
                </p>

                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
            </form>
        </div >
    );
}