import { useState } from "react";

export default function Form() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);


    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            const res = await fetch("http://localhost:3000/api/log-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            } else {
                console.log(data);
                setSuccess(data.message);
                localStorage.setItem('token', (data.token));

            }


        } catch (err) {
            console.error(err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email</label>
                <input name="email" type="email" required />
            </div>

            <div>
                <label>Password</label>
                <input name="password" type="password" required />
            </div>

            <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Log In"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
    );
}