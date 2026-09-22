import React from "react";
import { ArrowUpRight, Check, CheckCircle2, ClipboardCheck, ShieldCheck } from "lucide-react";
import { useProcurement } from "@/store/procurement";
import { StatusBadge } from "./StatusBadge";

function formatINR(val: number) {
  return `₹${new Intl.NumberFormat("en-IN").format(val)}`;
}

export function PurchaseSummary() {
  const {
    selectedSupplier,
    requirement,
    purchased,
    proceedWithPurchase,
  } = useProcurement();

  return (
    <div className="panel purchase-panel">
      <div className="panel-header">
        <div>
          <div className="card-kicker">
            <span className="kicker-icon">
              <ClipboardCheck size={13} />
            </span>
            <span>Commercial Finalization</span>
          </div>
          <h3>Purchase Authorization Summary</h3>
        </div>
        <StatusBadge tone={purchased ? "green" : "amber"}>
          {purchased ? "PO Executed & Transmitted" : "Awaiting Authorization"}
        </StatusBadge>
      </div>

      <div className="purchase-grid">
        <div>
          <span>Selected Supplier</span>
          <strong title={selectedSupplier.name}>{selectedSupplier.name}</strong>
          <small className="block text-[10px] text-slate-400 mt-0.5">
            {selectedSupplier.location}
          </small>
        </div>
        <div>
          <span>Material Specification</span>
          <strong>{requirement.material}</strong>
          <small className="block text-[10px] text-slate-400 mt-0.5">
            10mm Thk (IS 2062:2011 E250)
          </small>
        </div>
        <div>
          <span>Procurement Volume</span>
          <strong>500 MT</strong>
          <small className="block text-[10px] text-slate-400 mt-0.5">
            Single rake batch
          </small>
        </div>
        <div>
          <span>Ex-Mill Unit Price</span>
          <strong>{formatINR(selectedSupplier.price)} / MT</strong>
          <small className="block text-[10px] text-slate-400 mt-0.5">
            Net ex-works rate
          </small>
        </div>
        <div>
          <span>Delivery Destination</span>
          <strong>{requirement.deliveryLocation}</strong>
          <small className="block text-[10px] text-slate-400 mt-0.5">
            Okhla Industrial Siding
          </small>
        </div>
        <div>
          <span>Target Dispatch & ETA</span>
          <strong>{selectedSupplier.eta}</strong>
          <small className="block text-[10px] text-slate-400 mt-0.5">
            Arrival Oct 02, 2026
          </small>
        </div>
      </div>

      <div className="purchase-total">
        <div>
          <span>Estimated Total Landed Commitment</span>
          <strong>{formatINR(selectedSupplier.landed)}</strong>
          <small>
            Includes ex-works valuation, dedicated rail freight, transit insurance, and GST
          </small>
        </div>

        <button
          type="button"
          className={
            purchased
              ? "primary-button bg-emerald-600 hover:bg-emerald-700 cursor-default"
              : "primary-button"
          }
          onClick={proceedWithPurchase}
          disabled={purchased}
        >
          {purchased ? (
            <>
              <Check size={15} /> Purchase Order Released
            </>
          ) : (
            <>
              Proceed with purchase <ArrowUpRight size={15} />
            </>
          )}
        </button>
      </div>

      {purchased && (
        <div className="success-note">
          <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
          <div>
            <strong>
              Purchase request transmitted to {selectedSupplier.name}.
            </strong>
            <span>
              Official Purchase Order <strong>PO-2026-00421</strong> has been locked into the ERP.
              Source AI agent has initiated automated RFQ counter-confirmation and delivery tracking.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
