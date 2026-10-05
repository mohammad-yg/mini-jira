"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authLoginFormSchema } from "../schemas/auth-form-schemas";
import type { AuthCredentials } from "../types/auth-types";

export const useAuthLoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AuthCredentials>({
    resolver: zodResolver(authLoginFormSchema),
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit(async (credentials) => {
    try {
      const result = await signIn("credentials", {
        ...credentials,
        redirect: false,
      });
      if (!result || result.error) {
        setError("root.server", { message: "Email or password is incorrect." });
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setError("root.server", { message: "Sign in failed. Please try again." });
    }
  });

  return {
    onSubmit,
    emailInputProps: register("email"),
    passwordInputProps: register("password"),
    errors: {
      email: errors.email?.message,
      password: errors.password?.message,
      form: errors.root?.server?.message,
    },
    isSubmitting,
  };
};
