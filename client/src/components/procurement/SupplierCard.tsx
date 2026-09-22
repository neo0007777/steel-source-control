import React from "react";
import { Check, CheckCircle2, ChevronRight, Clock3, MoreHorizontal, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Supplier } from "@/store/mockData";
import { useProcurement } from "@/store/procurement";
import { StatusBadge } from "./StatusBadge";

interface SupplierCardProps {
  supplier: Supplier;
  onCompare: () => void;
}

function formatINR(value: number) {
  return `₹${new Intl.NumberFormat("en-IN").format(value)}`;
}

export function SupplierCard({ supplier, onCompare }: SupplierCardProps) {
  const { selectedSupplierId, selectSupplier } = useProcurement();
  const isSelected = selectedSupplierId === supplier.id;

  return (
    <div
      className={`supplier-card ${supplier.recommended ? "is-recommended" : ""} ${
        isSelected ? "is-selected" : ""
      }`}
    >
      {supplier.recommended && (
        <div className="recommended-ribbon">
          <Sparkles size={12} />
          <span>Primary AI Recommendation</span>
        </div>
      )}

      <div className="supplier-card-top">
        <div className="supplier-identity">
          <div
            className="supplier-logo"
            style={{ background: supplier.accent }}
            aria-hidden="true"
          >
            {supplier.short}
          </div>
          <div>
            <h3>{supplier.name}</h3>
            <span>{supplier.location}</span>
          </div>
        </div>

        {isSelected ? (
          <StatusBadge tone="green">Selected</StatusBadge>
        ) : supplier.recommended ? (
          <StatusBadge tone="blue">Best Fit</StatusBadge>
        ) : (
          <StatusBadge tone="slate">{supplier.onTime} SLA</StatusBadge>
        )}
      </div>

      <div className="supplier-metrics">
        <div>
          <span>Ex-Mill / MT</span>
          <strong>{formatINR(supplier.price)}</strong>
        </div>
        <div>
          <span>Landed Total</span>
          <strong>{formatINR(supplier.landed)}</strong>
        </div>
        <div>
          <span>Allocated Stock</span>
          <strong>{supplier.quantity}</strong>
        </div>
      </div>

      <div className="supplier-card-footer">
        <div className="supplier-facts">
          <span>
            <CheckCircle2 size={13} className="text-emerald-600" />
            {supplier.quality}
          </span>
          <span>
            <Clock3 size={13} className="text-blue-600" />
            {supplier.eta} ({supplier.onTime})
          </span>
        </div>
        <p>{supplier.note}</p>
      </div>

      <div className="supplier-actions">
        <button
          type="button"
          className={isSelected ? "primary-button small bg-emerald-600 hover:bg-emerald-700" : "primary-button small"}
          onClick={() => selectSupplier(supplier.id)}
        >
          {isSelected ? (
            <>
              <Check size={14} /> Supplier selected
            </>
          ) : (
            <>
              Select supplier <ChevronRight size={14} />
            </>
          )}
        </button>

        <button type="button" className="subtle-button" onClick={onCompare}>
          Compare
        </button>
      </div>
    </div>
  );
}
