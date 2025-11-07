'use client'

import { useTransition } from 'react'

export default function DeleteButton({
    taskId,
    deleteAction,
}: {
    taskId: string
    deleteAction: (taskId: string) => Promise<void>
}) {
    const [isPending, startTransition] = useTransition()

    const handleDelete = () => {
        if (confirm('Yakin ingin menghapus task ini?')) {
            startTransition(async () => {
                await deleteAction(taskId)
            })
        }
    }

    return (
        <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="text-red-500 underline text-sm"
        >
            {isPending ? 'Deleting...' : 'Delete'}
        </button>
    )
}
