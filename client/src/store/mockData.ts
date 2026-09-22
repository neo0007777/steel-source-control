export interface Supplier {
  id: string;
  name: string;
  short: string;
  location: string;
  price: number;
  landedPerMt: number;
  landed: number; // total for requirement quantity
  quantity: string;
  availableMt: number;
  eta: string;
  etaDays: number;
  onTime: string;
  quality: string;
  rating: number;
  contactEmail: string;
  contactPerson: string;
  originHub: string;
  originCode: string;
  recommended: boolean;
  accent: string;
  compliance: string;
  note: string;
  strengths: string[];
  weaknesses: string[];
}

export interface Requirement {
  material: string;
  grade: string;
  quantity: number;
  unit: string;
  thickness: string;
  dimensions: string;
  deliveryLocation: string;
  deliveryAddress: string;
  requiredByDays: number;
  requiredByDate: string;
  qualityStandard: string;
  status: "draft" | "parsed" | "confirmed";
}

export interface EmailEvent {
  id: string;
  time: string;
  date: string;
  title: string;
  subject: string;
  from: string;
  to: string;
  copy: string;
  fullBody: string;
  icon: "send" | "inbox" | "check" | "truck";
  tone: "blue" | "green" | "amber" | "slate";
  requiredShipmentStage?: number; // 0 = at purchase, 2 = at dispatch, 5 = at receiving
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  location: string;
  previousStock: number;
  currentStock: number;
  unit: string;
  capacity: number;
  unitCost: number;
  status: "Optimal" | "Healthy" | "Low Stock" | "Critical";
  isProcuredTarget: boolean;
  grn?: string;
  receivedAmount?: number;
}

export const INITIAL_REQUIREMENT: Requirement = {
  material: "IS 2062 E250 Steel Plate",
  grade: "IS 2062:2011 Grade E250 (Fe410W)",
  quantity: 500,
  unit: "MT",
  thickness: "10 mm",
  dimensions: "2000 mm × 6000 mm Mill Plates",
  deliveryLocation: "Delhi Central Warehouse",
  deliveryAddress: "Plot 14-16, Transport Nagar, Okhla Industrial Area Ph-1, New Delhi 110020",
  requiredByDays: 15,
  requiredByDate: "Oct 07, 2026",
  qualityStandard: "BIS 2062 Certified, Mill Test Certificate (EN 10204 3.1)",
  status: "draft",
};

