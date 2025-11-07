import { register } from "@/app/lib/auth/register";
import RegisterForm from "./components/RegisterForm";

type RegisterErrors = {
  name?: string;
  username?: string;
  password?: string;
};

type RegisterState = {
  message?: string | RegisterErrors;
};

async function submitRegister(
  prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  "use server";

  const name = formData.get("name") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {
    const result = await register(name, username, password);
    return { message: result.message };

  } catch (error: any) {
    if (typeof error === "object") {
      const errors: RegisterErrors = {};

      for (const key in error.message) {
        if (Array.isArray(error.message[key])) {
          errors[key as keyof RegisterErrors] = error.message[key][0];
        }
      }

      return { message: errors };
    }

    return { message: "Something went wrong!" };
  }
}

export default function Register() {
  return <RegisterForm action={submitRegister} />;
}
