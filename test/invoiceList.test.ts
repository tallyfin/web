import { test } from "node:test";
import assert from "node:assert/strict";
import { en } from "../src/i18n/en.ts";
import { renderInvoiceList } from "../src/invoiceList.ts";
import type { InvoiceSummary } from "../src/types.ts";

const invoice: InvoiceSummary = {
  id: "inv_1",
  number: "INV-1042",
  customerName: "Birch & Pine Studio",
  totalCents: 304636,
  currency: "EUR",
  dueAt: new Date("2026-09-30T00:00:00Z"),
  status: "open",
};

test("renders one row per invoice", () => {
  const html = renderInvoiceList([invoice, { ...invoice, id: "inv_2", number: "INV-1043" }], en);
  assert.equal(html.match(/<tr data-invoice=/g)?.length, 2);
});

test("escapes customer names", () => {
  assert.match(renderInvoiceList([invoice], en), /Birch &amp; Pine Studio/);
});

test("shows the status badge", () => {
  assert.match(renderInvoiceList([invoice], en), /badge-open">Open</);
});

test("shows the empty state", () => {
  assert.match(renderInvoiceList([], en), /class="empty">No invoices</);
});