export const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: "tata",
    name: "Tata Steel Distribution",
    short: "TS",
    location: "Jamshedpur, Jharkhand",
    price: 58400,
    landedPerMt: 58400,
    landed: 29200000,
    quantity: "500 MT",
    availableMt: 500,
    eta: "11 days",
    etaDays: 11,
    onTime: "96%",
    quality: "Verified BIS/ISO",
    rating: 4.9,
    contactEmail: "orders.industrial@tatasteel.com",
    contactPerson: "Rajesh Varma (Senior Key Accounts)",
    originHub: "Tata Jamshedpur Works Rail Siding",
    originCode: "JH",
    recommended: true,
    accent: "#2f6fed",
    compliance: "IS 2062:2011 E250BR fully compliant, MTC 3.1 provided with each coil batch",
    note: "Meets 100% quantity and delivery SLA with the lowest compliant landed cost.",
    strengths: [
      "Exact 500 MT stock immediately allocable at Jamshedpur hub",
      "11-day delivery leaves 4-day buffer before required deadline",
      "Tier-1 primary producer with flawless MTC 3.1 trace",
    ],
    weaknesses: [
      "Strict Net 30 payment milestones",
    ],
  },
  {
    id: "jsw",
    name: "JSW Steel Services",
    short: "JS",
    location: "Vijayanagar, Karnataka",
    price: 57900,
    landedPerMt: 58300,
    landed: 29150000,
    quantity: "460 MT",
    availableMt: 460,
    eta: "13 days",
    etaDays: 13,
    onTime: "93%",
    quality: "Verified BIS",
    rating: 4.7,
    contactEmail: "south.sales@jsw.in",
    contactPerson: "Kavita Rao (Logistics Coordinator)",
    originHub: "Toranagallu Rail Yard",
    originCode: "KA",
    recommended: false,
    accent: "#8c5cf6",
    compliance: "IS 2062:2011 Grade E250 compliant",
    note: "Best unit ex-mill price, but 40 MT short on immediately allocable stock.",
    strengths: [
      "Lowest base mill rate (₹57,900/MT)",
      "Good track record on heavy plate tolerance",
    ],
    weaknesses: [
      "Short 40 MT (only 460 MT on stock)",
      "Higher freight cost from South India adds ₹400/MT",
    ],
  },
  {
    id: "arcelor",
    name: "ArcelorMittal Nippon",
    short: "AM",
    location: "Hazira, Gujarat",
    price: 59100,
    landedPerMt: 59100,
    landed: 29550000,
    quantity: "650 MT",
    availableMt: 650,
    eta: "9 days",
    etaDays: 9,
    onTime: "91%",
    quality: "Verified Tier-1",
    rating: 4.8,
    contactEmail: "hazira.commercial@amns.in",
    contactPerson: "Devendra Mehta (Commercial Head)",
    originHub: "Hazira Port Logistics Park",
    originCode: "GJ",
    recommended: false,
    accent: "#f2994a",
    compliance: "IS 2062:2011 Grade E250 Fe410WA + Ultrasonic tested Class 1",
    note: "Fastest delivery (9 days), at a 1.2% premium over Tata recommendation.",
    strengths: [
      "Fastest 9-day transit via Western Dedicated Freight Corridor",
      "650 MT surplus capacity ready for immediate rake dispatch",
    ],
    weaknesses: [
      "₹700/MT price premium over recommendation",
      "Minimum order quantity penalty for split shipments",
    ],
  },
  {
    id: "sail",
    name: "SAIL Industrial Supply",
    short: "SI",
    location: "Bhilai, Chhattisgarh",
    price: 57400,
    landedPerMt: 57700,
    landed: 28850000,
    quantity: "500 MT",
    availableMt: 500,
    eta: "18 days",
    etaDays: 18,
    onTime: "88%",
    quality: "Verified PSU",
    rating: 4.5,
    contactEmail: "central.sales@sail.in",
    contactPerson: "Anil Saxena (Regional Sales Officer)",
    originHub: "Bhilai Steel Siding Yard 4",
    originCode: "CG",
    recommended: false,
    accent: "#22a78a",
    compliance: "IS 2062:2011 Grade E250 compliant",
    note: "Strong unit price, but misses required-by delivery deadline by 3 days.",
    strengths: [
      "Lowest overall landed cost (₹2.885 Cr)",
      "Standard PSU contract terms",
    ],
    weaknesses: [
      "18-day lead time breaches the 15-day maximum requirement",
      "Historically lower on-time delivery rate (88%)",
    ],
  },
  {
    id: "jindal",
    name: "Jindal Steel & Power",
    short: "JS",
    location: "Angul, Odisha",
    price: 58800,
    landedPerMt: 59000,
    landed: 29500000,
    quantity: "520 MT",
    availableMt: 520,
    eta: "14 days",
    etaDays: 14,
    onTime: "92%",
    quality: "Verified BIS",
    rating: 4.6,
    contactEmail: "industrial.plates@jindalsteel.com",
    contactPerson: "S. N. Mohanty (Commercial Manager)",
    originHub: "Angul Rail Head Facility",
    originCode: "OR",
    recommended: false,
    accent: "#0ea5e9",
    compliance: "IS 2062:2011 Grade E250 compliant",
    note: "Viable backup option; complies with quantity and 15-day requirement.",
    strengths: [
      "520 MT available with tight plate thickness tolerances",
      "Fits within 14-day SLA window",
    ],
    weaknesses: [
      "Higher transit variability from Odisha rail sidings",
      "Total landed cost is ₹300,000 higher than recommendation",
    ],
  },
];

export const SHIPMENT_STAGES = [
  "Purchase confirmed",
  "Supplier processing",
  "Dispatched",
  "In transit",
  "Arriving at warehouse",
  "Received",
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: "inv-1",
    sku: "STL-PLT-IS2062-10MM",
    name: "IS 2062 E250 Steel Plate",
    category: "Heavy Structural Plates",
    location: "Delhi Central Warehouse — Bay C-04",
    previousStock: 1240,
    currentStock: 1240,
    unit: "MT",
    capacity: 2000,
    unitCost: 58400,
    status: "Healthy",
    isProcuredTarget: true,
  },
  {
    id: "inv-2",
    sku: "STL-BEAM-ISMC-250",
    name: "ISMC 250 Structural Channels",
    category: "Long Products",
    location: "Delhi Central Warehouse — Yard B",
    previousStock: 820,
    currentStock: 820,
    unit: "MT",
    capacity: 1200,
    unitCost: 54200,
    status: "Optimal",
    isProcuredTarget: false,
  },
  {
    id: "inv-3",
    sku: "STL-COIL-HR-3MM",
    name: "Hot Rolled Coil 3.0mm (IS 10748)",
    category: "Flat Coils",
    location: "Delhi Central Warehouse — Bay A-01",
    previousStock: 410,
    currentStock: 410,
    unit: "MT",
    capacity: 1500,
    unitCost: 52600,
    status: "Low Stock",
    isProcuredTarget: false,
  },
  {
    id: "inv-4",
    sku: "STL-BAR-TMT-FE550D-16",
    name: "TMT Rebars Fe 550D 16mm",
    category: "Reinforcement Steel",
    location: "Delhi Central Warehouse — Yard D",
    previousStock: 1650,
    currentStock: 1650,
    unit: "MT",
    capacity: 2200,
    unitCost: 49800,
    status: "Optimal",
    isProcuredTarget: false,
  },
];

