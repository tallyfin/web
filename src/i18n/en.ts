export const en = {
  invoices: {
    title: "Invoices",
    newInvoice: "New invoice",
    empty: "No invoices",
    emptyFiltered: "No results",
    columns: {
      number: "Number",
      customer: "Customer",
      amount: "Amount",
      due: "Due",
      status: "Status",
    },
  },
  status: {
    draft: "Draft",
    open: "Open",
    paid: "Paid",
    void: "Void",
  },
  preview: {
    invoice: "Invoice",
    from: "From",
    billTo: "Bill to",
    taxId: "Tax ID",
    issued: "Issued",
    due: "Due",
    description: "Description",
    quantity: "Qty",
    unitPrice: "Unit price",
    taxRate: "VAT",
    amount: "Amount",
    subtotal: "Subtotal",
    tax: "Tax",
    total: "Total due",
    payment: "Payment details",
    reference: "Reference",
    paymentTerms: "Please pay by {date}, quoting the reference above.",
  },
};

export type Messages = typeof en;
