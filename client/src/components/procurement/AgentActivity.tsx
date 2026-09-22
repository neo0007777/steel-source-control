import React, { useEffect, useState } from "react";
import { Bot, Check, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { useProcurement } from "@/store/procurement";

export function AgentActivity() {
  const { userMessage, requirementConfirmed, purchased } = useProcurement();

  // Progressively enable steps when confirmed
  const [step1Done, setStep1Done] = useState(false);
  const [step2Done, setStep2Done] = useState(false);
  const [step3Done, setStep3Done] = useState(false);
  const [step4Done, setStep4Done] = useState(false);
  const [step5Done, setStep5Done] = useState(false);

  useEffect(() => {
    if (!userMessage) {
      setStep1Done(false);
      setStep2Done(false);
      setStep3Done(false);
      setStep4Done(false);
      setStep5Done(false);
      return;
    }

    setStep1Done(true);

    if (requirementConfirmed) {
      const t1 = setTimeout(() => setStep2Done(true), 250);
      const t2 = setTimeout(() => setStep3Done(true), 550);
      const t3 = setTimeout(() => setStep4Done(true), 850);
      const t4 = setTimeout(() => setStep5Done(true), 1150);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    } else {
      setStep2Done(false);
      setStep3Done(false);
      setStep4Done(false);
      setStep5Done(false);
    }
  }, [userMessage, requirementConfirmed]);

  const activityItems = [
    {
      label: "Requirement understood & normalized",
      detail: "IS 2062 Grade E250 / 10mm / 500 MT extracted",
      done: step1Done,
    },
    {
      label: "5 Primary steel producers evaluated",
      detail: "Live mill inventory sidings queried",
      done: step2Done,
    },
    {
      label: "Ex-mill & rail freight landed cost computed",
      detail: "Base rate + freight + GST breakdown calculated",
      done: step3Done,
    },
    {
      label: "15-day delivery & MTC 3.1 constraints verified",
      detail: "Buffer margin & rail transit SLA checked",
      done: step4Done,
    },
    {
      label: "Optimal procurement recommendation synthesized",
      detail: "Ranked by compliant landed cost & risk profile",
      done: step5Done,
    },
  ];

  return (
    <div className="agent-activity">
      <div className="activity-heading">
        <div className="activity-icon">
          <Bot size={15} />
        </div>
        <div>
          <strong>Autonomous Procurement Engine</strong>
          <span>Business-level decision workflow</span>
        </div>
        <span className="activity-live">
          <i /> live
        </span>
      </div>

      <div className="activity-list">
        {activityItems.map((item, idx) => (
          <div
            className={`activity-row ${item.done ? "done" : "pending"}`}
            key={item.label}
          >
            <span className="activity-check">
              {item.done ? (
                <Check size={11} strokeWidth={3} />
              ) : (
                <span className="activity-spinner" />
              )}
            </span>
            <div className="flex-1 min-w-0">
              <span className="block text-xs font-medium leading-tight">
                {item.label}
              </span>
              <span className="block text-[9px] opacity-70 mt-0.5 truncate">
                {item.detail}
              </span>
            </div>
            {item.done && (
              <span className="activity-time">
                {idx === 0 ? "ready" : "verified"}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
