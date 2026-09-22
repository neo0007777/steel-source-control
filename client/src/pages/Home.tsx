import React, { useState } from "react";
import {
  Bot,
  Boxes,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  LogOut,
  Mail,
  Menu,
  MoreHorizontal,
  Settings2,
  Sparkles,
  UserCheck,
  UserRound,
  UsersRound,
  X,
  Zap,
} from "lucide-react";
import { useProcurement } from "@/store/procurement";
import { EmailModal } from "@/components/procurement/EmailModal";
import { SupplierComparison } from "@/components/procurement/SupplierComparison";
import { ProcurementPage } from "./ProcurementPage";
import { OrdersPage } from "./OrdersPage";
import { SuppliersPage } from "./SuppliersPage";
import { CommunicationsPage } from "./CommunicationsPage";
import { InventoryPage } from "./InventoryPage";
import { SignInPage } from "./SignInPage";

const navItems = [
  { label: "AI Procurement", icon: Sparkles },
  { label: "Orders", icon: ClipboardCheck, count: "01" },
  { label: "Suppliers", icon: UsersRound, count: "05" },
  { label: "Communications", icon: Mail, count: "04" },
  { label: "Inventory", icon: Boxes },
];

function UserProfileModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { user, signOut } = useProcurement();
  if (!isOpen || !user) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl border border-slate-200 p-6 max-w-sm w-full animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm shadow-sm"
              style={{ background: "#f3d5cc", color: "#8b493d" }}
            >
              {user.initials}
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-800 text-sm truncate">{user.name}</h4>
              <p className="text-xs text-slate-500 truncate">{user.role}</p>
            </div>
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Close profile menu"
          >
            <X size={16} />
          </button>
        </div>

        <div className="py-4 space-y-2.5 text-xs">
          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-400 font-mono text-[10px] uppercase">Work Email</span>
            <span className="font-medium text-slate-700 truncate max-w-[180px]">{user.email}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-400 font-mono text-[10px] uppercase">Company</span>
            <span className="font-medium text-slate-700">{user.company}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-400 font-mono text-[10px] uppercase">Access Role</span>
            <span className="font-medium text-slate-700">{user.role}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-400 font-mono text-[10px] uppercase">Session</span>
            <span className="text-emerald-600 font-medium font-mono text-[11px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Authenticated
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex gap-2">
          <button
            type="button"
            className="secondary-button full text-xs"
            onClick={onClose}
          >
            Dismiss
          </button>
          <button
            type="button"
            className="primary-button full text-xs bg-rose-600 hover:bg-rose-700"
            onClick={() => {
              onClose();
              signOut();
            }}
          >
            <LogOut size={13} /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

