# Chargeblast — Payments

An implementation of the **Transactions → Payments** screen, inspired by the Stripe Dashboard and the [visual reference](stripe-mockup.png) supplied for the challenge. The application lets users explore payments, combine filters, and view transaction details.

All data is fictional and local. There is no Stripe API integration, authentication, database, or payment processing.

## Getting started

**Requirements:** Node.js 20.9 or later and npm. No environment variables or credentials are required.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If the port is occupied, Next.js reports the port it uses in the terminal.

To run a production build:

```bash
npm run build
npm run start
```

The production start command uses port **8989**: [http://localhost:8989](http://localhost:8989).

## Features

- **Payments table:** amount and currency, status, payment method, description, customer, creation date, refund date, decline reason, and ID. Scroll horizontally to reach the ID when needed.
- **Search:** use **More filters** to search by full or partial payment ID, email address, or last four digits.
- **Combinable filters:** date range (`Today`, `7 days`, `30 days`, or `Custom`), multiple statuses, methods, and currencies, plus minimum and maximum amounts. **Clear filters** restores the initial view.
- **Sorting:** click **Amount** or **Date**; status sorting is available in the **Status** filter. Multiple criteria can be combined in priority order. Each activation cycles through ascending, descending, and no sort.
- **Pagination:** 25, 50, or 100 rows per page. Filtering and sorting happen before pagination.
- **Details:** open the ID or the row action menu to visit `/payments/[id]`. The page shows payment details, customer information, and activity. Unknown IDs show a payment-not-found page.
- **Selection and CSV:** select individual rows or an entire page. **Export** downloads selected payments; if none are selected, it exports all filtered results across pages.
- **Columns:** **Edit columns** shows or hides description, customer, refund date, and decline reason. Essential columns remain available.

The interface also provides an empty state, ID copying, relative time on dates, keyboard navigation, and menu dismissal with `Escape` or an outside click.

## Data and decisions

The dataset contains **420 deterministic payments**, generated in memory with a fixed seed. IDs and values remain consistent across restarts. It includes `Card`, `ACH`, and `Wallet` payments, five currencies, and the statuses `Succeeded`, `Pending`, `Failed`, `Refunded`, `Canceled`, and `Blocked`.

Sample dates range from **September 9 to November 18, 2026**. Relative filters such as `Today` may therefore return no results when the application is reviewed on another date. To try a range with results, select **Custom** and choose dates within that period.

- Dates, period boundaries, and displayed times use **UTC**. Relative time uses the server-provided reference time from the page load.
- Amounts in different currencies are filtered and sorted by their numeric value in the original currency, **without currency conversion**.
- CSV export contains a fixed set of fields regardless of visible columns. Values beginning with formula characters are prefixed to reduce spreadsheet formula-injection risk.
- Filters, sorting, selection, and columns are stored in client memory; they do not persist in the URL or across reloads.

## Architecture

The application uses **Next.js 16, App Router, React 19, and TypeScript**. Routes and the static shell are Server Components; the interactive table is a Client Component. With Cache Components enabled, the initial timestamp is obtained per request and passed to the client to keep filtering and hydration consistent.

```text
app/                         Routes, layout, and global styles
components/                  Shared shell and icons
features/payments/
  components/                Table, filters, actions, and details
  hooks/                     State and interactive behavior
  utils/                     Filtering, sorting, pagination, formatting, and CSV
  types.ts                   Domain types and options
  mock-payments.ts           Fictional data generation and lookup
  payments.css               Feature styles
lib/request-time.ts          Per-request reference time
tests/                       Logic and interface tests
rules/                       Architecture, code, and design conventions
```

Filtering, sorting, and pagination run on the client, which is appropriate for the challenge's limited dataset. With real data and larger volumes, these operations should move to the server with appropriate pagination and authorization.

## Verification

```bash
npm run format:check   # Prettier formatting check
npm run lint           # ESLint
npm test               # Logic and interface tests
npm run build          # Production build
```

In this environment, the default Turbopack build was blocked by a restriction on opening a local port; `npx next build --webpack` completed successfully.

Run `npm run format` to apply formatting. Tests cover combined filters, dates, sorting, pagination, selection, copying, CSV export, and menu interactions. Interface tests use JSDOM; they **do not replace** visual and functional inspection in a real browser.

## Limitations

- The top bar and other navigation sections are illustrative; global search, account management, and other dashboard areas are not implemented.
- The activity shown on the details page is derived from fictional data and does not represent a real Stripe event history.
- Shareable URL filters, drag-and-drop column reordering, and column resizing are not implemented.
- A side-by-side visual comparison in a browser was not completed in this environment. The supplied image is a reference for the table, not a screenshot of this implementation.
