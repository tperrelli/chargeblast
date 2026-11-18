import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { cleanup, fireEvent, render, waitFor, within } from "@testing-library/react";
import { payments } from "../features/payments/mock-payments";
import { PaymentsView } from "../features/payments/components/payments-view";

const INITIAL_TIMESTAMP = Date.UTC(2026, 10, 18, 18);
const SAMPLE_PAYMENTS = payments.slice(0, 40);

afterEach(() => cleanup());

test("combines filters and clears selection when filters change", () => {
  const { getByRole, queryByText, getAllByRole } = render(
    <PaymentsView payments={SAMPLE_PAYMENTS} initialTimestamp={INITIAL_TIMESTAMP} />,
  );
  fireEvent.click(getByRole("checkbox", { name: "Select all payments on this page" }));
  assert.ok(queryByText("25 selected"));

  fireEvent.click(getByRole("button", { name: "Status" }));
  const statusPanel = getByRole("group", { name: "Status" });
  fireEvent.click(within(statusPanel).getByRole("checkbox", { name: /Succeeded/ }));
  assert.equal(queryByText("25 selected"), null);
  fireEvent.click(getByRole("button", { name: "Payment method" }));
  const methodPanel = getByRole("group", { name: "Payment method" });
  fireEvent.click(within(methodPanel).getByRole("checkbox", { name: "Card" }));

  const matching = SAMPLE_PAYMENTS.filter(
    (item) => item.status === "Succeeded" && item.method === "Card",
  );
  assert.equal(getAllByRole("row").length - 1, matching.length);
  assert.ok(getByRole("button", { name: /Status \(1\)/ }));
  assert.ok(getByRole("button", { name: /Payment method \(1\)/ }));
  fireEvent.click(getByRole("button", { name: "Clear filters" }));
  assert.equal(getAllByRole("row").length - 1, 25);
});

test("menus support focus, escape and clicking outside", () => {
  const { getByRole, queryByRole } = render(
    <PaymentsView payments={SAMPLE_PAYMENTS} initialTimestamp={INITIAL_TIMESTAMP} />,
  );
  const trigger = getByRole("button", { name: "Status" });
  fireEvent.click(trigger);
  const panel = getByRole("group", { name: "Status" });
  assert.equal(document.activeElement, within(panel).getByRole("checkbox", { name: /Succeeded/ }));
  fireEvent.keyDown(document, { key: "Escape" });
  assert.equal(queryByRole("group", { name: "Status" }), null);
  assert.equal(document.activeElement, trigger);

  fireEvent.click(trigger);
  fireEvent.pointerDown(document.body);
  assert.equal(queryByRole("group", { name: "Status" }), null);
});

test("keeps selection across pages and toggles optional columns", () => {
  const { getByRole, queryByRole, getByText } = render(
    <PaymentsView payments={SAMPLE_PAYMENTS} initialTimestamp={INITIAL_TIMESTAMP} />,
  );
  fireEvent.click(getByRole("checkbox", { name: "Select all payments on this page" }));
  fireEvent.click(getByRole("button", { name: "Next page" }));
  assert.ok(getByText("25 selected"));
  assert.equal(
    (getByRole("checkbox", { name: "Select all payments on this page" }) as HTMLInputElement)
      .checked,
    false,
  );
  fireEvent.click(getByRole("checkbox", { name: "Select all payments on this page" }));
  assert.ok(getByText("40 selected"));

  fireEvent.click(getByRole("button", { name: "Edit columns" }));
  const panel = getByRole("group", { name: "Edit columns" });
  fireEvent.click(within(panel).getByRole("checkbox", { name: "Description" }));
  assert.equal(queryByRole("columnheader", { name: "Description" }), null);
  fireEvent.click(within(panel).getByRole("checkbox", { name: "Description" }));
  assert.ok(getByRole("columnheader", { name: "Description" }));
});

test("row actions expose the detail route and restore focus after escape", () => {
  const { getByRole, getAllByRole, queryByRole } = render(
    <PaymentsView payments={SAMPLE_PAYMENTS} initialTimestamp={INITIAL_TIMESTAMP} />,
  );
  const trigger = getAllByRole("button", { name: /Actions for payment/ })[0];
  const id = trigger.getAttribute("aria-label")?.replace("Actions for payment ", "");
  fireEvent.click(trigger);
  const panel = getByRole("group", { name: "Payment actions" });
  const detailLink = within(panel).getByRole("link", { name: "View payment" });
  assert.equal(detailLink.getAttribute("href"), `/payments/${id}`);
  assert.equal(document.activeElement, detailLink);
  fireEvent.keyDown(document, { key: "Escape" });
  assert.equal(queryByRole("group", { name: "Payment actions" }), null);
  assert.equal(document.activeElement, trigger);
});

test("copies the same full ID from the row and its action menu", async () => {
  const copied: string[] = [];
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: {
      writeText: async (value: string) => {
        copied.push(value);
      },
    },
  });
  const { getAllByRole, getByRole } = render(
    <PaymentsView payments={SAMPLE_PAYMENTS} initialTimestamp={INITIAL_TIMESTAMP} />,
  );
  const copyButton = getAllByRole("button", { name: /Copy payment ID pi_/ })[0];
  const id = copyButton.getAttribute("aria-label")?.replace("Copy payment ID ", "");
  fireEvent.click(copyButton);
  await waitFor(() => assert.equal(copied[0], id));
  fireEvent.click(getByRole("button", { name: `Actions for payment ${id}` }));
  fireEvent.click(
    within(getByRole("group", { name: "Payment actions" })).getByRole("button", {
      name: "Copy payment ID",
    }),
  );
  await waitFor(() => assert.deepEqual(copied, [id, id]));
});

test("exports selected payments instead of the whole filtered list", async () => {
  const originalCreate = URL.createObjectURL;
  const originalRevoke = URL.revokeObjectURL;
  const originalClick = window.HTMLAnchorElement.prototype.click;
  let exported: Blob | undefined;
  let filename = "";
  URL.createObjectURL = (blob) => {
    exported = blob as Blob;
    return "blob:test";
  };
  URL.revokeObjectURL = () => {};
  window.HTMLAnchorElement.prototype.click = function () {
    filename = this.download;
  };
  try {
    const { getAllByRole, getByRole } = render(
      <PaymentsView payments={SAMPLE_PAYMENTS} initialTimestamp={INITIAL_TIMESTAMP} />,
    );
    const checkbox = getAllByRole("checkbox", { name: /Select payment pi_/ })[0];
    const id = checkbox.getAttribute("aria-label")?.replace("Select payment ", "");
    fireEvent.click(checkbox);
    fireEvent.click(getByRole("button", { name: "Export" }));
    assert.equal(filename, "payments.csv");
    assert.ok(exported);
    const csv = await exported.text();
    assert.equal(csv.split("\r\n").length, 2);
    assert.ok(csv.includes(id ?? "not-an-id"));
  } finally {
    URL.createObjectURL = originalCreate;
    URL.revokeObjectURL = originalRevoke;
    window.HTMLAnchorElement.prototype.click = originalClick;
  }
});
