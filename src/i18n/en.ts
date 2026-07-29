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
    billTo: "Bill to",
    issued: "Issued",
    due: "Due",
    subtotal: "Subtotal",
    tax: "Tax",
    total: "Total",
  },
};

export type Messages = typeof en;