function AppSidebar({ onOpenProfile }: { onOpenProfile: () => void }) {
  const {
    user,
    activeNav,
    setActiveNav,
    mobileNavOpen,
    setMobileNavOpen,
    loadDemoScenario,
    userMessage,
    requirementConfirmed,
    purchased,
    received,
    signOut,
  } = useProcurement();

  let agentStatus = "Idle · Standing by";
  let agentProgress = 15;
  let agentSub = "Ready for procurement input";

  if (received) {
    agentStatus = "Lifecycle Complete";
    agentProgress = 100;
    agentSub = "500 MT inwarded at Bay C-04";
  } else if (purchased) {
    agentStatus = "Telemetry Active";
    agentProgress = 75;
    agentSub = "Tracking rail consignment SSX";
  } else if (requirementConfirmed) {
    agentStatus = "Sourcing Complete";
    agentProgress = 50;
    agentSub = "Recommendation ready for sign-off";
  } else if (userMessage) {
    agentStatus = "Requirement Parsed";
    agentProgress = 30;
    agentSub = "Awaiting buyer confirmation";
  }

  return (
    <>
      <div
        className={`sidebar-backdrop ${mobileNavOpen ? "is-open" : ""}`}
        onClick={() => setMobileNavOpen(false)}
      />
      <aside className={`app-sidebar ${mobileNavOpen ? "is-open" : ""}`}>
        <div className="brand-lockup">
          <div className="brand-mark">
            <span />
            <span />
            <span />
          </div>
          <div>
            <div className="brand-name">SteelSource AI</div>
            <div className="brand-sub">Autonomous Procurement Control</div>
          </div>
          <button
            type="button"
            className="mobile-close"
            aria-label="Close navigation"
            onClick={() => setMobileNavOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        <div className="workspace-switcher">
          <div className="workspace-avatar">{user?.company?.[0] || "A"}</div>
          <div className="workspace-copy">
            <span>{user?.company || "Ardent Manufacturing"}</span>
            <small>Delhi Central Facility</small>
          </div>
          <ChevronRight size={15} className="muted-icon" />
        </div>

        <div className="nav-label">Procurement Workspace</div>
        <nav className="main-nav" aria-label="Primary navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.label;

            return (
              <button
                key={item.label}
                type="button"
                className={`nav-item ${isActive ? "active" : ""}`}
                onClick={() => {
                  setActiveNav(item.label);
                  setMobileNavOpen(false);
                }}
              >
                <Icon size={17} strokeWidth={isActive ? 2.2 : 1.8} />
                <span>{item.label}</span>
                {item.count && <span className="nav-count">{item.count}</span>}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-spacer" />

        {/* Dynamic Live Agent Card */}
        <div className="agent-card">
          <div className="agent-card-top">
            <div className="agent-orb">
              <Bot size={16} />
            </div>
            <span className="live-dot">
              <i /> {agentStatus}
            </span>
          </div>
          <strong>Source AI Agent</strong>
          <p>{agentSub}</p>
          <div className="agent-progress">
            <span style={{ width: `${agentProgress}%` }} />
          </div>
          <small>
            Autonomous Status: <b>{agentProgress}% SLA Pipeline</b>
          </small>
        </div>

        <button
          type="button"
          className="load-scenario"
          onClick={loadDemoScenario}
        >
          <Zap size={14} className="text-amber-500" />
          <span>Load Demo Scenario</span>
        </button>

        <div className="sidebar-footer">
          <button
            type="button"
            onClick={signOut}
            title="Sign out of procurement session"
            className="text-slate-500 hover:text-rose-600 transition-colors"
          >
            <LogOut size={16} /> Sign Out
          </button>
          <button
            type="button"
            className="profile-button cursor-pointer"
            onClick={onOpenProfile}
            title="Click to view profile / switch persona"
          >
            <span>{user?.initials || "AK"}</span>
            <span className="truncate">{user?.name || "Arjun Kapoor"}</span>
            <MoreHorizontal size={16} />
          </button>
        </div>
      </aside>
    </>
  );
}

function Topbar({ onOpenProfile }: { onOpenProfile: () => void }) {
  const {
    user,
    activeNav,
    setMobileNavOpen,
    helpModalOpen,
    setHelpModalOpen,
  } = useProcurement();

  return (
    <header className="topbar">
      <button
        type="button"
        className="mobile-menu"
        onClick={() => setMobileNavOpen(true)}
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>

      <div className="breadcrumb">
        <span>{user?.company || "Ardent Procurement"}</span>
        <ChevronRight size={14} />
        <strong>{activeNav}</strong>
      </div>

      <div className="topbar-actions">
        <div className="sync-status">
          <span /> AI Agent & ERP Telemetry Live
        </div>
        <button
          type="button"
          className="icon-button"
          onClick={() => setHelpModalOpen(!helpModalOpen)}
          aria-label="Demo Guide"
          title="Demo walkthrough guide"
        >
          <CircleHelp size={18} />
        </button>
        <button
          type="button"
          className="topbar-avatar cursor-pointer border-0"
          onClick={onOpenProfile}
          title={`Signed in as ${user?.name} (${user?.role}) — Click for options`}
        >
          {user?.initials || "AK"}
        </button>
      </div>
    </header>
  );
}

function HelpPopover() {
  const { helpModalOpen, setHelpModalOpen, loadDemoScenario, resetAll } =
    useProcurement();

  if (!helpModalOpen) return null;

  return (
    <div className="help-popover" role="dialog" aria-modal="false">
      <div className="help-popover-header">
        <div>
          <div className="eyebrow">Demo Walkthrough</div>
          <strong>How to Experience This Journey</strong>
        </div>
        <button
          type="button"
          className="icon-button"
          onClick={() => setHelpModalOpen(false)}
          aria-label="Close walkthrough guide"
        >
          <X size={15} />
        </button>
      </div>

      <ol>
        <li>
          <strong>Step 1:</strong> Click <em>"Use demo request"</em> or type your requirement in natural language.
        </li>
        <li>
          <strong>Step 2:</strong> Review the extracted parameters and click <em>"Confirm requirement"</em>.
        </li>
        <li>
          <strong>Step 3:</strong> Review the AI recommendation or open <em>"Compare all suppliers"</em>.
        </li>
        <li>
          <strong>Step 4:</strong> Click <em>"Proceed with purchase"</em> to issue <strong>PO-2026-00421</strong>.
        </li>
        <li>
          <strong>Step 5:</strong> Inspect the live email timeline (click <em>"View full message"</em>) and download the PO.
        </li>
        <li>
          <strong>Step 6:</strong> Click <em>"Simulate Next Update"</em> repeatedly to advance rail transit.
        </li>
        <li>
          <strong>Step 7:</strong> Watch the warehouse receiving check pass and inventory update +500 MT!
        </li>
      </ol>

      <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100">
        <button
          type="button"
          className="secondary-button full text-xs"
          onClick={() => {
            loadDemoScenario();
            setHelpModalOpen(false);
          }}
        >
          Seed Demo
        </button>
        <button
          type="button"
          className="primary-button full text-xs"
          onClick={() => {
            resetAll();
            setHelpModalOpen(false);
          }}
        >
          Reset Demo
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const { activeNav, isAuthenticated } = useProcurement();
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // If not authenticated, render the clean Sign In page
  if (!isAuthenticated) {
    return <SignInPage />;
  }

  return (
    <div className="app-shell">
      <AppSidebar onOpenProfile={() => setProfileModalOpen(true)} />
      <main className="main-area">
        <Topbar onOpenProfile={() => setProfileModalOpen(true)} />

        {activeNav === "AI Procurement" && <ProcurementPage />}
        {activeNav === "Orders" && <OrdersPage />}
        {activeNav === "Suppliers" && <SuppliersPage />}
        {activeNav === "Communications" && <CommunicationsPage />}
        {activeNav === "Inventory" && <InventoryPage />}

        <SupplierComparison />
        <EmailModal />
        <HelpPopover />
        <UserProfileModal
          isOpen={profileModalOpen}
          onClose={() => setProfileModalOpen(false)}
        />
      </main>
    </div>
  );
}
