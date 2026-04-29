const BASE_URL = 'http://localhost:3000/api';

export async function apiFetch(endpoint, options = {}) {
    const token = localStorage.getItem('token');

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
            ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error('Request failed');
    }

    return response.json();
}