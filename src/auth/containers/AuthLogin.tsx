"use client"

import { AuthLoginForm } from "../components/AuthLoginForm"
import { useAuthLoginForm } from "../hooks/use-auth-login-form"
import { AuthLayout } from "./AuthLayout"

export function AuthLogin() {
    const form = useAuthLoginForm()
    return <AuthLayout><AuthLoginForm {...form} /></AuthLayout>
}
