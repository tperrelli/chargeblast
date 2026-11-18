# TypeScript and semantics

- Use strict TypeScript. Precisely type existing props, callbacks, children, and framework props according to the installed version. Components without props do not need an argument; do not use `Record<string, never>` or `void _props` for this purpose.
- Model the domain with specific types and known values. Avoid `any`, casts that silence errors, generic strings for closed sets, and ambiguous booleans when a discriminated type expresses variants better. Validate data crossing external boundaries.
- Keep statuses, currencies, options, and configuration in a typed source of truth when they represent the same set; derive types and options from it. Do not duplicate independent lists across components, mock data, and filters.
- Use names that explain meaning and units. Extract recurring or business-significant magic numbers into named constants; do not create a constant for every obvious value without a readability benefit.
- Explicitly define time zones, boundaries, and formatting for dates and amounts. Sample data must be deterministic and consistent across the list, details, filters, and export.
- Use semantic HTML, accessible labels, visible focus, and keyboard-operable controls. Links navigate; buttons perform actions. Preserve empty, loading, and error states where applicable.
