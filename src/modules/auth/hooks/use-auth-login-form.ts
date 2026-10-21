"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authLoginFormSchema } from "../schemas/auth-form.schema";
import type { AuthCredentials } from "../types/auth.type";
import { clientAuthRegistry } from "../client/auth-registry.client";

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

  const handleLoginSubmit = handleSubmit(async (credentials) => {
    try {
      const result =
        await clientAuthRegistry.get("authLoginAction")(credentials);
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
    onSubmit: handleLoginSubmit,
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
