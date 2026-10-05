"use client"

import { AuthRegisterForm } from "../components/AuthRegisterForm"
import { useAuthRegisterForm } from "../hooks/use-auth-register-form"
import { AuthLayout } from "./AuthLayout"

export function AuthRegister() {
    const form = useAuthRegisterForm()
    return <AuthLayout><AuthRegisterForm {...form} /></AuthLayout>
}
