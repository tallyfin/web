import { formatAmount, formatDate } from "./format.ts";
import { escape } from "./html.ts";
import type { Messages } from "./i18n/en.ts";

export interface PreviewInvoice {
  number: string;
  customerName: string;
  customerAddress: string[];
  issuedAt: Date;
  dueAt: Date;
  currency: string;
  lines: { description: string; quantity: number; amountCents: number }[];
  subtotalCents: number;
  taxCents: number;
  totalCents: number;
}

export function renderPdfPreview(invoice: PreviewInvoice, messages: Messages): string {
  const t = messages.preview;
  const money = (cents: number) => formatAmount(cents, invoice.currency);
  const lines = invoice.lines
    .map((line) => `<tr><td>${escape(line.description)}</td><td>${line.quantity}</td><td>${money(line.amountCents)}</td></tr>`)
    .join("");
  return `<article class="pdf-preview">
  <h1>${escape(invoice.number)}</h1>
  <section><h2>${t.billTo}</h2><p>${[invoice.customerName, ...invoice.customerAddress].map(escape).join("<br>")}</p></section>
  <dl><dt>${t.issued}</dt><dd>${formatDate(invoice.issuedAt)}</dd><dt>${t.due}</dt><dd>${formatDate(invoice.dueAt)}</dd></dl>
  <table>${lines}</table>
  <dl class="totals"><dt>${t.subtotal}</dt><dd>${money(invoice.subtotalCents)}</dd><dt>${t.tax}</dt><dd>${money(invoice.taxCents)}</dd><dt>${t.total}</dt><dd>${money(invoice.totalCents)}</dd></dl>
</article>`;
}
