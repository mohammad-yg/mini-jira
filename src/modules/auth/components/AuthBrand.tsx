import { CheckSquare2 } from "lucide-react";

export function AuthBrand() {
  return (
    <div className="flex items-center gap-2 font-semibold tracking-tight">
      <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
        <CheckSquare2 className="size-5" />
      </span>
      <span>
        mini<span className="text-muted-foreground">jira</span>
      </span>
    </div>
  );
}
