"use client";

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

type LoginErrors = {
  username?: string;
  password?: string;
};

type LoginState = {
  message?: string | LoginErrors;
};

function isErrorObject(message: string | LoginErrors | undefined): message is LoginErrors {
  return typeof message === "object" && message !== null;
}

export default function LoginForm({
  action,
}: {
  action: (state: LoginState, formData: FormData) => Promise<LoginState>;
}) {
  const [state, formAction] = useFormState(action, { message: "" });
  const router = useRouter();

  useEffect(() => {
    if (state.message === "Login Successfully!") {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [state.message, router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="shadow-xl py-20 px-28 rounded-xl">
        <h1 className="text-2xl text-center mb-14 font-bold">Login</h1>

        {state.message === "Login Successfully!" && (
          <p className="text-green-500 text-center mt-5 font-medium">
            {state.message}
          </p>
        )}

        {
          Object.keys(state.message || {}).length === 0 && state.message != '' && (
            <p className="text-red-500 text-center mb-2 font-medium">
              Login Failed!
            </p>
          )
        }

        <form action={formAction}>

          <div>
            <label htmlFor="username">Username</label>
            <br />
            <input
              type="text"
              id="username"
              name="username"
              className="bg-[#eee] my-3 p-3 rounded-md w-full"
            />
            {isErrorObject(state.message) && state.message.username && (
              <p className="text-red-500 text-sm -mt-1 mb-2">{state.message.username}</p>
            )}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              className="bg-[#eee] mt-3 p-3 rounded-md w-full"
            />
            {isErrorObject(state.message) && state.message.password && (
              <p className="text-red-500 text-sm mt-2 mb-2">{state.message.password}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button className="p-2 bg-sky-500 text-end mt-5 rounded-md text-white">
              Login
            </button>
          </div>

          <p className="text-center mt-5">
            Have an account?{" "}
            <Link href="/register" className="text-sky-500">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
