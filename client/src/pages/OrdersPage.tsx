import React from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Download,
  FileCheck,
  FileText,
  Printer,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useProcurement } from "@/store/procurement";
import { StatusBadge } from "@/components/procurement/StatusBadge";

function formatINR(val: number) {
  return `₹${new Intl.NumberFormat("en-IN").format(val)}`;
}

export function OrdersPage() {
  const {
    selectedSupplier,
    purchased,
    received,
    shipmentStageName,
    downloadPo,
    setActiveNav,
  } = useProcurement();

  return (
    <div className="page-content">
      <div className="page-intro">
        <div>
          <div className="eyebrow accent-eyebrow">
            <span /> Enterprise Purchase Order Registry
          </div>
          <h1>
            Purchase Orders<span className="period">.</span>
          </h1>
          <p>
            Track legal commitments, contract lines, and MTC 3.1 certifications.
          </p>
        </div>

        <div className="intro-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={downloadPo}
          >
            <Download size={14} /> Download Active PO
          </button>
        </div>
      </div>

      {/* Main Order Card */}
      <div className="panel p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-blue-50 text-blue-700 rounded-lg">
                <FileText size={22} />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-900 font-mono">
                    PO-2026-00421
                  </h2>
                  <StatusBadge
                    tone={
                      received
                        ? "green"
                        : purchased
                        ? "blue"
                        : "amber"
                    }
                  >
                    {received
                      ? "Completed & Inwarded"
                      : purchased
                      ? "Executed · Transmitted"
                      : "Draft Ready for Authorization"}
                  </StatusBadge>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Contract Reference: CONT-STL-2026-99 · Issued Sep 22, 2026
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!purchased && (
              <button
                type="button"
                className="primary-button"
                onClick={() => setActiveNav("AI Procurement")}
              >
                <span>Authorize in AI Procurement</span>
                <ArrowUpRight size={14} />
              </button>
            )}
            <button
              type="button"
              className="secondary-button"
              onClick={downloadPo}
            >
              <Download size={14} /> Download Official Copy
            </button>
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-b border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block font-mono uppercase text-[10px]">
              Contracted Supplier
            </span>
            <strong className="text-slate-800 text-sm font-semibold block mt-1">
              {selectedSupplier.name}
            </strong>
            <span className="text-slate-500 text-[11px] block mt-0.5">
              {selectedSupplier.location}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block font-mono uppercase text-[10px]">
              Total Committed Value
            </span>
            <strong className="text-blue-700 text-sm font-bold font-mono block mt-1">
              {formatINR(selectedSupplier.landed)}
            </strong>
            <span className="text-slate-500 text-[11px] block mt-0.5">
              Incl. rail freight & GST
            </span>
          </div>

          <div>
            <span className="text-slate-400 block font-mono uppercase text-[10px]">
              Delivery Destination
            </span>
            <strong className="text-slate-800 text-sm font-semibold block mt-1">
              Delhi Central Warehouse
            </strong>
            <span className="text-slate-500 text-[11px] block mt-0.5">
              Plot 14-16, Okhla Ph-1 Siding
            </span>
          </div>

          <div>
            <span className="text-slate-400 block font-mono uppercase text-[10px]">
              Lifecycle Status
            </span>
            <strong className="text-slate-800 text-sm font-semibold block mt-1">
              {received ? "Material Received (GRN-2026-00187)" : purchased ? shipmentStageName : "Awaiting Authorization"}
            </strong>
            <span className="text-slate-500 text-[11px] block mt-0.5">
              SLA Window: {selectedSupplier.eta}
            </span>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="pt-6">
          <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">
            PO Line Items
          </h4>
          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase font-mono text-[10px]">
                <tr>
                  <th className="p-3">Item #</th>
                  <th className="p-3">Description & Grade</th>
                  <th className="p-3">Dimensions</th>
                  <th className="p-3 text-right">Quantity</th>
                  <th className="p-3 text-right">Rate / MT</th>
                  <th className="p-3 text-right">Total (Ex-Works)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3 font-mono">001</td>
                  <td className="p-3">
                    <strong className="text-slate-800 block">
                      IS 2062:2011 Grade E250 Steel Plate
                    </strong>
                    <span className="text-slate-400 text-[10px]">
                      Fe410W Structural Quality, MTC 3.1, BIS Marked
                    </span>
                  </td>
                  <td className="p-3 font-mono">10 mm × 2000 mm × 6000 mm</td>
                  <td className="p-3 text-right font-mono font-semibold">500 MT</td>
                  <td className="p-3 text-right font-mono">
                    {formatINR(selectedSupplier.price)}
                  </td>
                  <td className="p-3 text-right font-mono font-bold text-slate-900">
                    {formatINR(selectedSupplier.price * 500)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
