# Chargeblast project: Stripe payments screen

Implement the Stripe Dashboard **Transactions → Payments** screen in this repository, following the requirements below. Continue until the mandatory requirements are complete and the result has been validated.

## Before implementation

- Read `AGENTS.md` and the relevant documentation for the installed Next.js version in `node_modules/next/dist/docs/` before writing code. Respect the project's existing conventions and structure.
- Use the reference screenshot supplied with the challenge as the primary source for appearance. Reproduce text, icons, colors, typography, dimensions, spacing, and interaction states as closely as possible.
- If the screenshot is not available in the repository or conversation, report that limitation. Continue with the work that can be done without claiming visual correspondence to an unavailable reference.
- If test-mode access to the Stripe Dashboard is available, it may be used to inspect interactions and measurements; do not depend on creating an account to deliver the implementation.

## Mandatory scope

The payments table is the only mandatory visual element. Use Next.js with TypeScript, following the project's structure.

### Columns

- **Payment ID:** abbreviated identifier and an action to copy the full identifier.
- **Customer:** customer identification.
- **Amount:** amount formatted with its currency.
- **Status:** badge for `Succeeded`, `Pending`, `Failed`, or `Refunded`.
- **Payment method:** payment method; for cards, show the brand and last four digits.
- **Created:** date and time, with relative time in a tooltip on hover.

### Interactions and filters

- Allow sorting by date, amount, and status, using one or more columns.
- Implement pagination with 25, 50, and 100 rows per page; client-side processing is sufficient.
- Filter by period with `Today`, `7 days`, `30 days`, and `Custom`.
- Filter by status with multiple selection.
- Filter by payment method with multiple selection, including examples such as `Card`, `ACH`, and `Wallet`.
- Filter by amount range.
- Search by payment ID, email, or last four digits.
- Make filters work together with sorting and pagination, with a useful empty state when there are no results.

### Fictional data

- Create between 300 and 1,000 payments in a local JSON file or in-memory service.
- Use realistic values, multiple currencies, and a mix of statuses and payment methods.
- Keep data consistent across reloads to make interactions easier to evaluate.

## Optional extras

Implement these only after the mandatory requirements, in this order of preference:

1. Sidebar with `Payments`, `Customers`, `Balances`, and `Product catalog` sections.
2. Top bar with search and an account menu.
3. Payment details page on its own route, with an event timeline and metadata.
4. Saved filters or filters persisted in the URL for sharing links.
5. Column resizing and drag-and-drop reordering.
6. CSV export of the current view.

## Quality and delivery

- Prioritize visual fidelity and complete functionality for the mandatory requirements. Address accessibility, interaction states, and smaller screens.
- Run the checks appropriate to the project and fix any issues found.
- On completion, report what was implemented, how it was validated, and any limitations or outstanding extras.

## Challenge context

The stated deadline is the end of the day on **November 20, 2026**, Brasília time. The document also asks the candidate to reply to the receipt email; that is a separate action and must not be performed without an explicit instruction.
