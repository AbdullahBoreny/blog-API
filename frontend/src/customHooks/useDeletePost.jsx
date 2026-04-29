import { useState } from "react";

export default function useHandleDeletePost() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    async function handleDelete(postId) {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(
                `http://localhost:3000/api/posts/${postId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to delete post");
            }

            setData(data);

            return true;
        } catch (error) {
            
            setError(error.message);
            return false;
        } finally {
            setLoading(false);
        }
    }

    return {
        handleDelete,
        data,
        error,
        loading,
    };
}