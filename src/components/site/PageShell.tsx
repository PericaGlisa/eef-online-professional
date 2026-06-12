import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground font-display">
      <Header />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="border-b border-border">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="font-mono text-primary text-xs mb-6 tracking-widest uppercase">
          [ {eyebrow} ]
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] text-balance max-w-4xl animate-reveal">
          {title}
        </h1>
        {intro && (
          <p className="mt-8 max-w-xl text-muted-foreground leading-relaxed text-pretty">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}

export function SpecRow({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <dl className="grid grid-cols-2 md:grid-cols-4 border-y border-border divide-x divide-border">
      {items.map((it) => (
        <div key={it.label} className="p-6">
          <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {it.label}
          </dt>
          <dd className="mt-2 font-mono text-xl text-foreground">{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}
