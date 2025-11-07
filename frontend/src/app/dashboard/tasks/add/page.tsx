import AddTaskForm from "./components/AddTaskForm";
import { storeTask } from "@/app/lib/tasks/storeTask";

type StoreTaskErrors = {
  title?: string;
  description?: string;
  status?: string;
  deadline?: string;
};

type StoreTaskState = {
  message?: string | StoreTaskErrors;
};

async function submitAddTask(
  prevState: StoreTaskState,
  formData: FormData
): Promise<StoreTaskState> {
  "use server";

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const status = formData.get("status") as string;
  const deadline = formData.get("deadline") as string;

  try {
    const result = await storeTask({ title, description, status, deadline });
    return { message: result.message };

  } catch (error: any) {
    if (typeof error === "object") {
      const errors: StoreTaskErrors = {};

      for (const key in error.message) {
        if (Array.isArray(error.message[key])) {
          errors[key as keyof StoreTaskErrors] = error.message[key][0];
        }
      }

      return { message: errors };
    }

    return { message: "Something went wrong!" };
  }
}

export default function AddTask() {
  return <AddTaskForm action={submitAddTask} />;
}
