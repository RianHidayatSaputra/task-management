import LoginForm from "./components/LoginForm";
import { login } from "@/app/lib/auth/login";

type LoginErrors = {
  username?: string;
  password?: string;
};

type LoginState = {
  message?: string | LoginErrors;
};

async function submitLogin(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  "use server";

  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {
    const result = await login(username, password);
    return { message: result.message || "Login Failed!" };

  } catch (error: any) {
    if (typeof error === "object") {
      const errors: LoginErrors = {};

      for (const key in error.message) {
        if (Array.isArray(error.message[key])) {
          errors[key as keyof LoginErrors] = error.message[key][0];
        }
      }

      return { message: errors };
    }

    return { message: "Something went wrong!" };
  }
}

export default function Login() {
  return <LoginForm action={submitLogin} />;
}
