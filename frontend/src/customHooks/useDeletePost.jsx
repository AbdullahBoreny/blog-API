import { useEffect, useState } from "react";

export default function useHandleDeletePost() {
    const [response, setResponse] = useState("");

    const handleDelete = (postId) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        };
        fetch(`http://localhost:3000/api/posts/${postId}`, requestOptions)
            .then(async response => {
                const data = await response.json();
                if (!response.ok) {

                    const error = (data && data.message) || response.status;

                    return Promise.reject(error);
                }
                setResponse(data);
            }).catch(error => console.error(error));

    };

    return { handleDelete, response };
}
