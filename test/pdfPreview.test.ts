import { test } from "node:test";
import assert from "node:assert/strict";
import { en } from "../src/i18n/en.ts";
import { renderPdfPreview, type PreviewInvoice } from "../src/pdfPreview.ts";

const invoice: PreviewInvoice = {
  number: "INV-1042",
  sender: { name: "Northlight Analytics GmbH", address: ["Torstraße 140", "10119 Berlin"], taxId: "DE314159265" },
  customer: { name: "Birch & Pine Studio", address: ["Hafenstraße 12", "20457 Hamburg"] },
  issuedAt: new Date("2026-09-16T00:00:00Z"),
  dueAt: new Date("2026-09-30T00:00:00Z"),
  currency: "EUR",
  lines: [{ description: "Design retainer", quantity: 1, unitPriceCents: 250000, taxRate: 0.19, amountCents: 250000 }],
  subtotalCents: 250000,
  taxCents: 47500,
  totalCents: 297500,
  payment: { iban: "DE89 3704 0044 0532 0130 00", bic: "COBADEFFXXX", reference: "INV-1042" },
};

test("renders totals in the invoice currency", () => {
  const html = renderPdfPreview(invoice, en);
  assert.match(html, /€2,975\.00/);
});

test("renders both parties with escaped names", () => {
  const html = renderPdfPreview(invoice, en);
  assert.match(html, /Birch &amp; Pine Studio/);
  assert.match(html, /Tax ID DE314159265/);
  assert.match(html, /Hafenstraße 12<br>20457 Hamburg/);
});

test("shows VAT rate per line", () => {
  assert.match(renderPdfPreview(invoice, en), /<td class="num">19%<\/td>/);
});

test("includes payment details when present", () => {
  assert.match(renderPdfPreview(invoice, en), /COBADEFFXXX/);
  assert.doesNotMatch(renderPdfPreview({ ...invoice, payment: undefined }, en), /pdf-payment/);
});

// TODO: snapshot test against the generated PDF once the renderer lands.
