import React from "react";
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  Inbox,
  Mail,
  Send,
  Sparkles,
  Truck,
} from "lucide-react";
import { useProcurement } from "@/store/procurement";
import { StatusBadge } from "@/components/procurement/StatusBadge";

export function CommunicationsPage() {
  const {
    emails,
    selectedSupplier,
    purchased,
    shipmentStage,
    openEmailModal,
  } = useProcurement();

  const getIcon = (type: string) => {
    switch (type) {
      case "send":
        return Send;
      case "inbox":
        return Inbox;
      case "check":
        return CheckCircle2;
      case "truck":
        return Truck;
      default:
        return Mail;
    }
  };

  return (
    <div className="page-content">
      <div className="page-intro">
        <div>
          <div className="eyebrow accent-eyebrow">
            <span /> Autonomous Agent Communications
          </div>
          <h1>
            Procurement Correspondence<span className="period">.</span>
          </h1>
          <p>
            Autonomous email exchange between Source AI and{" "}
            <strong>{selectedSupplier.name}</strong> commercial desk.
          </p>
        </div>

        <div className="intro-actions">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Telemetry Active</span>
          </div>
        </div>
      </div>

      <div className="panel p-6">
        <div className="flex items-center justify-between pb-5 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-800 text-base">
              Thread: RFQ-2026-0842 · IS 2062 E250 Steel Plates (500 MT)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              4 messages exchanged with {selectedSupplier.contactPerson} ({selectedSupplier.contactEmail})
            </p>
          </div>

          <StatusBadge tone={purchased ? "green" : "slate"}>
            {purchased ? "Active PO Attached" : "Awaiting Sourcing Confirmation"}
          </StatusBadge>
        </div>

        <div className="space-y-4 pt-5">
          {emails.map((email, idx) => {
            const Icon = getIcon(email.icon);
            const isAvailable =
              purchased &&
              (email.requiredShipmentStage === undefined ||
                email.requiredShipmentStage === 0 ||
                shipmentStage >= email.requiredShipmentStage);

            return (
              <div
                key={email.id}
                className={`p-4 rounded-xl border transition-all ${
                  isAvailable
                    ? "bg-white border-slate-200 shadow-sm hover:border-blue-300"
                    : "bg-slate-50 border-slate-100 opacity-60"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span
                      className={`p-2 rounded-lg shrink-0 ${
                        email.tone === "green"
                          ? "bg-emerald-50 text-emerald-700"
                          : email.tone === "blue"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <Icon size={16} />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-slate-800 text-xs">
                          {email.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {email.time} · {email.date}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-slate-700 mt-1">
                        {email.subject}
                      </p>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-3xl">
                        {email.copy}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <StatusBadge
                      tone={
                        !purchased
                          ? "slate"
                          : isAvailable
                          ? email.tone === "green"
                            ? "green"
                            : "blue"
                          : "slate"
                      }
                    >
                      {!purchased
                        ? "Pending Purchase"
                        : isAvailable
                        ? "Delivered"
                        : "Queued"}
                    </StatusBadge>
                  </div>
                </div>

                {isAvailable && (
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">
                      From: {email.from.split("<")[0].trim()}
                    </span>

                    <button
                      type="button"
                      className="text-button text-xs"
                      onClick={() => openEmailModal(email)}
                    >
                      <span>Read Full Email & Review Attachments</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
