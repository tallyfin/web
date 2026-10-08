import { formatAmount, formatDate } from "./format.ts";
import { escape } from "./html.ts";
import type { Messages } from "./i18n/en.ts";

export interface PreviewParty {
  name: string;
  address: string[];
  taxId?: string;
}

export interface PreviewLine {
  description: string;
  quantity: number;
  unitPriceCents: number;
  taxRate: number;
  amountCents: number;
}

export interface PreviewPayment {
  iban: string;
  bic: string;
  reference: string;
}

export interface PreviewInvoice {
  number: string;
  sender: PreviewParty & { logoUrl?: string };
  customer: PreviewParty;
  issuedAt: Date;
  dueAt: Date;
  currency: string;
  lines: PreviewLine[];
  subtotalCents: number;
  taxCents: number;
  totalCents: number;
  payment?: PreviewPayment;
  notes?: string;
}

function lines(values: string[]): string {
  return values.map(escape).join("<br>");
}

function party(label: string, value: PreviewParty, taxIdLabel: string): string {
  const taxId = value.taxId ? `<p class="tax-id">${taxIdLabel} ${escape(value.taxId)}</p>` : "";
  return `<section class="party">
    <h2>${label}</h2>
    <p class="party-name">${escape(value.name)}</p>
    <p>${lines(value.address)}</p>
    ${taxId}
  </section>`;
}

function header(invoice: PreviewInvoice, messages: Messages): string {
  const t = messages.preview;
  const logo = invoice.sender.logoUrl
    ? `<img class="logo" src="${escape(invoice.sender.logoUrl)}" alt="${escape(invoice.sender.name)}">`
    : `<p class="logo-text">${escape(invoice.sender.name)}</p>`;
  return `<header class="pdf-header">
    <div class="brand">${logo}</div>
    <div class="title">
      <h1>${t.invoice}</h1>
      <p class="number">${escape(invoice.number)}</p>
    </div>
  </header>`;
}

function details(invoice: PreviewInvoice, messages: Messages): string {
  const t = messages.preview;
  return `<div class="pdf-details">
    ${party(t.from, invoice.sender, t.taxId)}
    ${party(t.billTo, invoice.customer, t.taxId)}
    <dl class="dates">
      <dt>${t.issued}</dt><dd>${formatDate(invoice.issuedAt)}</dd>
      <dt>${t.due}</dt><dd>${formatDate(invoice.dueAt)}</dd>
    </dl>
  </div>`;
}

function lineItems(invoice: PreviewInvoice, messages: Messages): string {
  const t = messages.preview;
  const money = (cents: number) => formatAmount(cents, invoice.currency);
  const rows = invoice.lines
    .map((line) => `<tr>
      <td class="description">${escape(line.description)}</td>
      <td class="num">${line.quantity}</td>
      <td class="num">${money(line.unitPriceCents)}</td>
      <td class="num">${Math.round(line.taxRate * 100)}%</td>
      <td class="num">${money(line.amountCents)}</td>
    </tr>`)
    .join("");
  return `<table class="pdf-lines">
    <thead><tr>
      <th>${t.description}</th>
      <th class="num">${t.quantity}</th>
      <th class="num">${t.unitPrice}</th>
      <th class="num">${t.taxRate}</th>
      <th class="num">${t.amount}</th>
    </tr></thead>
    <tbody>${rows}</tbody>
  </table>`;
}

function totals(invoice: PreviewInvoice, messages: Messages): string {
  const t = messages.preview;
  const money = (cents: number) => formatAmount(cents, invoice.currency);
  return `<dl class="pdf-totals">
    <dt>${t.subtotal}</dt><dd>${money(invoice.subtotalCents)}</dd>
    <dt>${t.tax}</dt><dd>${money(invoice.taxCents)}</dd>
    <dt class="grand">${t.total}</dt><dd class="grand">${money(invoice.totalCents)}</dd>
  </dl>`;
}

function payment(invoice: PreviewInvoice, messages: Messages): string {
  if (!invoice.payment) return "";
  const t = messages.preview;
  const { iban, bic, reference } = invoice.payment;
  return `<section class="pdf-payment">
    <h2>${t.payment}</h2>
    <dl>
      <dt>IBAN</dt><dd>${escape(iban)}</dd>
      <dt>BIC</dt><dd>${escape(bic)}</dd>
      <dt>${t.reference}</dt><dd>${escape(reference)}</dd>
    </dl>
  </section>`;
}

function footer(invoice: PreviewInvoice, messages: Messages): string {
  const t = messages.preview;
  const notes = invoice.notes ? `<p class="notes">${escape(invoice.notes)}</p>` : "";
  return `<footer class="pdf-footer">
    <p>${t.paymentTerms.replace("{date}", formatDate(invoice.dueAt))}</p>
    ${notes}
  </footer>`;
}

export function renderPdfPreview(invoice: PreviewInvoice, messages: Messages): string {
  return `<article class="pdf-preview">
  ${header(invoice, messages)}
  ${details(invoice, messages)}
  ${lineItems(invoice, messages)}
  ${totals(invoice, messages)}
  ${payment(invoice, messages)}
  ${footer(invoice, messages)}
</article>`;
}
