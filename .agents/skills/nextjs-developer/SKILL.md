---
name: nextjs-developer
description: Develop or modify Next.js pages and React components in this project using strictly typed props and separated presentation logic.
---

# Next.js developer

- Before writing code, follow `AGENTS.md`, including the frontend rules it references, and read the relevant guide in the installed `node_modules/next/dist/docs/`.
- Type component props precisely, including callbacks, children, and framework-provided page props. Components without props need no argument or empty props type.
- Keep pages focused on data acquisition, composition, and rendering. Place business logic, transformations, and interaction handlers in appropriately named components, hooks, or utility modules.
- Render lists declaratively with `.map()` and stable keys. Use readable conditional rendering; separate complex presentation logic from markup.
- Apply the project rules to new and modified code without rewriting unrelated existing code.
