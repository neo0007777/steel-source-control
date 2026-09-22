import React from "react";
import { Boxes, CheckCircle2, TrendingUp } from "lucide-react";
import { useProcurement } from "@/store/procurement";
import { StatusBadge } from "./StatusBadge";

export function InventoryCard() {
  const { targetInventoryItem, received } = useProcurement();

  const prev = targetInventoryItem.previousStock;
  const current = targetInventoryItem.currentStock;
  const cap = targetInventoryItem.capacity;
  const pct = Math.min(Math.round((current / cap) * 100), 100);

  return (
    <div className="panel inventory-panel">
      <div className="panel-header">
        <div>
          <div className="card-kicker">
            <span className="kicker-icon">
              <Boxes size={13} />
            </span>
            <span>Real-Time Warehouse Stock Ledger</span>
          </div>
          <h3>Inventory Impact & Stock Level</h3>
        </div>

        <StatusBadge tone={received ? "green" : "slate"}>
          {received ? "Ledger Reconciled & Updated" : "Awaiting Rake Inwarding"}
        </StatusBadge>
      </div>

      <div className="inventory-product">
        <div className="product-icon">
          <Boxes size={22} />
        </div>
        <div>
          <strong>{targetInventoryItem.name}</strong>
          <span>10 mm thickness · {targetInventoryItem.location}</span>
        </div>
        <span className="stock-level">
          {received ? "Healthy Target Stock" : "Current Stock"}
        </span>
      </div>

      <div className="inventory-metrics">
        <div>
          <span>Previous Stock</span>
          <strong>
            {prev.toLocaleString()} <small>MT</small>
          </strong>
        </div>

        <div className="received-metric">
          <span>Received Consignment</span>
          <strong>
            {received ? `+${targetInventoryItem.receivedAmount}` : "—"}{" "}
            <small>MT</small>
          </strong>
        </div>

        <div className="current-metric">
          <span>Current Stock</span>
          <strong>
            {current.toLocaleString()} <small>MT</small>
          </strong>
        </div>
      </div>

      <div className="inventory-bar">
        <div className="bar-caption">
          <span>Capacity Utilization ({targetInventoryItem.location.split("—")[0]})</span>
          <strong>
            {pct}% of {cap.toLocaleString()} MT Target
          </strong>
        </div>
        <div className="bar-track">
          <span style={{ width: `${pct}%` }} />
        </div>
      </div>

      {received && (
        <div className="inventory-success">
          <CheckCircle2 size={17} className="shrink-0 text-emerald-600" />
          <div>
            <strong>Material Inward Complete · GRN-2026-00187 Recorded</strong>
            <span>
              500 MT of IS 2062 E250 steel plate has been absorbed into active manufacturing floor allocation.
              Procurement journey closed with 100% SLA compliance.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
