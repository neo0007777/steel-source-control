import React from "react";
import { Copy, Download, FileText, Mail, Send, X, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useProcurement } from "@/store/procurement";

export function EmailModal() {
  const { activeModalEmail, closeEmailModal } = useProcurement();

  if (!activeModalEmail) return null;

  const copyEmailText = () => {
    navigator.clipboard.writeText(activeModalEmail.fullBody);
    toast.success("Email copied to clipboard");
  };

  return (
    <div className="email-modal-overlay" onClick={closeEmailModal}>
      <div
        className="email-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="email-modal-header">
          <div className="flex items-center gap-3">
            <div className="email-modal-icon">
              <Mail size={18} />
            </div>
            <div>
              <div className="eyebrow">Procurement Communication</div>
              <h3 className="email-modal-title">{activeModalEmail.title}</h3>
            </div>
          </div>
          <button
            className="icon-button"
            onClick={closeEmailModal}
            aria-label="Close message modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="email-modal-meta-box">
          <div className="email-meta-row">
            <span className="email-meta-label">Subject:</span>
            <span className="email-meta-value font-semibold">{activeModalEmail.subject}</span>
          </div>
          <div className="email-meta-row">
            <span className="email-meta-label">From:</span>
            <span className="email-meta-value">{activeModalEmail.from}</span>
          </div>
          <div className="email-meta-row">
            <span className="email-meta-label">To:</span>
            <span className="email-meta-value">{activeModalEmail.to}</span>
          </div>
          <div className="email-meta-row">
            <span className="email-meta-label">Timestamp:</span>
            <span className="email-meta-value">
              {activeModalEmail.date} at {activeModalEmail.time} IST
            </span>
          </div>
        </div>

        <div className="email-modal-body">
          <pre className="email-raw-body">{activeModalEmail.fullBody}</pre>
        </div>

        <div className="email-modal-attachments">
          <div className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1.5">
            <FileText size={13} />
            <span>Simulated Attachments</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="attachment-chip">
              <FileText size={13} className="text-blue-600" />
              <span>MTC_Grade_E250_Inspection.pdf</span>
              <span className="attachment-size">420 KB</span>
            </div>
            {activeModalEmail.id === "email-3" && (
              <div className="attachment-chip">
                <FileText size={13} className="text-emerald-600" />
                <span>PO-2026-00421_Countersigned.pdf</span>
                <span className="attachment-size">185 KB</span>
              </div>
            )}
            {activeModalEmail.id === "email-4" && (
              <div className="attachment-chip">
                <FileText size={13} className="text-amber-600" />
                <span>Rail_Consignment_Waybill_SSX.pdf</span>
                <span className="attachment-size">310 KB</span>
              </div>
            )}
          </div>
        </div>

        <div className="email-modal-footer">
          <button className="subtle-button" onClick={copyEmailText}>
            <Copy size={14} /> Copy Message
          </button>
          <button className="primary-button" onClick={closeEmailModal}>
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
}
