import type { ComponentProps } from "react";
import { DashboardHeader } from "./DashboardHeader";

type Props = {
  signOutAction: NonNullable<ComponentProps<"form">["action"]>;
};

export function DashboardHome({ signOutAction }: Props) {
  return (
    <div className="min-h-screen">
      <DashboardHeader signOutAction={signOutAction} />
      <main className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center p-8">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </main>
    </div>
  );
}
