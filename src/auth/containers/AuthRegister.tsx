"use client"

import { Button } from "@/components/ui/actions/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/data-display/Card"
import { authRegister } from "@/auth/actions/auth-register"
import { authBffApiClient } from "@/auth/services/auth-bff-api-client"
import { createAuthRegisterRequest } from "@/auth/services/auth-register-request"
import { signIn } from "next-auth/react"
import { useState, type FormEvent } from "react"
import { AuthField } from "../components/AuthField"
import { AuthSocialButton } from "../components/AuthSocialButton"
import { AuthLayout } from "./AuthLayout"

export function AuthRegister() {
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get("name") ?? "")
    const email = String(formData.get("email") ?? "")
    const password = String(formData.get("password") ?? "")
    const registration = await authRegister(
      { name, email, password },
      { registerRequest: createAuthRegisterRequest({ apiClient: authBffApiClient }) },
    )

    if (!registration.ok || !registration.data) {
      setIsSubmitting(false)
      setError(registration.error?.message ?? "Could not create your account.")
      return
    }

    const login = await signIn("credentials", { email, password, redirect: false })
    setIsSubmitting(false)
    if (!login || login.error) {
      setError("Your account was created, but automatic sign in failed. Please sign in.")
      return
    }
    window.location.assign("/")
  }

  return <AuthLayout><Card className="border-0 shadow-none sm:border sm:shadow-sm"><CardHeader className="px-0 sm:px-6"><p className="text-sm text-muted-foreground">Get started for free</p><CardTitle className="text-2xl">Create your account</CardTitle><CardDescription>Bring your team together and get work moving.</CardDescription></CardHeader><CardContent className="grid gap-5 px-0 sm:px-6">
    <form onSubmit={handleSubmit} className="grid gap-5">
    <div className="grid gap-3"><AuthSocialButton provider="Google" /><AuthSocialButton provider="GitHub" /></div>
    <div className="flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />OR SIGN UP WITH EMAIL<span className="h-px flex-1 bg-border" /></div>
    <AuthField id="name" label="Full name" autoComplete="name" required />
    <AuthField id="email" label="Work email" type="email" autoComplete="email" required />
    <AuthField id="password" label="Password" type="password" autoComplete="new-password" required hint="Use at least 8 characters." />
    {error ? <p role="alert" className="text-sm text-destructive">{error}</p> : null}
    <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Creating account…" : "Create account"}</Button>
    <p className="text-center text-xs text-muted-foreground">By continuing, you agree to our <a href="#terms" className="underline underline-offset-4">Terms of Service</a> and <a href="#privacy" className="underline underline-offset-4">Privacy Policy</a>.</p>
    <p className="text-center text-sm text-muted-foreground">Already have an account? <a className="font-medium text-foreground underline-offset-4 hover:underline" href="#sign-in">Sign in</a></p>
    </form>
  </CardContent></Card></AuthLayout>
}
