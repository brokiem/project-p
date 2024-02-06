const API_URL = '/api/'
const API_VERSION = 'v1';
const API_ROUTE = `${API_URL}${API_VERSION}`;

export const login = async (username: string, password: string) => {
    const response = await fetch(`${API_ROUTE}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    return response.json();
}
