import React from "react";
import { CheckCircle2, ClipboardCheck, FileCheck, Layers, PackageCheck, ShieldCheck } from "lucide-react";
import { useProcurement } from "@/store/procurement";
import { StatusBadge } from "./StatusBadge";

export function WarehouseReceiving() {
  const { received, targetInventoryItem } = useProcurement();

  if (!received) return null;

  return (
    <div className="panel warehouse-receiving-panel p-5 mb-5 border-emerald-200 bg-emerald-50/30">
      <div className="panel-header mb-4">
        <div>
          <div className="card-kicker text-emerald-700">
            <span className="kicker-icon bg-emerald-100 text-emerald-700">
              <PackageCheck size={14} />
            </span>
            <span>Gate Inwarding & Quality Inspection</span>
          </div>
          <h3 className="text-emerald-950">Warehouse Receiving & Quality Sign-Off</h3>
        </div>
        <StatusBadge tone="green">GRN Approved & Filed</StatusBadge>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 p-4 bg-white rounded-lg border border-emerald-100 shadow-sm text-xs">
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">
            Material
          </span>
          <strong className="text-slate-800 font-semibold block mt-0.5 truncate">
            IS 2062 E250 Plate
          </strong>
        </div>

        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">
            Expected Quantity
          </span>
          <strong className="text-slate-800 font-semibold block mt-0.5">500 MT</strong>
        </div>

        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">
            Received (Net Scale)
          </span>
          <strong className="text-emerald-700 font-bold block mt-0.5">500 MT</strong>
        </div>

        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">
            Quality Inspection
          </span>
          <strong className="text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
            <CheckCircle2 size={13} /> Passed (MTC 3.1)
          </strong>
        </div>

        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">
            Receiving Warehouse
          </span>
          <strong className="text-slate-800 font-semibold block mt-0.5 truncate">
            Delhi Central — Bay C-04
          </strong>
        </div>

        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">
            Goods Receipt Note (GRN)
          </span>
          <strong className="text-blue-700 font-mono font-bold block mt-0.5">
            GRN-2026-00187
          </strong>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-emerald-800 font-medium">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 size={15} className="text-emerald-600" />
          <span>Material physically received and staged in Bay C-04</span>
        </span>
        <span className="flex items-center gap-1.5">
          <CheckCircle2 size={15} className="text-emerald-600" />
          <span>Warehouse inventory ledger incremented (+500 MT)</span>
        </span>
      </div>
    </div>
  );
}
