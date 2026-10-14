"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authRegisterFormSchema } from "../schemas/auth-form.schema";
import type { AuthRegisterDto } from "../types/auth.type";
import { clientAuthRegistry } from "../client/auth-registry.client";

export const useAuthRegisterForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AuthRegisterDto>({
    resolver: zodResolver(authRegisterFormSchema),
    mode: "onBlur",
    defaultValues: { name: "", email: "", password: "" },
  });

  const handleRegisterSubmit = handleSubmit(async (details) => {
    try {
      const registerAction = clientAuthRegistry.get("authRegisterAction");

      const registration = await registerAction(details);
      if (!registration.success) {
        setError("root", {
          message:
            registration.error?.message ?? "Could not create your account.",
        });
        return;
      }
      if (registration.success && !registration.data) {
        setError("root", {
          message: "An unknown error occurred while creating your account.",
        });
      }

      const login = await signIn("credentials", {
        email: details.email,
        password: details.password,
        redirect: false,
      });
      if (!login || login.error) {
        setError("root.server", {
          message:
            "Your account was created, but automatic sign in failed. Please sign in.",
        });
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setError("root.server", {
        message: "Registration failed. Please try again.",
      });
    }
  });

  return {
    onSubmit: handleRegisterSubmit,
    nameInputProps: register("name"),
    emailInputProps: register("email"),
    passwordInputProps: register("password"),
    errors: {
      name: errors.name?.message,
      email: errors.email?.message,
      password: errors.password?.message,
      form: errors.root?.server?.message,
    },
    isSubmitting,
  };
};
