import { Input } from "@/components/ui/forms/Input"
import { Label } from "@/components/ui/forms/Label"

type AuthFieldProps = {
  id: string
  label: string
  type?: string
  placeholder?: string
  defaultValue?: string
  hint?: string
}

export function AuthField({ id, label, type = "text", placeholder, defaultValue, hint }: AuthFieldProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className={label ? undefined : "sr-only"}>{label || "Password"}</Label>
      <Input id={id} name={id} type={type} placeholder={placeholder} defaultValue={defaultValue} />
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  )
}
