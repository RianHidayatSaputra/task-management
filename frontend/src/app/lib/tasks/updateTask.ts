import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

type TaskPayload = {
  title: string
  description: string
  status: string
  deadline: string
}

export async function updateTask(payload: TaskPayload, taskId: string) {
  const token = cookies().get('token')?.value

  if (!token) {
    throw new Error('NO_TOKEN')
  }

  const res = await fetch(`http://127.0.0.1:8000/api/tasks/update/${taskId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  })

  const data = await res.json()

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('TOKEN_EXPIRED')
    }
    throw new Error(data.message || 'Gagal mengambil data tasks')
  }

  revalidatePath('/dashboard/tasks')

  return data
}