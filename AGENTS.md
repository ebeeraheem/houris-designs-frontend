# AGENTS.md

## Project overview

- Houris Designs is a customer-facing made-to-measure fashion ecommerce frontend. Current routes cover the landing page, about page, product collection and product detail pages, size guide, authentication, account management, cart, checkout, and order history/detail flows.
- This repository uses the Next.js App Router only. Routes live under `app/`; no `pages/` directory was found.
- Main technologies visible in the repo: Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Base UI, Remix Icon, TanStack React Query, Axios, React Hook Form, Zod, GSAP, next-themes, react-hot-toast, ESLint, Prettier, and `prettier-plugin-tailwindcss`.
- The app is organized around feature modules in `features/`. Feature folders commonly include adapters, repositories, services, transformers, schemas, types, constants, React Query hooks under `usecases/`, and presentational components.

## Setup commands

- Package manager: npm, identified by `package-lock.json`.
- Install dependencies:

```bash
npm install
```

- The README documents `NEXT_PUBLIC_API_BASE_URL` for local API integration. See `.env.example` before running locally.
- The README documents adding shadcn components with:

```bash
npx shadcn@latest add button
```

## Development commands

- Start the development server:

```bash
npm run dev
```

- `npm run dev` runs `next dev --turbopack`.
- Standard local URL for Next.js development: `http://localhost:3000`.
- Docker, database, or local service commands: Not found in repo.

## Build and production commands

- Build:

```bash
npm run build
```

- Start the production server after a build:

```bash
npm run start
```

- Required prebuild steps: Not found in repo.

## Test commands

- Test scripts: Not found in repo.
- Jest, Vitest, Playwright, Cypress, Storybook, or React Testing Library configuration: Not found in repo.
- Targeted test command: Not found in repo.

## Linting, formatting, and type checks

- Lint:

```bash
npm run lint
```

- Format TypeScript and TSX files:

```bash
npm run format
```

- Type check:

```bash
npm run typecheck
```

- ESLint uses `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`.
- Prettier is configured with LF line endings, no semicolons, double quotes, 2-space tabs, trailing commas where valid in ES5, print width 80, and Tailwind class sorting through `prettier-plugin-tailwindcss`.

## Next.js conventions

- App Router conventions are in use: `app/layout.tsx`, `app/page.tsx`, nested route directories, and route-level `page.tsx` files.
- No route handlers, `middleware.*`, `loading.tsx`, `error.tsx`, or `pages/` directory were found.
- Use server components by default for new App Router files. Add `"use client"` only when a component needs hooks, browser APIs, client-side state, event handlers, animation libraries, React Query hooks, or other client interactivity.
- Root metadata and Google fonts are configured in `app/layout.tsx`. Images use `next/image` in multiple shared and feature components.
- Client providers are centralized in `components/providers.tsx` with TanStack Query, smooth scrolling, custom cursor, and toast support. Theme handling is wrapped by `components/theme-provider.tsx`.
- Follow existing route and feature patterns instead of introducing new architecture.

## Code style guidelines

- TypeScript is strict, with `@/*` mapped to the repository root in `tsconfig.json`.
- Prefer absolute imports through `@/` when matching existing code.
- Components and files use PascalCase for React components and camelCase or kebab-case for utilities and modules, matching nearby files.
- Styling is Tailwind-first, with design tokens and shared utility classes defined in `app/globals.css`. Reuse classes such as `page-shell`, `display-heading`, `section-heading`, `body-copy`, `surface-card`, `surface-panel`, `field-label`, `field-input`, `status-pill`, `nav-link`, and `eyebrow-label` where appropriate.
- shadcn/ui configuration is in `components.json`; UI components live under `components/ui`, with Remix Icon configured as the icon library.
- API-facing feature code follows the adapter -> repository -> transformer/service -> usecase/component pattern. Preserve that layering for product, cart, auth, account, order, checkout, and size-guide work.
- Use Zod schemas for request payload validation where the feature already has schema files.
- Avoid unnecessary new dependencies; check existing utilities in `utils/`, `lib/`, and feature modules first.

## Repository structure

- `app/`: App Router routes and global layout/styles. Includes landing, collection, product detail, auth, account, cart, checkout, orders, about, and size-guide routes.
- `components/`: Shared site components, providers, theme support, animation/cursor helpers, icons, and reusable UI primitives.
- `features/`: Domain modules for `about`, `account`, `authentication`, `cart`, `landing`, `orders`, `products`, and `sizes`.
- `services/api/`: Shared Axios client, API base URL resolution, and API response extraction helpers.
- `utils/`: Shared helpers such as `cn`, currency formatting, and size code utilities.
- `types/`: Shared TypeScript types.
- `docs/`: Product/API documentation for the PRD, product catalog, authentication, account management, and cart.
- `public/`: Favicons, manifest, Houris logo, and product/editorial/hero media.
- `.github/`, `pages/`, `prisma/`, `tests/`, and `e2e/`: Not found in repo.

## Environment and configuration

- `.env.example` defines:

```bash
NEXT_PUBLIC_API_BASE_URL=https://api-staging.hourisdesigns.com
```

- `services/api/base-url.ts` requires `NEXT_PUBLIC_API_BASE_URL`; it throws (fails fast) if the variable is unset. There is no staging fallback.
- The shared Axios client uses `withCredentials: true`, a 15-second timeout, automatic refresh on 401 through `/api/auth/refresh`, and redirects to `/signin` when refresh fails unless skipped by request config.
- Authentication docs describe HTTP-only cookie-based access and refresh tokens. Do not expose token values to client-side code or store them in local storage.
- Do not commit secrets. Only `NEXT_PUBLIC_*` values are intended to be readable by browser code.

## Security and safety

- Be careful before changing authentication, authorization, refresh behavior, cookies, redirects, checkout, payment verification, account/profile updates, cart mutation, middleware, headers, CORS, or data-access logic.
- Preserve existing validation and transformation patterns around Zod schemas, adapters, repositories, services, and transformers.
- Keep server-only values out of client components. Remember that `NEXT_PUBLIC_*` variables are exposed to the browser.
- The cart, checkout, account, and auth flows depend on cookie credentials and backend result shapes documented in `docs/`; confirm contract changes against those docs before editing consumers.

## PR / change guidance

- Keep changes focused and minimal.
- Add or update tests when behavior changes, but note that no test setup currently exists in this repo.
- Update docs when commands, environment variables, public API contracts, routes, or user-facing behavior changes.
- Before finishing, summarize the files changed and list the checks run, such as `npm run lint`, `npm run typecheck`, or `npm run build`.
