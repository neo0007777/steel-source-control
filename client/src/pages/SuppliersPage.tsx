import React from "react";
import {
  Check,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Filter,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { useProcurement } from "@/store/procurement";
import { StatusBadge } from "@/components/procurement/StatusBadge";

function formatINR(val: number) {
  return `₹${new Intl.NumberFormat("en-IN").format(val)}`;
}

export function SuppliersPage() {
  const {
    suppliers,
    selectedSupplierId,
    selectSupplier,
    setComparisonOpen,
  } = useProcurement();

  return (
    <div className="page-content">
      <div className="page-intro">
        <div>
          <div className="eyebrow accent-eyebrow">
            <span /> Qualified Primary Mill Network
          </div>
          <h1>
            Steel Producers & Distributors<span className="period">.</span>
          </h1>
          <p>
            Vetted primary steel mills evaluated against quality standards, freight siding access, and on-time performance.
          </p>
        </div>

        <div className="intro-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={() => setComparisonOpen(true)}
          >
            <Filter size={14} /> Open Comparison Matrix
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {suppliers.map((s) => {
          const isSelected = s.id === selectedSupplierId;

          return (
            <div
              key={s.id}
              className={`panel p-5 transition-all ${
                isSelected
                  ? "ring-2 ring-emerald-500 shadow-md bg-emerald-50/10"
                  : s.recommended
                  ? "border-blue-200"
                  : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-sm"
                    style={{ background: s.accent }}
                  >
                    {s.short}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-800 text-sm">{s.name}</h3>
                      {s.recommended && (
                        <span className="text-[9px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-mono font-medium">
                          AI Top Pick
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin size={12} /> {s.location}
                    </span>
                  </div>
                </div>

                <StatusBadge tone={isSelected ? "green" : s.recommended ? "blue" : "slate"}>
                  {isSelected ? "Active Selected" : s.recommended ? "Recommended" : "Qualified"}
                </StatusBadge>
              </div>

              {/* Metrics row */}
              <div className="grid grid-cols-3 gap-2 py-4 my-3 border-y border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono uppercase">
                    Rate / MT
                  </span>
                  <strong className="text-slate-800 font-semibold mt-0.5 block">
                    {formatINR(s.price)}
                  </strong>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 block font-mono uppercase">
                    Available MT
                  </span>
                  <strong className="text-slate-800 font-semibold mt-0.5 block">
                    {s.quantity}
                  </strong>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 block font-mono uppercase">
                    SLA Window
                  </span>
                  <strong className="text-slate-800 font-semibold mt-0.5 block">
                    {s.eta} ({s.onTime})
                  </strong>
                </div>
              </div>

              <div className="text-xs text-slate-600 mb-4">
                <p className="leading-relaxed">{s.note}</p>
              </div>

              <div className="space-y-1.5 mb-4 text-[11px] text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={13} className="text-emerald-600 shrink-0" />
                  <span>{s.compliance}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={13} className="text-blue-600 shrink-0" />
                  <span>{s.contactPerson} · {s.contactEmail}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">
                  Landed: <strong className="text-slate-700">{formatINR(s.landed)}</strong>
                </span>

                <button
                  type="button"
                  className={
                    isSelected
                      ? "primary-button small bg-emerald-600 hover:bg-emerald-700"
                      : "primary-button small"
                  }
                  onClick={() => selectSupplier(s.id)}
                >
                  {isSelected ? (
                    <>
                      <Check size={13} /> Selected Supplier
                    </>
                  ) : (
                    "Select for PO"
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
