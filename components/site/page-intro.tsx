import type { ReactNode } from 'react';
import Link from 'next/link';

type Props = { label: string; title: ReactNode; description: string; back?: { href: string; label: string }; children?: ReactNode };

export function PageIntro({ label, title, description, back = { href: '/', label: 'Home' }, children }: Props) {
  return <header className="page-intro">
    <div className="shell">
      <nav className="breadcrumb mono" aria-label="Breadcrumb"><ol><li><Link href={back.href}>{back.label}</Link></li><li aria-current="page">{label}</li></ol></nav>
      <div className="page-intro-grid"><h1>{title}</h1><p>{description}</p></div>
      {children}
    </div>
  </header>;
}
