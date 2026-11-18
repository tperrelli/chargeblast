<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project overview

- Next.js App Router application using TypeScript, React, and Tailwind CSS.
- `app/page.tsx` is the home page; `app/layout.tsx` defines the root layout and fonts; `app/globals.css` contains global styles.
- Static assets live in `public/`. The `@/*` import alias points to the repository root.
- `next.config.ts` enables Cache Components and partial prefetching, and configures the Tailwind Turbopack loader.

## Frontend project rules

Read and apply the frontend rules in `rules/01-architecture.md`, `rules/02-react-patterns.md`, `rules/03-typescript-ui.md`, `rules/04-visual-system.md`, and `rules/05-quality-delivery.md`. Apply them to new and modified code, or to the requested scope of a cleanup. Format code readably before evaluating component line limits.

## Commands

- `npm run dev` starts the development server.
- `npm run build` creates a production build; `npm run start` serves it.
- `npm run lint` runs ESLint.
- `npm test` runs the payment logic tests.
