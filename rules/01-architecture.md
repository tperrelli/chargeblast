# Architecture and organization

- Use the App Router and read the installed Next.js documentation referenced in `AGENTS.md` before writing code. Keep pages focused on obtaining data, composing the screen, and defining server/client boundaries.
- Prefer Server Components. Place `"use client"` at the smallest entry point that needs state, events, or browser APIs; do not turn an entire page into a Client Component for convenience.
- Organize code by domain: keep components, hooks, types, data, and functions used by one feature together. Put code in shared directories only when it is actually used by multiple features. Do not move files unnecessarily for localized changes.
- For a complex screen, use this structure as a reference. Split by responsibility without creating empty files or layers just to satisfy the layout:

```text
app/<route>/page.tsx                # route entry point and composition
features/<feature>/
  components/                       # feature-specific table, filters, and components
  hooks/                            # state and interaction coordination
  utils/                            # pure rules and transformations
  types.ts                          # domain contracts, when needed
components/                         # genuinely shared components
```

- Filtering, sorting, pagination, exporting, and business rules belong in pure functions or hooks, not markup. Separate data access, rules, and presentation. A composition component may coordinate simple props and events, but should not contain the entire feature.
- Each file should have a responsibility recognizable from its name. Avoid using `helpers`, `utils`, `common`, or `data` as generic dumping grounds; prefer names that describe the domain and operation. Avoid generic abstractions for a single case when a local function or component is clearer.
- Keep components at or below 120 lines after readable formatting; the main table must be under 100 lines. Split by responsibility before exceeding the limit. Never compress JSX, CSS, or functions to satisfy the line count, and do not create trivial components solely to reduce it.
- During a cleanup, preserve contracts and behavior; move one responsibility at a time, remove unused code, and run relevant checks after each structural change.