export function getEmailsForSupplier(supplier: Supplier, shipmentStage: number): EmailEvent[] {
  return [
    {
      id: "email-1",
      time: "10:42 AM",
      date: "Sep 22, 2026",
      title: "RFQ sent",
      subject: `RFQ — 500 MT IS 2062 E250 Steel Plates (Req ID: PR-2026-0917)`,
      from: "Source AI <agent@ardentmfg.com>",
      to: `${supplier.name} <${supplier.contactEmail}>`,
      copy: `Formal Request for Quotation for 500 MT IS 2062 E250 steel plates, 10mm thickness, delivery to Delhi Central Warehouse within 15 days.`,
      icon: "send",
      tone: "blue",
      requiredShipmentStage: 0,
      fullBody: `From: Source AI <agent@ardentmfg.com>
To: ${supplier.contactPerson} <${supplier.contactEmail}>
CC: Procurement Desk <procurement@ardentmfg.com>
Date: Tuesday, September 22, 2026, 10:42 AM IST
Subject: REQUEST FOR QUOTATION: 500 MT IS 2062 E250 Steel Plates (RFQ-2026-0842)

Dear ${supplier.contactPerson},

On behalf of Ardent Manufacturing India Pvt Ltd, our autonomous procurement system has generated this Request for Quotation for priority sourcing:

1. MATERIAL SPECIFICATION:
   - Commodity: Hot Rolled Structural Steel Plates
   - Grade: IS 2062:2011 Grade E250 (Fe410W)
   - Dimension: 10 mm thickness × 2000 mm × 6000 mm (Standard Mill Cut)
   - Quantity: 500 Metric Tonnes (MT)

2. DELIVERY & LOGISTICS:
   - Destination: Delhi Central Warehouse, Plot 14-16, Transport Nagar, Okhla Ph-1, New Delhi 110020
   - Required Delivery Window: Within 15 calendar days (no later than October 07, 2026)
   - Mode: Rail rake / Dedicated trailer convoy with transit insurance

3. COMPLIANCE & DOCUMENTATION:
   - Valid Bureau of Indian Standards (BIS) certification license
   - Mill Test Certificate (MTC) conforming to EN 10204 Type 3.1 with heat number correlation
   - Weighbridge slips upon gate inwarding

Please confirm stock allocation, ex-works unit price, freight quote to Delhi, and earliest dispatch schedule.

Sincerely,
Source AI Autonomous Procurement Engine
For Ardent Manufacturing India Pvt Ltd`,
    },
    {
      id: "email-2",
      time: "11:18 AM",
      date: "Sep 22, 2026",
      title: "Supplier response",
      subject: `RE: RFQ — 500 MT IS 2062 E250 Steel Plates — Quote & Stock Confirmation`,
      from: `${supplier.contactPerson} <${supplier.contactEmail}>`,
      to: "Source AI <agent@ardentmfg.com>",
      copy: `We can supply the requested quantity within ${supplier.eta}. Mill test certificates and rake allocation schedule attached.`,
      icon: "inbox",
      tone: "green",
      requiredShipmentStage: 0,
      fullBody: `From: ${supplier.contactPerson} <${supplier.contactEmail}>
To: Source AI Autonomous Procurement <agent@ardentmfg.com>
Date: Tuesday, September 22, 2026, 11:18 AM IST
Subject: RE: REQUEST FOR QUOTATION: 500 MT IS 2062 E250 Steel Plates (RFQ-2026-0842)

Dear Arjun & Source AI Team,

Thank you for your RFQ. We have reviewed our current rolling stock and mill yard inventories at ${supplier.originHub}.

We are pleased to submit our formal commercial commitment:

COMMERCIAL SUMMARY:
- Material: IS 2062:2011 Grade E250 Structural Steel Plates (10 mm)
- Allocated Stock: ${supplier.availableMt} MT immediately reserved under Hold ID #HOLD-8821
- Base Unit Price: ₹${supplier.price.toLocaleString("en-IN")} per MT
- Landed Total (incl. Freight & GST): ₹${supplier.landed.toLocaleString("en-IN")}
- Transit Time to Delhi Warehouse: ${supplier.eta} via primary freight corridor
- Heat Numbers: #H-90142 through #H-90168
- Compliance: Pre-tested BIS & ISO certified, MTC 3.1 digital package attached

We are ready to initiate coil decoiling, plate shearing, and rake booking upon receipt of your formal Purchase Order.

Warm regards,
${supplier.contactPerson}
Commercial Sales & Logistics
${supplier.name}`,
    },
    {
      id: "email-3",
      time: "12:03 PM",
      date: "Sep 22, 2026",
      title: "Purchase confirmation & PO",
      subject: `OFFICIAL PURCHASE ORDER: PO-2026-00421 — 500 MT IS 2062 E250`,
      from: "Source AI <agent@ardentmfg.com>",
      to: `${supplier.name} <${supplier.contactEmail}>`,
      copy: `Purchase Order PO-2026-00421 transmitted. Dispatch scheduled for Sep 28. Advance payment milestone initiated.`,
      icon: "check",
      tone: "blue",
      requiredShipmentStage: 0,
      fullBody: `From: Source AI <agent@ardentmfg.com>
To: ${supplier.contactPerson} <${supplier.contactEmail}>
CC: Accounts Payable <ap@ardentmfg.com>, Logistics Desk <logistics@ardentmfg.com>
Date: Tuesday, September 22, 2026, 12:03 PM IST
Subject: OFFICIAL PURCHASE ORDER: PO-2026-00421 — 500 MT IS 2062 E250 Steel Plates

Dear ${supplier.contactPerson},

Ardent Manufacturing has approved your commercial offer. Attached please find our official Purchase Order PO-2026-00421.

PURCHASE ORDER PARTICULARS:
- PO Number: PO-2026-00421
- Vendor: ${supplier.name} (${supplier.location})
- Order Value: ₹${supplier.landed.toLocaleString("en-IN")}
- Line Item: 500 MT — IS 2062 E250 Steel Plates (10 mm × 2000 mm × 6000 mm)
- Agreed Dispatch Date: September 28, 2026
- Destination: Delhi Central Warehouse
- Consignee Contact: Ramesh Chawla (Warehouse Supervisor, +91-11-2681-9900)

Our ERP has locked in the transaction. Please acknowledge receipt and confirm rake assignment once dispatch loading commences.

Best regards,
Source AI Autonomous Procurement Engine
Ardent Manufacturing India Pvt Ltd`,
    },
    {
      id: "email-4",
      time: "08:15 AM",
      date: "Sep 28, 2026",
      title: "Dispatch & Consignment Notice",
      subject: `CONSIGNMENT DISPATCHED: Rake ID #SSX-902184 En Route to Delhi`,
      from: `${supplier.contactPerson} <${supplier.contactEmail}>`,
      to: "Source AI <agent@ardentmfg.com>",
      copy: shipmentStage >= 2
        ? `Consignment dispatched from ${supplier.location}. Tracking ID SSX-902184 is active. ETA Oct 02.`
        : `Consignment loading underway. Tracking details will generate upon railway rake departure.`,
      icon: "truck",
      tone: shipmentStage >= 2 ? "green" : "slate",
      requiredShipmentStage: 2,
      fullBody: `From: ${supplier.contactPerson} <${supplier.contactEmail}>
To: Source AI Autonomous Procurement <agent@ardentmfg.com>
Date: Monday, September 28, 2026, 08:15 AM IST
Subject: CONSIGNMENT DISPATCHED: Rake ID #SSX-902184 En Route to Delhi

Dear Source AI Team & Arjun,

We are pleased to inform you that your 500 MT consignment of IS 2062 E250 steel plates has cleared quality sign-off and has been dispatched from ${supplier.originHub}.

LOGISTICS & DISPATCH SUMMARY:
- Shipment Consignment Note: SSX-902184
- Carrier: Dedicated Freight Corridor Heavy Rail Rake #CR-4402
- Net Weighbridge Weight: 500.18 Metric Tonnes
- Mill Test Certificate: MTC-TS-2026-0922-8871 (attached)
- Origin Terminal: ${supplier.originHub} (${supplier.originCode})
- Destination Siding: Tughlakabad ICD / Delhi Central Warehouse Terminal
- Expected Time of Arrival (ETA): October 02, 2026 (11:00 AM IST)

GPS transponder telematics have been interfaced with your procurement portal for real-time corridor monitoring.

Best regards,
Dispatch Control Center
${supplier.name}`,
    },
  ];
}
