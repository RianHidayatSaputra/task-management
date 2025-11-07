import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function deleteTask(task_id: string) {
    const token = cookies().get('token')?.value

    if (!token) {
        throw new Error('TOKEN_NOT_FOUND')
    }

    const res = await fetch(`http://127.0.0.1:8000/api/tasks/delete/${task_id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })

    if (res.status === 401) {
        throw new Error('TOKEN_EXPIRED')
    }

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || 'Gagal menghapus task')
    }

    redirect('/dashboard/tasks')
}