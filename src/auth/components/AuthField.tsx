import { Input } from "@/components/ui/forms/Input"
import { Label } from "@/components/ui/forms/Label"
import type { ComponentProps } from "react"

type AuthFieldProps = {
  id: string
  label: string
  type?: string
  placeholder?: string
  defaultValue?: string
  hint?: string
  required?: boolean
  autoComplete?: string
  inputProps?: ComponentProps<"input">
  error?: string
}

export function AuthField({ id, label, type = "text", placeholder, defaultValue, hint, required, autoComplete, inputProps, error }: AuthFieldProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className={label ? undefined : "sr-only"}>{label || "Password"}</Label>
      <Input id={id} name={id} type={type} placeholder={placeholder} defaultValue={defaultValue} required={required} autoComplete={autoComplete} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined} {...inputProps} />
      {error ? <p id={`${id}-error`} role="alert" className="text-xs text-destructive">{error}</p> : hint ? <p id={`${id}-hint`} className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  )
}
