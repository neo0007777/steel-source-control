import React from "react";
import { Download, FileCheck, FileText, Printer } from "lucide-react";
import { useProcurement } from "@/store/procurement";

function formatINR(val: number) {
  return `₹${new Intl.NumberFormat("en-IN").format(val)}`;
}

export function PurchaseOrder() {
  const { selectedSupplier, downloadPo, purchased } = useProcurement();

  return (
    <div className="panel po-panel">
      <div className="po-label flex items-center justify-between">
        <span>ERP Document Specification</span>
        <span className="text-[9px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
          {purchased ? "EXECUTED" : "DRAFT READY"}
        </span>
      </div>

      <div className="po-top">
        <div className="po-icon">
          <FileText size={18} />
        </div>
        <div>
          <strong>PO-2026-00421</strong>
          <span>Generated Sep 22, 2026 · Ardent ERP v4.2</span>
        </div>
        <button
          type="button"
          className="icon-button"
          onClick={downloadPo}
          title="Download Purchase Order Text File"
          aria-label="Download PO"
        >
          <Download size={15} />
        </button>
      </div>

      <div className="po-rule" />

      <div className="po-fields">
        <div>
          <span>Contracted Supplier</span>
          <strong title={selectedSupplier.name}>{selectedSupplier.name}</strong>
        </div>
        <div>
          <span>Line Item Specification</span>
          <strong>IS 2062 E250 Plate · 10mm · 500 MT</strong>
        </div>
        <div>
          <span>Delivery Destination</span>
          <strong>Delhi Central Warehouse (Okhla Siding)</strong>
        </div>
        <div>
          <span>Net Landed Value</span>
          <strong className="text-blue-700 font-bold">
            {formatINR(selectedSupplier.landed)}
          </strong>
        </div>
      </div>

      <button
        type="button"
        className="secondary-button full"
        onClick={downloadPo}
      >
        <Download size={14} /> Download Official PO
      </button>
    </div>
  );
}
