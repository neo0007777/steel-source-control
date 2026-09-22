import React, { useState } from "react";
import {
  ArrowRight,
  Bot,
  Building2,
  CheckCircle2,
  KeyRound,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  UserCheck,
  UserRound,
} from "lucide-react";
import { useProcurement } from "@/store/procurement";

const DEMO_PERSONAS = [
  {
    name: "Arjun Kapoor",
    role: "Head of Procurement",
    company: "Ardent Manufacturing",
    email: "arjun.kapoor@ardentmfg.com",
    initials: "AK",
    color: "#f3d5cc",
    textColor: "#8b493d",
  },
  {
    name: "Priya Sharma",
    role: "Director of Sourcing",
    company: "Tata Projects SCM",
    email: "priya.sharma@tataprojects.com",
    initials: "PS",
    color: "#dce8ff",
    textColor: "#245bc8",
  },
  {
    name: "Rajesh Verma",
    role: "VP of Supply Chain",
    company: "Bharat Heavy Structures",
    email: "r.verma@bharatstructures.in",
    initials: "RV",
    color: "#d8f3e5",
    textColor: "#1b7548",
  },
];

export function SignInPage() {
  const { signIn } = useProcurement();

  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    signIn({
      name: fullName.trim(),
      email: workEmail.trim() || undefined,
      company: companyName.trim() || undefined,
      role: role.trim() || undefined,
    });
  };

  const handleSelectPersona = (p: typeof DEMO_PERSONAS[0]) => {
    signIn({
      name: p.name,
      email: p.email,
      company: p.company,
      role: p.role,
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex flex-col justify-center items-center p-4 sm:p-6 text-slate-800">
      {/* Brand Header */}
      <div className="flex flex-col items-center mb-8 text-center animate-in fade-in duration-300">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="brand-mark">
            <span />
            <span />
            <span />
          </div>
          <span className="font-['Manrope'] font-extrabold text-xl tracking-tight text-[#203451]">
            SteelSource AI
          </span>
        </div>
        <p className="text-xs text-slate-500 font-medium">
          Autonomous Steel Procurement & Supply Chain Platform
        </p>
      </div>

      {/* Auth Card */}
      <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-200/50 p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Sign In to Workspace
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Enter your name to personalize the AI procurement experience.
          </p>
        </div>

        {/* Custom User Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase font-mono tracking-wider mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <UserRound size={15} />
              </div>
              <input
                type="text"
                required
                placeholder="e.g. Arjun Kapoor or your name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase font-mono tracking-wider mb-1.5">
              Work Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail size={15} />
              </div>
              <input
                type="email"
                placeholder="e.g. name@company.com"
                value={workEmail}
                onChange={(e) => setWorkEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 uppercase font-mono tracking-wider mb-1.5">
                Company
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                  <Building2 size={13} />
                </div>
                <input
                  type="text"
                  placeholder="Ardent Mfg"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full pl-8 pr-2.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 uppercase font-mono tracking-wider mb-1.5">
                Role
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound size={13} />
                </div>
                <input
                  type="text"
                  placeholder="Procurement Head"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full pl-8 pr-2.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!fullName.trim()}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-2"
          >
            <span>Sign In to Workspace</span>
            <ArrowRight size={14} />
          </button>
        </form>

        {/* Persona quick select */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="text-[11px] font-semibold text-slate-500 uppercase font-mono tracking-wider mb-2.5 flex items-center gap-1.5">
            <Sparkles size={12} className="text-blue-500" />
            <span>Or Quick-Sign In as Demo Persona:</span>
          </div>

          <div className="space-y-2">
            {DEMO_PERSONAS.map((persona) => (
              <button
                key={persona.name}
                type="button"
                onClick={() => handleSelectPersona(persona)}
                className="w-full p-2.5 rounded-lg border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/40 transition-all text-left flex items-center gap-3 group cursor-pointer"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0"
                  style={{ background: persona.color, color: persona.textColor }}
                >
                  {persona.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-xs text-slate-800 group-hover:text-blue-600 truncate">
                    {persona.name}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {persona.role} · {persona.company}
                  </div>
                </div>
                <ArrowRight
                  size={14}
                  className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Security Footnote */}
      <div className="mt-6 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
        <ShieldCheck size={14} className="text-emerald-600" />
        <span>In-Memory Client Session · Name will propagate to all POs & Communications</span>
      </div>
    </div>
  );
}
