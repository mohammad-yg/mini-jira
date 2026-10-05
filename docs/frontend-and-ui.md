# Frontend and UI conventions

## App Router and feature placement

- Route files belong in `src/app/`. Keep page entry points thin and compose feature containers from them.
- Feature-specific components, hooks, schemas, services, types, queries, and application functions belong under their feature folder (`src/auth/` is the current example).
- Generic reusable UI belongs in `src/components/ui/`, grouped by category (`actions`, `forms`, `layout`, `navigation`, `overlays`, `data-display`, `feedback`, `media`, `calendar`, `charts`, and `utilities`). Use the existing category barrel exports when appropriate.
- Put rendering and accessible HTML in components. Keep form state and submit orchestration in feature hooks. Keep HTTP details in service adapters. Keep application orchestration in small functions under `actions/` or `queries/`.
- `src/auth/actions/*` are ordinary async TypeScript use-case functions, not Next.js Server Actions; none of those files declares a `"use server"` boundary.

## Forms

The auth forms provide the current pattern:

1. Define a Zod schema under `src/auth/schemas/`.
2. Use `react-hook-form` with `zodResolver` in the feature hook.
3. Return submit state, input registration props, and field/form errors from the hook.
4. Pass those values to the presentational form component; render errors next to the relevant field and use `role="alert"` for server-level form errors.
5. Keep server validation and authorization in the route/backend as well. Client-side schema validation is not a security boundary.

Current auth schemas validate required trimmed name/email and an eight-character minimum password for registration; sign-in requires email and password. Do not assume these constraints are valid for a new feature without checking its API contract.

## Shared component conventions

- Add a Storybook story beside reusable UI components using the existing `*.stories.tsx` naming pattern.
- Re-export category-level components through the existing `index.ts` files when that is the established pattern in the category.
- Reuse semantic HTML, accessible labels, keyboard behavior, and existing CSS variables before introducing a one-off primitive.
- Global theme colors, radii, font variables, and dark-mode values are defined in `src/app/globals.css`; Geist font files and setup live under `src/app/fonts/` and `src/app/layout.tsx`.
- Storybook loads the app stylesheet in `.storybook/preview.tsx`; configuration is in `.storybook/main.ts`.

## Browser and external state

For browser-owned state such as `matchMedia` or Embla events, follow the `useSyncExternalStore` subscription pattern used by `src/hooks/use-mobile.ts` and `src/components/ui/media/Carousel.tsx`. Keep server snapshots deterministic and clean up subscriptions. Do not mirror an external source into React state from an effect unless the source cannot be subscribed to directly.

## Validation

Run `npm run lint` after behavior changes and `npm run format:check` after editing. For a UI component, run Storybook and inspect the affected story when the change is visual or interactive. Root Vitest configuration is present for Storybook stories, but the root package currently exposes no `test` script; see [development](development.md).
