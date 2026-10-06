import Link from "next/link";
import { CheckSquare2 } from "lucide-react";
import paths from "@/lib/paths";

export function PlatformBrand() {
  return (
    <Link
      href={paths.dashboard}
      aria-label="Mini Jira dashboard"
      className="inline-flex items-center gap-2 rounded-lg font-semibold tracking-tight outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
        <CheckSquare2 aria-hidden="true" className="size-5" />
      </span>
      <span className="text-lg">
        mini<span className="text-muted-foreground"> Jira</span>
      </span>
    </Link>
  );
}
