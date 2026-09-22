import React from "react";
import { CheckCircle2, ChevronRight, Inbox, Mail, Send, Truck } from "lucide-react";
import { useProcurement } from "@/store/procurement";
import { StatusBadge } from "./StatusBadge";

export function EmailTimeline() {
  const { emails, purchased, shipmentStage, openEmailModal } = useProcurement();

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
    <div className="panel email-panel">
      <div className="panel-header">
        <div>
          <div className="card-kicker">
            <span className="kicker-icon">
              <Mail size={13} />
            </span>
            <span>Agent Follow-Up & Telemetry</span>
          </div>
          <h3>Procurement Email Timeline</h3>
        </div>
        <span className="panel-label">
          <span /> Live Agent Communications
        </span>
      </div>

      <div className="email-timeline">
        {emails.map((email, idx) => {
          const Icon = getIcon(email.icon);
          const isAvailable =
            purchased &&
            (email.requiredShipmentStage === undefined ||
              email.requiredShipmentStage === 0 ||
              shipmentStage >= email.requiredShipmentStage);

          return (
            <div
              className={`email-event ${isAvailable ? "active" : ""}`}
              key={email.id}
            >
              <div className={`email-node ${email.tone}`}>
                <Icon size={14} />
              </div>

              {idx !== emails.length - 1 && (
                <div
                  className={`email-line ${
                    isAvailable &&
                    (idx < 2 || shipmentStage >= (emails[idx + 1].requiredShipmentStage ?? 0))
                      ? "filled"
                      : ""
                  }`}
                />
              )}

              <div className="email-content">
                <div className="email-meta">
                  <span>{email.time} · {email.date}</span>
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
                    {!purchased ? "Pending Purchase" : isAvailable ? "Delivered" : "Queued on Dispatch"}
                  </StatusBadge>
                </div>

                <h4>{email.title}</h4>
                <p>{email.copy}</p>

                {isAvailable && (
                  <button
                    type="button"
                    className="email-view"
                    onClick={() => openEmailModal(email)}
                  >
                    <span>View full message & attachments</span>
                    <ChevronRight size={13} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
