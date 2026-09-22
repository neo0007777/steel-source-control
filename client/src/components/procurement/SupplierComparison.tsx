import React from "react";
import { Check, CheckCircle2, Info, Sparkles, X } from "lucide-react";
import { useProcurement } from "@/store/procurement";
import { StatusBadge } from "./StatusBadge";

function formatINR(val: number) {
  return `₹${new Intl.NumberFormat("en-IN").format(val)}`;
}

export function SupplierComparison() {
  const {
    suppliers,
    selectedSupplierId,
    selectSupplier,
    comparisonOpen,
    setComparisonOpen,
  } = useProcurement();

  if (!comparisonOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={() => setComparisonOpen(false)}
    >
      <div
        className="bg-white rounded-t-2xl sm:rounded-xl shadow-2xl w-full max-w-5xl max-h-[88vh] flex flex-col border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer-header p-5 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div>
            <div className="eyebrow flex items-center gap-1.5 text-blue-600">
              <Sparkles size={13} />
              <span>Multi-Criteria Sourcing Evaluation</span>
            </div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight mt-1">
              Supplier Quotation & Capacity Matrix
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Normalized for 500 MT of IS 2062 E250 plates with freight to Delhi Central Warehouse siding.
            </p>
          </div>
          <button
            className="icon-button"
            onClick={() => setComparisonOpen(false)}
            aria-label="Close comparison drawer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="table-wrap flex-1 overflow-auto p-5">
          <table className="w-full border-collapse min-w-[760px]">
            <thead>
              <tr className="border-b border-slate-200 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider bg-slate-50">
                <th className="p-3">Supplier & Origin</th>
                <th className="p-3 text-right">Base / MT</th>
                <th className="p-3 text-right">Landed Cost</th>
                <th className="p-3">Available</th>
                <th className="p-3">Delivery ETA</th>
                <th className="p-3">Reliability</th>
                <th className="p-3">Assessment</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {suppliers.map((s) => {
                const isSelected = s.id === selectedSupplierId;
                return (
                  <tr
                    key={s.id}
                    className={`transition-colors ${
                      isSelected
                        ? "bg-blue-50/60 font-medium"
                        : s.recommended
                        ? "bg-slate-50/70"
                        : "hover:bg-slate-50/40"
                    }`}
                  >
                    <td className="p-3">
                      <div className="table-supplier flex items-center gap-2.5">
                        <span
                          className="mini-logo text-white font-bold"
                          style={{ background: s.accent }}
                        >
                          {s.short}
                        </span>
                        <div>
                          <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                            {s.name}
                            {s.recommended && (
                              <span className="text-[9px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-mono font-medium">
                                AI Top Pick
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-500">{s.location}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-3 text-right font-mono font-semibold text-slate-700">
                      {formatINR(s.price)}
                    </td>

                    <td className="p-3 text-right font-mono font-bold text-slate-900">
                      {formatINR(s.landed)}
                    </td>

                    <td className="p-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] ${
                          s.availableMt >= 500
                            ? "bg-emerald-50 text-emerald-700 font-semibold"
                            : "bg-amber-50 text-amber-700 font-medium"
                        }`}
                      >
                        {s.quantity}
                      </span>
                    </td>

                    <td className="p-3">
                      <span
                        className={`font-medium ${
                          s.etaDays <= 11
                            ? "text-emerald-700"
                            : s.etaDays <= 15
                            ? "text-blue-700"
                            : "text-rose-600 font-semibold"
                        }`}
                      >
                        {s.eta}
                      </span>
                    </td>

                    <td className="p-3">
                      <span className={s.onTime === "96%" ? "reliability high" : "reliability"}>
                        {s.onTime}
                      </span>
                    </td>

                    <td className="p-3 max-w-[210px]">
                      <p className="text-[11px] text-slate-600 leading-snug line-clamp-2">
                        {s.note}
                      </p>
                    </td>

                    <td className="p-3 text-center">
                      <button
                        type="button"
                        className={
                          isSelected
                            ? "selected-table-button"
                            : "table-button hover:border-blue-400 hover:text-blue-600"
                        }
                        onClick={() => selectSupplier(s.id)}
                      >
                        {isSelected ? (
                          <span className="flex items-center gap-1">
                            <Check size={12} /> Selected
                          </span>
                        ) : (
                          "Select Supplier"
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="drawer-footer p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span>
              <strong>Recommendation:</strong> Tata Steel balances 100% volume availability (500 MT) and 11-day delivery with the lowest compliant landed cost (₹2.92 Cr).
            </span>
          </div>

          <button
            type="button"
            className="primary-button"
            onClick={() => setComparisonOpen(false)}
          >
            Done Reviewing
          </button>
        </div>
      </div>
    </div>
  );
}
