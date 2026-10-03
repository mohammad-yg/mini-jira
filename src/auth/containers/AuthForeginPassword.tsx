import { Button } from "@/components/ui/actions/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/data-display/Card"
import { AuthField } from "../components/AuthField"
import { AuthLayout } from "./AuthLayout"

const mockRecoveryEmail = "alex@northstar.dev"

export function AuthForeginPassword() {
  return <AuthLayout><Card className="border-0 shadow-none sm:border sm:shadow-sm"><CardHeader className="px-0 sm:px-6"><p className="text-sm text-muted-foreground">Account recovery</p><CardTitle className="text-2xl">Reset your password</CardTitle><CardDescription>Enter the email linked to your account. We’ll send a reset link.</CardDescription></CardHeader><CardContent className="grid gap-5 px-0 sm:px-6"><AuthField id="email" label="Email" type="email" defaultValue={mockRecoveryEmail} /><Button type="button" className="w-full">Send reset link</Button><p className="text-center text-sm text-muted-foreground"><a href="#sign-in" className="font-medium text-foreground underline-offset-4 hover:underline">Back to sign in</a></p></CardContent></Card></AuthLayout>
}
