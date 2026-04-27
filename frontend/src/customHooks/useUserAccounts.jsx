import { useState, useEffect } from "react";

export default function useUserAccounts() {
    const [accounts, setAccounts] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        };

        fetch('http://localhost:3000/api/users/accounts', requestOptions)
            .then(async response => {
                const data = await response.json();
                if (!response.ok) {

                    const error = (data && data.message) || response.status;

                    return Promise.reject(error);
                }

                setAccounts(data);
            }).catch(error => {

                setError(error);


            })
            .finally(() => setLoading(false));

    }, []);
    return { accounts, error, loading };
};
