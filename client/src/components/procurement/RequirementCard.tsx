import React from "react";
import { Check, Edit3, FileText, Layers, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { useProcurement } from "@/store/procurement";
import { StatusBadge } from "./StatusBadge";

export function RequirementCard() {
  const {
    requirement,
    requirementConfirmed,
    confirmRequirement,
    editRequirement,
    userMessage,
  } = useProcurement();

  const isReady = Boolean(userMessage);

  const rows = [
    { label: "Material Grade", value: requirement.material, sub: requirement.grade },
    { label: "Order Quantity", value: `${requirement.quantity} ${requirement.unit}`, sub: "Single continuous rake" },
    { label: "Dimensions", value: `${requirement.thickness} Thk`, sub: requirement.dimensions },
    { label: "Delivery Location", value: requirement.deliveryLocation, sub: "Okhla Ph-1 siding" },
    { label: "Required By", value: `${requirement.requiredByDays} Days`, sub: requirement.requiredByDate },
  ];

  return (
    <div className="panel requirement-card">
      <div className="panel-header">
        <div>
          <div className="card-kicker">
            <span className="kicker-icon">
              <FileText size={13} />
            </span>
            <span>Structured Extraction</span>
          </div>
          <h3>Procurement Requirement</h3>
        </div>
        <StatusBadge tone={requirementConfirmed ? "green" : isReady ? "blue" : "slate"}>
          {requirementConfirmed ? "Confirmed" : isReady ? "Ready to Source" : "Awaiting Input"}
        </StatusBadge>
      </div>

      <div className="requirement-rows">
        {rows.map((row) => (
          <div className="requirement-row" key={row.label}>
            <div>
              <span>{row.label}</span>
              {row.sub && <small className="block text-[9px] text-slate-400 mt-0.5">{row.sub}</small>}
            </div>
            <strong>{isReady ? row.value : "—"}</strong>
          </div>
        ))}
      </div>

      <div className="requirement-divider" />

      <div className="requirement-footer">
        <span className="flex items-center gap-1.5 text-xs text-slate-500">
          <ShieldCheck size={14} className={requirementConfirmed ? "text-emerald-600" : "text-slate-400"} />
          <span>{requirementConfirmed ? "BIS 2062 criteria locked" : "Parsed via Source AI NLP"}</span>
        </span>

        {requirementConfirmed ? (
          <button type="button" className="text-button" onClick={editRequirement}>
            <Edit3 size={13} /> Edit requirement
          </button>
        ) : (
          <button
            type="button"
            className="primary-button"
            disabled={!isReady}
            onClick={confirmRequirement}
          >
            <Check size={14} /> Confirm requirement
          </button>
        )}
      </div>
    </div>
  );
}
