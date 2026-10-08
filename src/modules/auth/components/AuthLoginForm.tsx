import type { ComponentProps, SubmitEventHandler } from "react";
import { Button } from "@/components/ui/actions/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/data-display/Card";
import { Checkbox } from "@/components/ui/forms/Checkbox";
import paths from "@/lib/paths.constants";
import { AuthField } from "./AuthField";
import { AuthSocialButton } from "./AuthSocialButton";

type Props = {
  onSubmit: SubmitEventHandler<HTMLFormElement>;
  emailInputProps: ComponentProps<"input">;
  passwordInputProps: ComponentProps<"input">;
  errors: { email?: string; password?: string; form?: string };
  isSubmitting: boolean;
};

export function AuthLoginForm({
  onSubmit,
  emailInputProps,
  passwordInputProps,
  errors,
  isSubmitting,
}: Props) {
  return (
    <Card className="border-0 shadow-none sm:border sm:shadow-sm">
      <CardHeader className="px-0 sm:px-6">
        <p className="text-sm text-muted-foreground">Welcome back</p>
        <CardTitle className="text-2xl">Sign in to Mini Jira</CardTitle>
        <CardDescription>
          Enter your details to access your workspace.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 px-0 sm:px-6">
        <form onSubmit={onSubmit} className="grid gap-5" noValidate>
          <div className="grid gap-3">
            <AuthSocialButton provider="Google" />
            <AuthSocialButton provider="GitHub" />
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            OR CONTINUE WITH EMAIL
            <span className="h-px flex-1 bg-border" />
          </div>
          <AuthField
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            inputProps={emailInputProps}
            error={errors.email}
          />
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <a
                className="text-sm text-primary hover:underline"
                href="#forgot-password"
              >
                Forgot password?
              </a>
            </div>
            <AuthField
              id="password"
              label=""
              type="password"
              autoComplete="current-password"
              inputProps={passwordInputProps}
              error={errors.password}
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <Checkbox defaultChecked />
            Remember me for 30 days
          </label>
          {errors.form ? (
            <p role="alert" className="text-sm text-destructive">
              {errors.form}
            </p>
          ) : null}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing in…" : "Sign in"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            New to Mini Jira?{" "}
            <a
              className="font-medium text-foreground underline-offset-4 hover:underline"
              href={paths.auth.signUp}
            >
              Create an account
            </a>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
