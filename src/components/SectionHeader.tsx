import { ReactNode } from 'react';

/**
 * Section header — mirrors the v12 `.section-header` markup.
 * `icon` is inline SVG markup passed as JSX children.
 */
export default function SectionHeader({
  icon,
  label,
  title,
  subtitle,
}: {
  icon: ReactNode;
  label: string;
  title: ReactNode;
  subtitle: string;
}) {
  return (
    <div className="section-header reveal-3d">
      <div className="section-label">
        {icon}
        {label}
      </div>
      <h2 className="section-title">{title}</h2>
      <p className="section-subtitle">{subtitle}</p>
    </div>
  );
}
