# Visual system and reference

- When a reference is available, treat it as a specification: check order, content, hierarchy, dimensions, spacing, typography, colors, borders, states, and responsive behavior. Document any differences required by conflicting functional requirements.
- Visually inspect the rendered implementation in a browser at the reference viewport and on smaller screens. Compare it with the image, adjust noticeable differences, and check hover, focus, menus, selection, and empty states. If inspection is not possible, report the limitation; do not claim visual fidelity was validated.
- Centralize reused colors, spacing, typography, radii, and dimensions in named tokens derived from the design. Preserve reference-specific measurements when necessary; do not impose a scale that changes the visual result.
- Keep feature styles close to the feature and limit global styles to the base, tokens, and shared primitives. Avoid broad global selectors for components, fragile `nth-child` dependencies, and multiple files overriding the same selector unnecessarily.
- Format CSS with one declaration per line and readable blocks. Remove obsolete, duplicate, or overridden rules in the same change; do not accumulate fixes at the end of a file. Preserve accessible states and scrolling on smaller screens.
- Do not present decorative controls as functional: provide real actions or clearly indicate unavailability. Preserve reference content and names without inventing data presented as fact.
