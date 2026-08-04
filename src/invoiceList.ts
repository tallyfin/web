import { formatAmount, formatDate } from "./format.ts";
import { escape } from "./html.ts";
import type { Messages } from "./i18n/en.ts";
import type { InvoiceSummary } from "./types.ts";

function statusBadge(invoice: InvoiceSummary, messages: Messages): string {
  return `<span class="badge badge-${invoice.status}">${messages.status[invoice.status]}</span>`;
}

function row(invoice: InvoiceSummary, messages: Messages): string {
  return [
    `<tr data-invoice="${escape(invoice.id)}">`,
    `<td>${escape(invoice.number)}</td>`,
    `<td>${escape(invoice.customerName)}</td>`,
    `<td class="num">${formatAmount(invoice.totalCents, invoice.currency)}</td>`,
    `<td>${formatDate(invoice.dueAt)}</td>`,
    `<td>${statusBadge(invoice, messages)}</td>`,
    `</tr>`,
  ].join("");
}

export function renderInvoiceList(invoices: InvoiceSummary[], messages: Messages): string {
  if (invoices.length === 0) {
    return `<p class="empty">${messages.invoices.empty}</p>`;
  }
  const { columns } = messages.invoices;
  const head = [columns.number, columns.customer, columns.amount, columns.due, columns.status]
    .map((label) => `<th>${label}</th>`)
    .join("");
  return `<table class="invoices"><thead><tr>${head}</tr></thead><tbody>${invoices
    .map((invoice) => row(invoice, messages))
    .join("")}</tbody></table>`;
}
