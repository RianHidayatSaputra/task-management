import { getTaskById } from "@/app/lib/tasks/getTaskById";
import UpdateTaskForm from "../components/UpdateTaskForm";
import { redirect } from "next/navigation";
import { updateTask } from "@/app/lib/tasks/updateTask";

type UpdateTaskErrors = {
  title?: string;
  description?: string;
  status?: string;
  deadline?: string;
};

type Props = {
  params: {
    task_id: string
  }
}

type UpdateTaskState = {
  message?: string | UpdateTaskErrors;
};

export function submitUpdateTask(task_id: string) {
  return async function (
    prevState: UpdateTaskState,
    formData: FormData
  ): Promise<UpdateTaskState> {
    "use server";

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const status = formData.get("status") as string;
    const deadline = formData.get("deadline") as string;

    try {
      const result = await updateTask(
        { title, description, status, deadline },
        task_id
      );

      return { message: result.message };
    } catch (error: any) {
      if (typeof error === "object") {
        const errors: UpdateTaskErrors = {};

        for (const key in error.message) {
          if (Array.isArray(error.message[key])) {
            errors[key as keyof UpdateTaskErrors] = error.message[key][0];
          }
        }

        return { message: errors };
      }

      return { message: "Something went wrong!" };
    }
  };
}

export default async function EditTask({ params }: Props) {
  let task: any = null;

  try {
    task = await getTaskById(params.task_id);
  } catch (error: any) {
    if (error.message === "TOKEN_EXPIRED") {
      redirect("/api/logout");
    }

    return <p className="text-red-500">Gagal memuat data task</p>;
  }

  return <UpdateTaskForm action={submitUpdateTask(params.task_id)} defaultValues={task.data} />;
}
