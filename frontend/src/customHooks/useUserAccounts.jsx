import { useState, useEffect } from "react";

export default function useUserAccounts() {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const fetchAccounts = async () => {
            const result = await fetch('http://localhost:3000/api/users/accounts', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await result.json();
            setAccounts(data);
        };
        fetchAccounts();

    }, []);
    return { accounts };
};
