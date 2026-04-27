import { useState } from "react";
export default function useFormSubmit() {
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
                console.log("?? what");
                throw new Error(data.info.message);
            }

            if (!data.token) {
                console.log(data.token);
                throw new Error(data.info.message);
            }

            setSuccess(data.message);
            localStorage.setItem('token', (data.token));

        }
        catch (err) {

            console.error(err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    return { handleSubmit, error, loading, success };
}
