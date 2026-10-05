"use client"

import { authRegister } from "@/auth/actions/auth-register"
import { authBffApiClient } from "@/auth/services/auth-bff-api-client"
import { createAuthRegisterRequest } from "@/auth/services/auth-register-request"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { authRegisterFormSchema } from "../schemas/auth-form-schemas"
import type { AuthRegisterDto } from "../types/auth-types"

const registerRequest = createAuthRegisterRequest({ apiClient: authBffApiClient })

export const useAuthRegisterForm = () => {
    const router = useRouter()
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<AuthRegisterDto>({
        resolver: zodResolver(authRegisterFormSchema),
        mode: "onBlur",
        defaultValues: { name: "", email: "", password: "" },
    })

    const onSubmit = handleSubmit(async (details) => {
        try {
            const registration = await authRegister(details, { registerRequest })
            if (!registration.ok || !registration.data) {
                setError("root.server", {
                    message: registration.error?.message ?? "Could not create your account.",
                })
                return
            }

            const login = await signIn("credentials", {
                email: details.email,
                password: details.password,
                redirect: false,
            })
            if (!login || login.error) {
                setError("root.server", {
                    message: "Your account was created, but automatic sign in failed. Please sign in.",
                })
                return
            }

            router.replace("/")
            router.refresh()
        } catch {
            setError("root.server", { message: "Registration failed. Please try again." })
        }
    })

    return {
        onSubmit,
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
    }
}
