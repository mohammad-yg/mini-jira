import { Button } from "@/components/ui/actions/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/data-display/Card"
import { Checkbox } from "@/components/ui/forms/Checkbox"
import { AuthField } from "../components/AuthField"
import { AuthSocialButton } from "../components/AuthSocialButton"
import { AuthLayout } from "./AuthLayout"

const mockLogin = { email: "alex@northstar.dev", password: "password123" }

export function AuthLogin() {
  return <AuthLayout><Card className="border-0 shadow-none sm:border sm:shadow-sm"><CardHeader className="px-0 sm:px-6"><p className="text-sm text-muted-foreground">Welcome back</p><CardTitle className="text-2xl">Sign in to Mini Jira</CardTitle><CardDescription>Enter your details to access your workspace.</CardDescription></CardHeader><CardContent className="grid gap-5 px-0 sm:px-6">
    <div className="grid gap-3"><AuthSocialButton provider="Google" /><AuthSocialButton provider="GitHub" /></div>
    <div className="flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />OR CONTINUE WITH EMAIL<span className="h-px flex-1 bg-border" /></div>
    <AuthField id="email" label="Email" type="email" defaultValue={mockLogin.email} />
    <div className="grid gap-2"><div className="flex items-center justify-between"><label htmlFor="password" className="text-sm font-medium">Password</label><a className="text-sm text-primary hover:underline" href="#forgot-password">Forgot password?</a></div><AuthField id="password" label="" type="password" defaultValue={mockLogin.password} /></div>
    <label className="flex items-center gap-2 text-sm text-muted-foreground"><Checkbox defaultChecked />Remember me for 30 days</label>
    <Button type="button" className="w-full">Sign in</Button>
    <p className="text-center text-sm text-muted-foreground">New to Mini Jira? <a className="font-medium text-foreground underline-offset-4 hover:underline" href="#sign-up">Create an account</a></p>
  </CardContent></Card></AuthLayout>
}
