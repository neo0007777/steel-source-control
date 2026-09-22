import React, { createContext, useContext, useMemo, useState, useCallback } from "react";
import { toast } from "sonner";
import {
  EmailEvent,
  getEmailsForSupplier,
  INITIAL_INVENTORY,
  INITIAL_REQUIREMENT,
  INITIAL_SUPPLIERS,
  InventoryItem,
  Requirement,
  SHIPMENT_STAGES,
  Supplier,
} from "./mockData";

export interface User {
  name: string;
  email: string;
  role: string;
  company: string;
  initials: string;
}

export const DEFAULT_USER: User = {
  name: "Arjun Kapoor",
  email: "arjun.kapoor@ardentmfg.com",
  role: "Head of Procurement",
  company: "Ardent Manufacturing",
  initials: "AK",
};

export function computeInitials(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "U";
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export interface ProcurementContextType {
  // Authentication
  user: User | null;
  isAuthenticated: boolean;
  signIn: (userData: { name: string; email?: string; company?: string; role?: string }) => void;
  signOut: () => void;

  // Navigation
  activeNav: string;
  setActiveNav: (nav: string) => void;
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
  helpModalOpen: boolean;
  setHelpModalOpen: (open: boolean) => void;

  // Requirement & Chat
  userMessage: string;
  setUserMessage: (msg: string) => void;
  requirement: Requirement;
  requirementConfirmed: boolean;
  confirmRequirement: () => void;
  editRequirement: () => void;
  submitChatMessage: (msg: string) => void;

  // Suppliers & Selection
  suppliers: Supplier[];
  selectedSupplierId: string;
  selectedSupplier: Supplier;
  selectSupplier: (id: string) => void;
  comparisonOpen: boolean;
  setComparisonOpen: (open: boolean) => void;

  // Purchase & PO
  purchased: boolean;
  proceedWithPurchase: () => void;
  downloadPo: () => void;

  // Communications & Emails
  emails: EmailEvent[];
  activeModalEmail: EmailEvent | null;
  openEmailModal: (email: EmailEvent) => void;
  closeEmailModal: () => void;

  // Shipment & Tracking
  shipmentStage: number;
  shipmentStageName: string;
  advanceShipment: () => void;
  received: boolean;

  // Inventory & Warehouse Receiving
  inventory: InventoryItem[];
  targetInventoryItem: InventoryItem;

  // Actions
  resetAll: () => void;
  loadDemoScenario: () => void;
}

const ProcurementContext = createContext<ProcurementContextType | null>(null);

export function ProcurementProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(DEFAULT_USER);
  const isAuthenticated = Boolean(user);

  const [activeNav, setActiveNav] = useState("AI Procurement");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  const signIn = useCallback(
    (userData: { name: string; email?: string; company?: string; role?: string }) => {
      const trimmedName = userData.name.trim() || "Arjun Kapoor";
      const newUser: User = {
        name: trimmedName,
        email:
          userData.email?.trim() ||
          `${trimmedName.toLowerCase().replace(/\s+/g, ".")}@ardentmfg.com`,
        role: userData.role?.trim() || "Head of Procurement",
        company: userData.company?.trim() || "Ardent Manufacturing",
        initials: computeInitials(trimmedName),
      };
      setUser(newUser);
      toast.success(`Welcome, ${trimmedName}!`, {
        description: "Authenticated to SteelSource AI workspace.",
      });
    },
    []
  );

  const signOut = useCallback(() => {
    setUser(null);
    toast.info("Signed out", {
      description: "You have signed out of the procurement session.",
    });
  }, []);

  const [userMessage, setUserMessage] = useState("");
  const [requirement, setRequirement] = useState<Requirement>(INITIAL_REQUIREMENT);
  const [requirementConfirmed, setRequirementConfirmed] = useState(false);

  const [suppliers] = useState<Supplier[]>(INITIAL_SUPPLIERS);
  const [selectedSupplierId, setSelectedSupplierId] = useState("tata");
  const [comparisonOpen, setComparisonOpen] = useState(false);

  const [purchased, setPurchased] = useState(false);
  const [shipmentStage, setShipmentStage] = useState(0);

  const [activeModalEmail, setActiveModalEmail] = useState<EmailEvent | null>(null);

  const selectedSupplier = useMemo(() => {
    return suppliers.find((s) => s.id === selectedSupplierId) ?? suppliers[0];
  }, [suppliers, selectedSupplierId]);

  const received = purchased && shipmentStage >= SHIPMENT_STAGES.length - 1;

  const emails = useMemo(() => {
    return getEmailsForSupplier(selectedSupplier, shipmentStage);
  }, [selectedSupplier, shipmentStage]);

  const inventory = useMemo<InventoryItem[]>(() => {
    return INITIAL_INVENTORY.map((item) => {
      if (item.isProcuredTarget) {
        return {
          ...item,
          currentStock: received ? item.previousStock + 500 : item.previousStock,
          status: received ? "Optimal" : "Healthy",
          grn: received ? "GRN-2026-00187" : undefined,
          receivedAmount: received ? 500 : undefined,
        };
      }
      return item;
    });
  }, [received]);

  const targetInventoryItem = useMemo(() => {
    return inventory.find((i) => i.isProcuredTarget) ?? inventory[0];
  }, [inventory]);

  const submitChatMessage = useCallback((msg: string) => {
    setUserMessage(msg);
    setRequirement((prev) => ({ ...prev, status: "parsed" }));
    toast.success("Requirement extracted by Source AI", {
      description: "500 MT of IS 2062 E250 Steel Plates mapped to Delhi Warehouse.",
    });
  }, []);

  const confirmRequirement = useCallback(() => {
    setRequirementConfirmed(true);
    setRequirement((prev) => ({ ...prev, status: "confirmed" }));
    toast.success("Requirement confirmed", {
      description: "Source AI is evaluating 5 qualified mill suppliers.",
    });
    setTimeout(() => {
      const el = document.getElementById("recommendation");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, []);

  const editRequirement = useCallback(() => {
    setRequirementConfirmed(false);
    setRequirement((prev) => ({ ...prev, status: "parsed" }));
    setTimeout(() => {
      const el = document.getElementById("chat");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, []);

  const selectSupplier = useCallback((id: string) => {
    setSelectedSupplierId(id);
    setComparisonOpen(false);
    const supp = suppliers.find((s) => s.id === id);
    toast.success(`Selected ${supp?.name || "Supplier"}`, {
      description: "Purchase order parameters and dispatch timeline updated.",
    });
    setTimeout(() => {
      const el = document.getElementById("purchase");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, [suppliers]);

  const proceedWithPurchase = useCallback(() => {
    setPurchased(true);
    setShipmentStage(0);
    toast.success("Purchase Request Transmitted", {
      description: `Official PO-2026-00421 issued to ${selectedSupplier.name}. Follow-up active.`,
    });
    setTimeout(() => {
      const el = document.getElementById("operations");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, [selectedSupplier]);

  const advanceShipment = useCallback(() => {
    setShipmentStage((prev) => {
      const next = Math.min(prev + 1, SHIPMENT_STAGES.length - 1);
      const stageName = SHIPMENT_STAGES[next];
      if (next === SHIPMENT_STAGES.length - 1) {
        toast.success("Shipment Received at Delhi Warehouse", {
          description: "GRN-2026-00187 generated. Quality inspection passed. Inventory updated +500 MT.",
        });
        setTimeout(() => {
          const el = document.getElementById("inventory");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      } else {
        toast.info(`Shipment update: ${stageName}`, {
          description: `Consignment SSX-902184 from ${selectedSupplier.name} advanced.`,
        });
      }
      return next;
    });
  }, [selectedSupplier]);

  const openEmailModal = useCallback((email: EmailEvent) => {
    setActiveModalEmail(email);
  }, []);

  const closeEmailModal = useCallback(() => {
    setActiveModalEmail(null);
  }, []);

  const downloadPo = useCallback(() => {
    const poContent = `================================================================================
ARDENT MANUFACTURING INDIA PVT. LTD.
OFFICIAL PURCHASE ORDER
================================================================================
PO Number:         PO-2026-00421
Date of Issue:     September 22, 2026
Payment Terms:     Net 30 Days from MRIR Acceptance
Delivery Siding:   Delhi Central Warehouse, Plot 14-16, Transport Nagar, Okhla Ph-1

VENDOR DETAILS:
--------------------------------------------------------------------------------
Vendor Name:       ${selectedSupplier.name}
Works Location:    ${selectedSupplier.location}
Origin Yard:       ${selectedSupplier.originHub}
Key Contact:       ${selectedSupplier.contactPerson} (${selectedSupplier.contactEmail})
Vendor Rating:     ${selectedSupplier.rating} / 5.0 (Reliability: ${selectedSupplier.onTime})

LINE ITEM SPECIFICATIONS:
--------------------------------------------------------------------------------
Item No:           001
Commodity:         Hot Rolled Structural Steel Plates
Grade Standard:    IS 2062:2011 Grade E250 (Fe410W)
Dimensions:        10 mm Thickness x 2000 mm Width x 6000 mm Length
Ordered Quantity:  500.00 Metric Tonnes (MT)
Unit Rate:         INR ${selectedSupplier.price.toLocaleString("en-IN")} per MT
Total Landed Amt:  INR ${selectedSupplier.landed.toLocaleString("en-IN")} (Incl. Rail Freight & GST)

DELIVERY SCHEDULE & LOGISTICS:
--------------------------------------------------------------------------------
Dispatch Window:   Within ${selectedSupplier.eta} (Estimated Dispatch: Sep 28, 2026)
Consignment Siding:Tughlakabad ICD / Delhi Central Warehouse
Required Testing:  BIS Mark, Ultrasonic Test Class 1, Heat-wise MTC 3.1 EN 10204

AUTHORIZED SIGNATORY:
--------------------------------------------------------------------------------
Authorized by:     ${user ? `${user.name} (${user.role}, ${user.company})` : "Source AI Autonomous Procurement Engine"}
System Signature:  SHA256: 4f8b9e02c519a773bc2190ef0021ba0928cd9a
Timestamp:         2026-09-22T12:03:00+05:30
================================================================================
`;

    const blob = new Blob([poContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `PO-2026-00421_${selectedSupplier.id.toUpperCase()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("Purchase Order Downloaded", {
      description: `Saved PO-2026-00421_${selectedSupplier.id.toUpperCase()}.txt`,
    });
  }, [selectedSupplier, user]);

  const resetAll = useCallback(() => {
    setActiveNav("AI Procurement");
    setUserMessage("");
    setRequirement(INITIAL_REQUIREMENT);
    setRequirementConfirmed(false);
    setSelectedSupplierId("tata");
    setComparisonOpen(false);
    setPurchased(false);
    setShipmentStage(0);
    setActiveModalEmail(null);
    toast.success("Demo reset complete", {
      description: "Ready to run through the full procurement lifecycle.",
    });
  }, []);

  const loadDemoScenario = useCallback(() => {
    setActiveNav("AI Procurement");
    setUserMessage(
      "I need 500 MT of IS 2062 E250 steel plates, 10mm thickness, delivered to our Delhi warehouse within 15 days."
    );
    setRequirement({
      ...INITIAL_REQUIREMENT,
      status: "parsed",
    });
    setRequirementConfirmed(false);
    setSelectedSupplierId("tata");
    setComparisonOpen(false);
    setPurchased(false);
    setShipmentStage(0);
    setActiveModalEmail(null);
    toast.success("Demo scenario loaded", {
      description: "Prompt seeded. Review the structured requirement and confirm to source.",
    });
  }, []);

  const value: ProcurementContextType = {
    user,
    isAuthenticated,
    signIn,
    signOut,
    activeNav,
    setActiveNav,
    mobileNavOpen,
    setMobileNavOpen,
    helpModalOpen,
    setHelpModalOpen,
    userMessage,
    setUserMessage,
    requirement,
    requirementConfirmed,
    confirmRequirement,
    editRequirement,
    submitChatMessage,
    suppliers,
    selectedSupplierId,
    selectedSupplier,
    selectSupplier,
    comparisonOpen,
    setComparisonOpen,
    purchased,
    proceedWithPurchase,
    downloadPo,
    emails,
    activeModalEmail,
    openEmailModal,
    closeEmailModal,
    shipmentStage,
    shipmentStageName: SHIPMENT_STAGES[shipmentStage],
    advanceShipment,
    received,
    inventory,
    targetInventoryItem,
    resetAll,
    loadDemoScenario,
  };

  return (
    <ProcurementContext.Provider value={value}>
      {children}
    </ProcurementContext.Provider>
  );
}

export function useProcurement() {
  const context = useContext(ProcurementContext);
  if (!context) {
    throw new Error("useProcurement must be used within a ProcurementProvider");
  }
  return context;
}
