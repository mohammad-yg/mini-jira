import type { ComponentProps, SubmitEventHandler } from "react"
import { Button } from "@/components/ui/actions/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/data-display/Card"
import { AuthField } from "./AuthField"
import { AuthSocialButton } from "./AuthSocialButton"

type Props = {
    onSubmit: SubmitEventHandler<HTMLFormElement>
    nameInputProps: ComponentProps<"input">
    emailInputProps: ComponentProps<"input">
    passwordInputProps: ComponentProps<"input">
    errors: { name?: string; email?: string; password?: string; form?: string }
    isSubmitting: boolean
}

export function AuthRegisterForm({ onSubmit, nameInputProps, emailInputProps, passwordInputProps, errors, isSubmitting }: Props) {
    return (
        <Card className="border-0 shadow-none sm:border sm:shadow-sm">
            <CardHeader className="px-0 sm:px-6">
                <p className="text-sm text-muted-foreground">Get started for free</p>
                <CardTitle className="text-2xl">Create your account</CardTitle>
                <CardDescription>Bring your team together and get work moving.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5 px-0 sm:px-6">
                <form onSubmit={onSubmit} className="grid gap-5" noValidate>
                    <div className="grid gap-3"><AuthSocialButton provider="Google" /><AuthSocialButton provider="GitHub" /></div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />OR SIGN UP WITH EMAIL<span className="h-px flex-1 bg-border" /></div>
                    <AuthField id="name" label="Full name" autoComplete="name" inputProps={nameInputProps} error={errors.name} />
                    <AuthField id="email" label="Work email" type="email" autoComplete="email" inputProps={emailInputProps} error={errors.email} />
                    <AuthField id="password" label="Password" type="password" autoComplete="new-password" inputProps={passwordInputProps} error={errors.password} hint="Use at least 8 characters." />
                    {errors.form ? <p role="alert" className="text-sm text-destructive">{errors.form}</p> : null}
                    <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Creating account…" : "Create account"}</Button>
                    <p className="text-center text-xs text-muted-foreground">By continuing, you agree to our <a href="#terms" className="underline underline-offset-4">Terms of Service</a> and <a href="#privacy" className="underline underline-offset-4">Privacy Policy</a>.</p>
                    <p className="text-center text-sm text-muted-foreground">Already have an account? <a className="font-medium text-foreground underline-offset-4 hover:underline" href="#sign-in">Sign in</a></p>
                </form>
            </CardContent>
        </Card>
    )
}
