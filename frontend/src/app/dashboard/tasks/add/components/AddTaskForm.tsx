"use client";

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type StoreTaskErrors = {
  title?: string;
  description?: string;
  status?: string;
  deadline?: string;
};

type StoreTaskState = {
  message?: string | StoreTaskErrors;
};

function isErrorObject(message: string | StoreTaskErrors | undefined): message is StoreTaskErrors {
  return typeof message === "object" && message !== null;
}

export default function AddTaskForm({
  action,
}: {
  action: (state: StoreTaskState, formData: FormData) => Promise<StoreTaskState>;
}) {
  const [state, formAction] = useFormState(action, { message: "" });
  const router = useRouter();

  useEffect(() => {
    if (state.message === "Add Task Successfully!") {
      const timer = setTimeout(() => {
        router.push("/dashboard/tasks");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [state.message, router]);

  return (
    <div className="w-[40%] p-10">
      <h1 className="text-2xl text-center mb-7 font-bold">Add Task</h1>

      {state.message === "Add Task Successfully!" && (
        <p className="text-green-500 text-center mt-5 font-medium">
          {state.message}
        </p>
      )}

      <form action={formAction}>
        <div>
          <label htmlFor="title">Title</label>
          <br />
          <input
            type="text"
            id="title"
            name="title"
            className="bg-[#eee] my-3 p-3 rounded-md w-full"
          />
          {isErrorObject(state.message) && state.message.title && (
            <p className="text-red-500 text-sm -mt-1 mb-2">{state.message.title}</p>
          )}
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <br />
          <input
            type="text"
            id="description"
            name="description"
            className="bg-[#eee] my-3 p-3 rounded-md w-full"
          />
          {isErrorObject(state.message) && state.message.description && (
            <p className="text-red-500 text-sm -mt-1 mb-2">{state.message.description}</p>
          )}
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <br />
          <select name="status" id="status" className="bg-[#eee] mt-3 p-3 rounded-md w-full">
            <option value="">Select Status</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          {isErrorObject(state.message) && state.message.status && (
            <p className="text-red-500 text-sm mt- mb-2">{state.message.status}</p>
          )}
        </div>

        <div className="my-3">
          <label htmlFor="deadline">Deadline</label>
          <br />
          <input
            type="date"
            id="deadline"
            name="deadline"
            className="bg-[#eee] mt-3 p-3 rounded-md w-full"
          />
          {isErrorObject(state.message) && state.message.deadline && (
            <p className="text-red-500 text-sm mt-2 mb-2">{state.message.deadline}</p>
          )}
        </div>

        <div className="flex justify-end">
          <button className="p-2 bg-sky-500 text-end mt-5 rounded-md text-white">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
