import { Button } from "@/components/ui/actions/Button"

export function AuthSocialButton({ provider }: { provider: "Google" | "GitHub" }) {
  return <Button type="button" variant="outline" className="w-full">Continue with {provider}</Button>
}
