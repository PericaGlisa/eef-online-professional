import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { CATALOG, fmtRSD, type Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/prodavnica")({
  head: () => ({
    meta: [
      { title: "Prodavnica — EEF Online Professional" },
      { name: "description", content: "Burrovi, analizatori, mlinske stanice i pribor — laboratorijski asortiman EEF Online Professional." },
      { property: "og:title", content: "Prodavnica — EEF Online Professional" },
    ],
    links: [{ rel: "canonical", href: "/prodavnica" }],
  }),
  component: ShopPage,
});

const CATEGORIES = ["Sve", "Burrovi", "Analizatori", "Mlinske stanice", "Pribor", "Servis"] as const;

function ShopPage() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("Sve");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return CATALOG.filter((p) => (cat === "Sve" || p.category === cat) &&
      (q === "" || p.name.toLowerCase().includes(q.toLowerCase()) || p.sku.toLowerCase().includes(q.toLowerCase())));
  }, [cat, q]);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Asortiman / Laboratorijska oprema"
        title="Instrumenti za one koji mere u mikronima."
        intro="Burrovi, analizatori, mlinske stanice i sertifikovan pribor. Svaka isporuka uključuje verifikacioni list iz naše optičke laboratorije."
      />

      <section className="border-b border-border bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-3 md:px-4 py-2 font-display text-[10px] md:text-[11px] uppercase tracking-widest border transition-colors ${
                  cat === c
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Pretraga po nazivu ili SKU…"
            className="bg-background border border-border px-3 md:px-4 py-2 font-sans text-sm focus:outline-none focus:border-primary w-full md:w-72"
          />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-16 md:py-24">Nema rezultata za zadatu pretragu.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => <Card key={p.sku} p={p} />)}
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-border bg-surface/40 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div>
            <div className="font-mono text-primary text-[10px] md:text-xs tracking-widest mb-2">[ NAPOMENA ]</div>
            <p className="text-muted-foreground text-sm max-w-2xl">
              Asortiman se ažurira iz interne baze. Za prilagođene konfiguracije ili veće količine pošaljite upit.
            </p>
          </div>
          <Link
            to="/contact"
            className="border border-border px-5 md:px-6 py-3 font-display text-[10px] md:text-xs uppercase tracking-widest hover:border-primary hover:text-accent transition-colors"
          >
            Pošalji B2B upit
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

function Card({ p }: { p: Product }) {
  const { add, setOpen } = useCart();
  return (
    <article className="group border border-border bg-background hover:border-primary/60 transition-colors flex flex-col">
      <Link to={`/proizvod/${p.sku}`} className="relative aspect-[4/3] overflow-hidden bg-surface">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 md:top-3 left-2 md:left-3 font-mono text-[10px] uppercase tracking-widest bg-background/80 backdrop-blur px-2 py-1 text-accent">
          {p.category}
        </div>
      </Link>
      <div className="p-4 md:p-5 flex-1 flex flex-col gap-3">
        <Link to={`/proizvod/${p.sku}`} className="flex justify-between items-start gap-3">
          <h3 className="font-display font-bold text-base leading-tight hover:text-primary transition-colors">{p.name}</h3>
          <div className="font-mono text-[10px] text-muted-foreground whitespace-nowrap">{p.sku}</div>
        </Link>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{p.blurb}</p>
        <div className="flex items-end justify-between pt-3 border-t border-border">
          <div>
            <div className="font-display font-black text-lg md:text-xl text-foreground">{fmtRSD(p.price)}</div>
            <div className="font-mono text-[10px] text-muted-foreground uppercase mt-0.5">
              {p.stock > 0 ? `Zaliha: ${p.stock}` : "Po porudžbini"}
            </div>
          </div>
          <button
            onClick={(e) => { e.preventDefault(); add(p.sku); setOpen(true); }}
            className="bg-foreground text-background font-display font-bold uppercase tracking-widest text-[10px] px-3 md:px-4 py-2 md:py-3 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            U korpu +
          </button>
        </div>
      </div>
    </article>
  );
}
