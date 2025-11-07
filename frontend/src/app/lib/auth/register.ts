export async function register(name: string, username: string, password: string) {
    const res = await fetch('http://127.0.0.1:8000/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ name, username, password })
    })

    const data = await res.json()

    if (!res.ok) throw data

    return data
}