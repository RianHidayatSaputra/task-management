'use server'

import { cookies } from "next/headers"

export async function login(username: string, password: string) {
    const res = await fetch('http://127.0.0.1:8000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        cache: 'no-store',
        body: JSON.stringify({ username, password })
    })

    const data = await res.json()

    if (!res.ok) throw data

    cookies().delete('token')

    cookies().set('token', data.access_token, {
        httpOnly: true,
        path: '/',
        maxAge: data.expires_in
    })

    return data
}