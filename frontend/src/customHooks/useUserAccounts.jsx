import { useState, useEffect } from "react";

export default function useUserAccounts() {
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAccounts = async () => {
            const response = await fetch('http://localhost:3000/api/users/accounts', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                console.log(response.statusText);
                setError(response.statusText);
                throw new Error(response.statusText);
            }
            const data = await response.json();
            setAccounts(data);
        };
        fetchAccounts();

    }, []);
    return { accounts, error, loading };
};
