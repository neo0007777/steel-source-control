import React from "react";
import { ArrowDownRight, Check, CheckCircle2, ChevronRight, Navigation, RefreshCw, Truck } from "lucide-react";
import { SHIPMENT_STAGES } from "@/store/mockData";
import { useProcurement } from "@/store/procurement";
import { StatusBadge } from "./StatusBadge";

export function ShipmentTracker() {
  const {
    purchased,
    shipmentStage,
    advanceShipment,
    selectedSupplier,
    received,
  } = useProcurement();

  const progress = purchased
    ? Math.round((shipmentStage / (SHIPMENT_STAGES.length - 1)) * 100)
    : 0;

  return (
    <div className="panel shipment-panel">
      <div className="panel-header">
        <div>
          <div className="card-kicker">
            <span className="kicker-icon">
              <Truck size={13} />
            </span>
            <span>Dedicated Rail & Freight Telemetry</span>
          </div>
          <h3>Consignment Lifecycle & Tracking</h3>
        </div>

        <StatusBadge
          tone={
            !purchased
              ? "slate"
              : received
              ? "green"
              : shipmentStage >= 2
              ? "blue"
              : "amber"
          }
        >
          {!purchased
            ? "Not Initiated"
            : received
            ? "Material Inwarded"
            : SHIPMENT_STAGES[shipmentStage]}
        </StatusBadge>
      </div>

      <div className="shipment-info-grid">
        <div>
          <span>Shipment ID</span>
          <strong>{purchased ? "SSX-902184" : "—"}</strong>
        </div>
        <div>
          <span>Dispatch Schedule</span>
          <strong>{shipmentStage >= 2 ? "Sep 28, 2026" : purchased ? "Processing" : "—"}</strong>
        </div>
        <div>
          <span>Current ETA</span>
          <strong>{received ? "Delivered Oct 02" : purchased ? "Oct 02, 2026 (11:00 AM)" : "—"}</strong>
        </div>
        <div>
          <span>Consignment Payload</span>
          <strong>500 MT Plates (20 Wagons)</strong>
        </div>
      </div>

      <div className="shipment-progress">
        <div className="progress-track">
          <span style={{ width: `${progress}%` }} />
        </div>

        <div className="shipment-steps">
          {SHIPMENT_STAGES.map((stage, idx) => {
            const isCompleted = idx < shipmentStage && purchased;
            const isCurrent = idx === shipmentStage && purchased;

            return (
              <div
                key={stage}
                className={`shipment-step ${isCompleted ? "complete" : ""} ${
                  isCurrent ? "current" : ""
                }`}
              >
                <span className="step-dot">
                  {isCompleted ? (
                    <Check size={11} strokeWidth={3} />
                  ) : isCurrent ? (
                    <span />
                  ) : null}
                </span>
                <small>{stage}</small>
              </div>
            );
          })}
        </div>
      </div>

      <div className="shipment-footer">
        <div className="route-chip">
          <span className="route-origin">{selectedSupplier.originCode}</span>
          <ArrowDownRight size={14} />
          <span className="route-destination">DL</span>
          <span className="font-medium text-slate-700">
            {selectedSupplier.location.split(",")[0]} → Delhi Central Warehouse
          </span>
        </div>

        <div className="flex items-center gap-3">
          {purchased && !received && (
            <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
              Step {shipmentStage + 1} of {SHIPMENT_STAGES.length}
            </span>
          )}

          <button
            type="button"
            className={
              received
                ? "primary-button bg-emerald-600 hover:bg-emerald-700 cursor-default"
                : "primary-button"
            }
            disabled={!purchased || received}
            onClick={advanceShipment}
          >
            {received ? (
              <>
                <Check size={15} /> Consignment Received
              </>
            ) : (
              <>
                <Truck size={15} /> Simulate Next Update
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
