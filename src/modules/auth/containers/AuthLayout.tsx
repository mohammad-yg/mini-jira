import type { ReactNode } from "react";
import { AuthBrand } from "../components/AuthBrand";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-[1fr_1fr]">
      <section className="relative hidden flex-col justify-between overflow-hidden bg-muted p-10 lg:flex">
        <AuthBrand />
        <div className="relative z-10 max-w-lg space-y-4">
          <p className="text-sm font-medium text-primary">
            PLAN · BUILD · SHIP
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            Make great work happen together.
          </h1>
          <p className="text-muted-foreground">
            A calm, focused workspace for teams to move projects forward.
          </p>
        </div>
        <p className="text-sm text-muted-foreground">© 2026 Mini Jira</p>
        <div className="absolute -right-24 -bottom-28 size-96 rounded-full border-[40px] border-primary/5" />
      </section>
      <section className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <AuthBrand />
          </div>
          {children}
        </div>
      </section>
    </main>
  );
}
