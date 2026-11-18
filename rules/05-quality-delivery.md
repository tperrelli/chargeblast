# Readability, validation, and delivery

- Format changed files consistently before evaluating line limits. Use a project-configured formatter for TS, TSX, CSS, and JSON; if none exists, configure one as part of the cleanup before applying the standard at scale. Pin the formatter version and document a check command.
- Aim for lines of at most 100 characters; wrap imports, signatures, objects, conditions, and props when needed. Do not split strings, URLs, SVGs, or other content where doing so would hurt readability merely to satisfy a metric. Avoid multiple declarations or JSX blocks on one line.
- Before delivery, review the formatted diff for mixed responsibilities, duplication, scattered dependencies, vague names, weak typing, redundant CSS cascades, and inaccessible controls. A short file is not proof of good structure.
- Test behavior that could regress: combinations of filtering, sorting, and pagination; empty states; selection; export; navigation; and keyboard interactions when affected. Prefer behavioral tests to tests that merely mirror the implementation.
- Run lint, tests, and a build appropriate to the scope; run the format checker when configured. Do not claim interactions or visual fidelity were validated merely because a build or pure-function tests passed. Report failures and unavailable checks accurately.
- Limit changes to the requested objective, preserve existing files and changes, and do not delete code or assets without checking their use. Do not rewrite unrelated areas solely to satisfy an aesthetic rule.
