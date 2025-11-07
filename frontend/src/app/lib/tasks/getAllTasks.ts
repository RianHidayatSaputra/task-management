'use server'

import { cookies } from 'next/headers'

export async function getAllTasks(status?: string, deadline?: string) {
  const token = cookies().get('token')?.value

  if (!token) {
    throw new Error('TOKEN_EXPIRED')
  }

  const params = new URLSearchParams()
  if (status) params.append('status', status)
  if (deadline) params.append('deadline', deadline)

  const res = await fetch(`http://127.0.0.1:8000/api/tasks?${params.toString()}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('TOKEN_EXPIRED')
  }

  return res.json()
}
