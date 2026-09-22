import React from "react";
import {
  ArrowDownRight,
  Boxes,
  CheckCircle2,
  Layers,
  MapPin,
  PackageCheck,
  TrendingUp,
} from "lucide-react";
import { useProcurement } from "@/store/procurement";
import { StatusBadge } from "@/components/procurement/StatusBadge";
import { WarehouseReceiving } from "@/components/procurement/WarehouseReceiving";

function formatINR(val: number) {
  return `₹${new Intl.NumberFormat("en-IN").format(val)}`;
}

export function InventoryPage() {
  const { inventory, received } = useProcurement();

  return (
    <div className="page-content">
      <div className="page-intro">
        <div>
          <div className="eyebrow accent-eyebrow">
            <span /> Warehouse Inventory Control
          </div>
          <h1>
            Delhi Central Warehouse Inventory<span className="period">.</span>
          </h1>
          <p>
            Real-time material stock balances, bay allocations, and gate receiving records.
          </p>
        </div>

        <div className="intro-actions">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Ledger Synced with ERP</span>
          </div>
        </div>
      </div>

      {/* Show Warehouse Receiving Banner if received */}
      <WarehouseReceiving />

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="panel p-4">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">
            Total Steel On-Hand
          </span>
          <strong className="text-xl font-bold text-slate-800 font-mono mt-1 block">
            {inventory.reduce((acc, i) => acc + i.currentStock, 0).toLocaleString()} MT
          </strong>
          <span className="text-[11px] text-emerald-600 flex items-center gap-1 mt-0.5 font-medium">
            <TrendingUp size={12} /> {received ? "+500 MT Received Today" : "Normal Velocity"}
          </span>
        </div>

        <div className="panel p-4">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">
            Procured Line (IS 2062)
          </span>
          <strong className="text-xl font-bold text-blue-700 font-mono mt-1 block">
            {inventory[0]?.currentStock.toLocaleString()} MT
          </strong>
          <span className="text-[11px] text-slate-500 mt-0.5 block">
            {received ? "Reconciled via GRN-2026-00187" : "1,240 MT Baseline"}
          </span>
        </div>

        <div className="panel p-4">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">
            Active Warehouse Bay
          </span>
          <strong className="text-xl font-bold text-slate-800 font-mono mt-1 block">
            Bay C-04
          </strong>
          <span className="text-[11px] text-slate-500 mt-0.5 block">
            Okhla Heavy Storage Siding
          </span>
        </div>

        <div className="panel p-4">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">
            Quality Standard
          </span>
          <strong className="text-xl font-bold text-emerald-700 font-mono mt-1 block">
            BIS 2062:2011
          </strong>
          <span className="text-[11px] text-emerald-600 mt-0.5 block">
            100% Heat-wise MTC 3.1
          </span>
        </div>
      </div>

      {/* Inventory Items Table */}
      <div className="panel p-6">
        <h3 className="font-bold text-slate-800 text-sm mb-4">
          Material Catalog & Live Stock Positions
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase font-mono text-[10px] border-b border-slate-100">
              <tr>
                <th className="p-3">SKU & Material</th>
                <th className="p-3">Category</th>
                <th className="p-3">Warehouse Bay</th>
                <th className="p-3 text-right">Previous Stock</th>
                <th className="p-3 text-right">Received</th>
                <th className="p-3 text-right">Current Stock</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inventory.map((item) => {
                const isTarget = item.isProcuredTarget;
                return (
                  <tr
                    key={item.id}
                    className={
                      isTarget
                        ? "bg-blue-50/40 font-medium"
                        : "hover:bg-slate-50/50"
                    }
                  >
                    <td className="p-3">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <strong className="text-slate-800 font-semibold">
                            {item.name}
                          </strong>
                          {isTarget && (
                            <span className="text-[9px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-mono font-medium">
                              Active Procurement Target
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {item.sku}
                        </span>
                      </div>
                    </td>

                    <td className="p-3 text-slate-600">{item.category}</td>
                    <td className="p-3 text-slate-600">{item.location}</td>

                    <td className="p-3 text-right font-mono text-slate-500">
                      {item.previousStock.toLocaleString()} MT
                    </td>

                    <td className="p-3 text-right font-mono">
                      {isTarget && received ? (
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                          +{item.receivedAmount} MT
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    <td className="p-3 text-right font-mono font-bold text-slate-900">
                      {item.currentStock.toLocaleString()} MT
                    </td>

                    <td className="p-3 text-center">
                      <StatusBadge
                        tone={
                          item.status === "Optimal"
                            ? "green"
                            : item.status === "Healthy"
                            ? "blue"
                            : "amber"
                        }
                      >
                        {item.status}
                      </StatusBadge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
