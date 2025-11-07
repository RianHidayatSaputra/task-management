import { cookies } from 'next/headers'

export async function getTaskById(taskId: string) {
    const token = cookies().get('token')?.value

    if (!token) {
        throw new Error('TOKEN_NOT_FOUND')
    }

    const res = await fetch(`http://127.0.0.1:8000/api/tasks/show/${taskId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })

    const data = await res.json()

    if (!res.ok) {
        if (res.status === 401) {
            throw new Error('TOKEN_EXPIRED')
        }

        throw new Error(data.message || 'Gagal mengambil detail task')
    }

    return data
}