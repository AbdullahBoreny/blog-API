import { useState } from "react";
import useFormSubmit from "../customHooks/useFormSubmit";
export default function Form() {
    const { handleSubmit, loading, error, success } = useFormSubmit();
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