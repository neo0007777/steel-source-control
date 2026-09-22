import React from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  meta?: string;
  action?: React.ReactNode;
}

export function SectionHeading({ eyebrow, title, meta, action }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <div className="section-title-row">
          <h2>{title}</h2>
          {meta && <span className="section-meta">{meta}</span>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
