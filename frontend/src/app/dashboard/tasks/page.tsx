import DeleteButton from "@/app/components/DeleteButton"
import { deleteTask } from "@/app/lib/tasks/deleteTask"
import { getAllTasks } from "@/app/lib/tasks/getAllTasks"
import Link from "next/link"
import { redirect } from "next/navigation"
import { deleteTask as serverDeleteTask } from '@/app/lib/tasks/deleteTask'

export default async function TaskPage({
    searchParams,
}: {
    searchParams: { status?: string; deadline?: string }
}) {
    const status = searchParams.status || ""
    const deadline = searchParams.deadline || ""

    let tasks: any = null

    const deleteAction = async (taskId: string) => {
        'use server'
        await serverDeleteTask(taskId)
    }

    try {
        tasks = await getAllTasks(status, deadline)
    } catch (error: any) {
        if (error.message === "TOKEN_EXPIRED") {
            redirect("/api/logout")
        }
    }

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-3">Task List</h1>

            <div className="flex items-center justify-between mb-5">
                <Link
                    href={"/dashboard/tasks/add"}
                    className="p-2 bg-sky-500 rounded-md text-white"
                >
                    Add Task
                </Link>

                <form method="GET" className="flex items-center gap-3">
                    <select
                        name="status"
                        defaultValue={status}
                        className="border p-2 rounded-md"
                    >
                        <option value="">All Status</option>
                        <option value="todo">To Do</option>
                        <option value="in_progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>

                    <input
                        type="date"
                        name="deadline"
                        defaultValue={deadline}
                        className="border p-2 rounded-md"
                    />

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-3 py-2 rounded-md"
                    >
                        Filter
                    </button>
                </form>
            </div>

            <table className="w-full border border-gray-300 mt-5">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-4 py-2 text-left">#</th>
                        <th className="border px-4 py-2 text-left">User</th>
                        <th className="border px-4 py-2 text-left">Title</th>
                        <th className="border px-4 py-2 text-left">Description</th>
                        <th className="border px-4 py-2 text-left">Status</th>
                        <th className="border px-4 py-2 text-left">Deadline</th>
                        <th className="border px-4 py-2 text-left">Created By</th>
                        <th className="border px-4 py-2 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks?.data?.length > 0 ? (
                        tasks.data.map((task: any, index: number) => (
                            <tr key={task.task_id} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{task.users?.name}</td>
                                <td className="border px-4 py-2">{task.title}</td>
                                <td className="border px-4 py-2">{task.description}</td>
                                <td className="border px-4 py-2">
                                    {task.status === "todo" ? (
                                        <p className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md inline-block">
                                            To Do
                                        </p>
                                    ) : task.status === "in_progress" ? (
                                        <p className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-md inline-block">
                                            In Progress
                                        </p>
                                    ) : (
                                        <p className="bg-green-500 text-white text-xs px-2 py-1 rounded-md inline-block">
                                            Done
                                        </p>
                                    )}
                                </td>
                                <td className="border px-4 py-2">{task.deadline}</td>
                                <td className="border px-4 py-2">{task.created_by}</td>
                                <td className="border px-4 py-2">
                                    <Link
                                        href={`/dashboard/tasks/edit/${task.task_id}`}
                                        className="text-blue-500 underline text-sm mr-3"
                                    >
                                        Edit
                                    </Link>

                                    <DeleteButton taskId={task.task_id} deleteAction={deleteAction} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={8}
                                className="border px-4 py-2 text-center text-gray-500"
                            >
                                No tasks available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
