"use client"

import { Button } from "@/components/ui/actions/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/data-display/Card"
import { Checkbox } from "@/components/ui/forms/Checkbox"
import { signIn } from "next-auth/react"
import { useState, type FormEvent } from "react"
import { AuthField } from "../components/AuthField"
import { AuthSocialButton } from "../components/AuthSocialButton"
import { AuthLayout } from "./AuthLayout"

export function AuthLogin() {
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const result = await signIn("credentials", {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      redirect: false,
    })

    setIsSubmitting(false)
    if (!result || result.error) {
      setError("Email or password is incorrect.")
      return
    }
    window.location.assign("/")
  }

  return <AuthLayout><Card className="border-0 shadow-none sm:border sm:shadow-sm"><CardHeader className="px-0 sm:px-6"><p className="text-sm text-muted-foreground">Welcome back</p><CardTitle className="text-2xl">Sign in to Mini Jira</CardTitle><CardDescription>Enter your details to access your workspace.</CardDescription></CardHeader><CardContent className="grid gap-5 px-0 sm:px-6">
    <form onSubmit={handleSubmit} className="grid gap-5">
    <div className="grid gap-3"><AuthSocialButton provider="Google" /><AuthSocialButton provider="GitHub" /></div>
    <div className="flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />OR CONTINUE WITH EMAIL<span className="h-px flex-1 bg-border" /></div>
    <AuthField id="email" label="Email" type="email" autoComplete="email" required />
    <div className="grid gap-2"><div className="flex items-center justify-between"><label htmlFor="password" className="text-sm font-medium">Password</label><a className="text-sm text-primary hover:underline" href="#forgot-password">Forgot password?</a></div><AuthField id="password" label="" type="password" autoComplete="current-password" required /></div>
    <label className="flex items-center gap-2 text-sm text-muted-foreground"><Checkbox defaultChecked />Remember me for 30 days</label>
    {error ? <p role="alert" className="text-sm text-destructive">{error}</p> : null}
    <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Signing in…" : "Sign in"}</Button>
    <p className="text-center text-sm text-muted-foreground">New to Mini Jira? <a className="font-medium text-foreground underline-offset-4 hover:underline" href="#sign-up">Create an account</a></p>
    </form>
  </CardContent></Card></AuthLayout>
}
