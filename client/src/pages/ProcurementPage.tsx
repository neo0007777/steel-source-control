import React from "react";
import {
  ArrowUpRight,
  Bot,
  ChevronRight,
  Filter,
  Plus,
  RotateCcw,
  Sparkles,
  UsersRound,
  Zap,
} from "lucide-react";
import { SHIPMENT_STAGES } from "@/store/mockData";
import { useProcurement } from "@/store/procurement";
import { AgentActivity } from "@/components/procurement/AgentActivity";
import { ChatPanel } from "@/components/procurement/ChatPanel";
import { EmailTimeline } from "@/components/procurement/EmailTimeline";
import { InventoryCard } from "@/components/procurement/InventoryCard";
import { PurchaseOrder } from "@/components/procurement/PurchaseOrder";
import { PurchaseSummary } from "@/components/procurement/PurchaseSummary";
import { RequirementCard } from "@/components/procurement/RequirementCard";
import { SectionHeading } from "@/components/procurement/SectionHeading";
import { ShipmentTracker } from "@/components/procurement/ShipmentTracker";
import { SupplierCard } from "@/components/procurement/SupplierCard";
import { WarehouseReceiving } from "@/components/procurement/WarehouseReceiving";

export function ProcurementPage() {
  const {
    user,
    suppliers,
    requirementConfirmed,
    purchased,
    shipmentStage,
    received,
    setComparisonOpen,
    resetAll,
    loadDemoScenario,
  } = useProcurement();

  const firstName = user?.name ? user.name.split(" ")[0] : "Arjun";

  const journeySteps = [
    { label: "Request", active: true },
    { label: "Source", active: requirementConfirmed },
    { label: "Buy", active: purchased },
    { label: "Follow up", active: purchased },
    { label: "Track", active: purchased && shipmentStage >= 1 },
    { label: "Receive", active: received },
    { label: "Inventory", active: received },
  ];

  return (
    <div className="page-content" id="journey">
      {/* Page Intro */}
      <div className="page-intro">
        <div>
          <div className="eyebrow accent-eyebrow">
            <span /> Active AI Procurement Journey
          </div>
          <h1>
            Good morning, {firstName}<span className="period">.</span>
          </h1>
          <p>
            One agent orchestrating the complete lifecycle from{" "}
            <strong>natural language requirement to warehouse inventory.</strong>
          </p>
        </div>

        <div className="intro-actions">
          <div className="journey-id">
            <span>Journey ID</span>
            <strong>PR-2026-0917</strong>
          </div>
          <button
            type="button"
            className="secondary-button"
            onClick={loadDemoScenario}
            title="Load standard 500 MT steel plate demo scenario"
          >
            <Zap size={14} className="text-amber-500" />
            <span>Load Demo Scenario</span>
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={resetAll}
            title="Reset all states"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* 7-Step Connected Journey Progress Strip */}
      <div className="journey-strip" role="navigation" aria-label="Procurement journey stages">
        <div className="journey-strip-label">
          <Sparkles size={15} />
          <span>Procurement Pipeline</span>
        </div>
        {journeySteps.map((step, idx) => (
          <div
            className={`journey-step ${step.active ? "active" : ""}`}
            key={step.label}
          >
            <span>{idx + 1}</span>
            {step.label}
            {idx < journeySteps.length - 1 && <ChevronRight size={13} />}
          </div>
        ))}
      </div>

      {/* Step 01: Chat & Requirement Card & Agent Activity */}
      <div className="hero-grid">
        <div>
          <SectionHeading
            eyebrow="Step 01 · Natural Language Input"
            title="What do you need to procure?"
            meta="Describe materials, grade, volume & delivery schedule"
          />
          <ChatPanel />
        </div>

        <div className="right-rail">
          <RequirementCard />
          <AgentActivity />
        </div>
      </div>

      {/* Step 02: Sourcing & Supplier Recommendation */}
      <div id="recommendation" className="content-section">
        <SectionHeading
          eyebrow="Step 02 · Mill Evaluation & Landed Cost"
          title="Autonomous Sourcing Recommendation"
          meta="5 primary mills evaluated · pricing & logistics normalized"
          action={
            <button
              type="button"
              className="secondary-button"
              onClick={() => setComparisonOpen(true)}
            >
              <Filter size={15} /> Compare All Suppliers
            </button>
          }
        />

        <div className="recommendation-callout">
          <div className="recommendation-callout-icon">
            <Sparkles size={17} />
          </div>
          <div>
            <strong>
              Recommended: Tata Steel Distribution satisfies 100% quantity (500 MT) within 11 days at the lowest compliant landed cost.
            </strong>
            <span>
              Decision factors: exact volume fit · 11-day delivery (4-day safety buffer) · 96% on-time reliability · verified BIS E250 / MTC 3.1
            </span>
          </div>
          <span className="recommendation-confidence">96% SLA Match</span>
        </div>

        <div className="supplier-grid">
          {suppliers.slice(0, 2).map((supplier) => (
            <SupplierCard
              key={supplier.id}
              supplier={supplier}
              onCompare={() => setComparisonOpen(true)}
            />
          ))}

          <div className="supplier-card compact-suppliers">
            <div className="compact-top">
              <div className="compact-icon">
                <UsersRound size={17} />
              </div>
              <div>
                <strong>3 more evaluated primary suppliers</strong>
                <span>Normalized against delivery deadline & landed freight</span>
              </div>
            </div>

            <div className="compact-suppliers-list">
              {suppliers.slice(2).map((s) => (
                <div key={s.id} className="flex items-center gap-2 text-xs">
                  <span
                    className="mini-logo text-white font-bold"
                    style={{ background: s.accent }}
                  >
                    {s.short}
                  </span>
                  <span className="font-medium text-slate-700 truncate">{s.name}</span>
                  <span className="text-[10px] text-slate-400 ml-auto font-mono">{s.eta}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="text-button text-xs"
              onClick={() => setComparisonOpen(true)}
            >
              <span>Open full comparison table</span>
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Step 03: Purchase Confirmation */}
      <div id="purchase" className="content-section">
        <SectionHeading
          eyebrow="Step 03 · Commercial Authorization"
          title="Turn Sourcing Decision into Purchase Order"
          meta={purchased ? "PO Executed & Transmitted" : "Review contract breakdown before issuing PO"}
        />
        <PurchaseSummary />
      </div>

      {/* Steps 04–05: Follow-Up & Order Tracking */}
      <div id="operations" className="content-section">
        <SectionHeading
          eyebrow="Steps 04–05 · Automated Follow-Up & Tracking"
          title="Agent Continues Working After Purchase Decision"
          meta="Live simulated email exchange & GPS rake telemetry"
        />

        <div className="communication-layout">
          <EmailTimeline />
          <PurchaseOrder />
        </div>

        <ShipmentTracker />
      </div>

      {/* Steps 06–07: Warehouse Receiving & Inventory Update */}
      <div id="inventory" className="content-section">
        <SectionHeading
          eyebrow="Steps 06–07 · Inwarding & Stock Reconciliation"
          title="Close the Procurement Loop at the Warehouse"
          meta={
            received
              ? "Inspection passed · Inventory updated"
              : "Awaiting physical arrival at Delhi Central Warehouse"
          }
        />

        <WarehouseReceiving />
        <InventoryCard />
      </div>

      {/* Connected Story Footer */}
      <div className="footer-note">
        <div className="footer-note-mark">
          <Sparkles size={14} />
        </div>
        <div>
          <strong>One Connected Procurement System</strong>
          <span>Request → Source → Buy → Follow Up → Track → Receive → Inventory</span>
        </div>
        <span className="prototype-label">
          Frontend Prototype · Stateful In-Memory Store
        </span>
      </div>
    </div>
  );
}
