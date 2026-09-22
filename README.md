# SteelSource AI — Autonomous Steel Procurement Platform

> **An interactive frontend product prototype for an AI-powered industrial steel procurement system.**  
> Built for interview presentations and executive walkthroughs — demonstrating the complete connected journey from natural language requirement to warehouse inventory reconciliation.

---

## 1. What This Product Demonstrates

A viewer can sit down and understand the product in 2–3 minutes:

1. **Natural Language Requirement**: The company describes what material it needs (*"I need 500 MT of IS 2062 E250 steel plates, 10mm thickness, delivered to our Delhi warehouse within 15 days"*).
2. **AI Structuring & Normalization**: The agent extracts grade, tonnage, dimensions, destination, and constraints into a confirmed procurement spec.
3. **Multi-Mill Sourcing**: Evaluates 5 primary steel mills (Tata Steel, JSW Steel, ArcelorMittal Nippon, SAIL, Jindal Steel) and recommends the optimal match based on compliant landed cost, stock availability, and delivery SLA.
4. **Interactive Comparison Matrix**: Multi-criteria decision table comparing ex-mill rates, freight, landed cost, stock, and reliability.
5. **Commercial Authorization & PO**: Generates official `PO-2026-00421` with instant downloadable text format.
6. **Follow-Up & Communications**: Agent follows up autonomously over simulated email (RFQ transmission, mill response, PO countersign, and dispatch notices).
7. **GPS Transit Tracking**: 6-stage logistics tracker with real-time status progression and a *"Simulate Next Update"* control.
8. **Warehouse Inwarding & Quality Check**: Physical receiving sign-off with MTC 3.1 inspection and Goods Receipt Note (**GRN-2026-00187**).
9. **Inventory Reconciliation**: Live stock ledger updates from **1,240 MT → +500 MT → 1,740 MT**.
10. **Client-Side Auth & Personalization**: Sign In / Sign Out with custom full name personalization or one-click demo personas.

---

## 2. Architecture & In-Memory State Layer

This is a **frontend-only prototype** that behaves like a real enterprise platform without backend, database, or external microservice dependencies.

```
                           ┌───────────────────────────────────┐
                           │   ProcurementStore (React Context)│
                           │   • Central In-Memory State       │
                           │   • Reactive Entity Graph         │
                           └─────────────────┬─────────────────┘
                                             │
        ┌──────────────────┬─────────────────┼──────────────────┬─────────────────┐
        ▼                  ▼                 ▼                  ▼                 ▼
┌───────────────┐  ┌───────────────┐ ┌───────────────┐  ┌───────────────┐ ┌───────────────┐
│ AI Chat &     │  │ Sourcing &    │ │ Purchase &    │  │ Communications│ │ Warehouse &   │
│ Requirements  │  │ Suppliers     │ │ PO Generation │  │ & Tracking    │ │ Inventory     │
└───────────────┘  └───────────────┘ └───────────────┘  └───────────────┘ └───────────────┘
```

Selecting any supplier (Tata Steel, JSW, ArcelorMittal) immediately and consistently propagates through:
- **Purchase Summary** (updates pricing and landed totals)
- **Purchase Order Document** (updates vendor entity, works siding, and contact)
- **Email Correspondence** (links to that supplier's commercial manager)
- **Shipment Tracker** (plots origin rail siding code to Delhi)
- **Warehouse Receiving & Inventory** (reconciles the material into Bay C-04)

---

## 3. Tech Stack

- **Framework**: Vite + React 19 + TypeScript
- **Styling**: Tailwind CSS + Custom Design System
- **State Management**: React Context (`ProcurementProvider`)
- **Icons**: Lucide React
- **Notifications**: Sonner

---

## 4. Quick Start

### Prerequisites
- Node.js (v18+)
- pnpm (recommended) or npm

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/neo0007777/steel-source-control.git
cd steel-source-control

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

Open `http://localhost:3000` (or `http://localhost:3001` if port 3000 is occupied).

### Type Checking & Production Build

```bash
# Run TypeScript check
pnpm run check

# Create production bundle
pnpm run build
```

---

## 5. Walkthrough Demo Script (2–3 Minutes)

1. **Sign In**: Launch the app (pre-authenticated as *Arjun Kapoor*, or click *Sign Out* to enter your own custom name).
2. **AI Chat**: Click the prompt chip: *"Use demo request: 500 MT IS 2062 E250 plates (Delhi, 15 days)"*.
3. **Confirm Spec**: Review the extracted parameters in the *Requirement Card* and click **"Confirm requirement"**.
4. **Review Recommendation**: Observe the live agent activity checkmarks. Review the recommendation for *Tata Steel Distribution* and click **"Compare All Suppliers"** to view the matrix.
5. **Issue Purchase Order**: Click **"Proceed with purchase"** to authorize and lock in `PO-2026-00421`.
6. **Follow-Up Emails**: In the *Procurement Email Timeline*, click **"View full message & attachments"** to read the simulated B2B correspondence and click **"Download Official PO"**.
7. **Advance Transit**: Click **"Simulate Next Update"** across the 6 shipment stages until the consignment is inwarded.
8. **Verify Inventory**: View the *Warehouse Receiving (GRN-2026-00187)* sign-off and the updated inventory ledger (**1,740 MT**).
9. **Explore Navigation**: Click *Orders*, *Suppliers*, *Communications*, or *Inventory* in the sidebar to observe cross-page state consistency.

---

## 6. License

MIT
