export type InvoiceStatus = "draft" | "open" | "paid" | "void";

export interface InvoiceSummary {
  id: string;
  number: string;
  customerName: string;
  totalCents: number;
  currency: string;
  dueAt: Date;
  status: InvoiceStatus;
}
