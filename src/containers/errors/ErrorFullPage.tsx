import type { ReactNode } from "react";

type ErrorFullPageProps = {
  title: string;
  description: string;
  actions: ReactNode;
};

export function ErrorFullPage({
  title,
  description,
  actions,
}: ErrorFullPageProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <section
        aria-labelledby="error-full-page-title"
        className="w-full max-w-lg text-center"
      >
        <h1
          id="error-full-page-title"
          className="text-3xl font-semibold tracking-tight text-foreground"
        >
          {title}
        </h1>
        <p className="mt-3 text-base leading-7 text-muted-foreground">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {actions}
        </div>
      </section>
    </main>
  );
}
