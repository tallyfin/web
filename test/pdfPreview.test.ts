import { test } from "node:test";
import assert from "node:assert/strict";
import { en } from "../src/i18n/en.ts";
import { renderPdfPreview } from "../src/pdfPreview.ts";

test("renders totals in the invoice currency", () => {
  const html = renderPdfPreview(
    {
      number: "INV-1042",
      customerName: "Birch & Pine Studio",
      customerAddress: ["Hafenstraße 12", "20457 Hamburg"],
      issuedAt: new Date("2026-09-16T00:00:00Z"),
      dueAt: new Date("2026-09-30T00:00:00Z"),
      currency: "EUR",
      lines: [{ description: "Design retainer", quantity: 1, amountCents: 250000 }],
      subtotalCents: 250000,
      taxCents: 47500,
      totalCents: 297500,
    },
    en,
  );
  assert.match(html, /€2,975\.00/);
  assert.match(html, /Hafenstraße 12<br>20457 Hamburg/);
});
