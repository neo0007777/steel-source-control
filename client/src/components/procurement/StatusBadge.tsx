import React from "react";

export type BadgeTone = "blue" | "green" | "amber" | "slate" | "purple";

export function StatusBadge({
  children,
  tone = "blue",
  className = "",
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span className={`status-pill status-${tone} ${className}`}>
      <span className="status-dot" />
      {children}
    </span>
  );
}
