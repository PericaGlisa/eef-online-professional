import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { CATALOG, fmtRSD, type Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { SlidersHorizontal, X } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

export const Route = createFileRoute("/prodavnica")({
  head: () => ({
    meta: [
      { title: "Prodavnica — EEF Online Professional" },
      {
        name: "description",
        content:
          "Profesionalna oprema, rezervni delovi, noževi mlinova i pribor za espreso aparate i ugostiteljstvo — EEF Online Professional.",
      },
      { property: "og:title", content: "Prodavnica — EEF Online Professional" },
    ],
    links: [{ rel: "canonical", href: "/prodavnica" }],
  }),
  component: ShopPage,
});

const CATEGORIES = [
  "Sve",
  "Burrovi",
  "Analizatori",
  "Mlinske stanice",
  "Pribor",
  "Servis",
] as const;
const SORT_OPTIONS = [
  { value: "default", label: "Podrazumevano" },
  { value: "price-asc", label: "Cena: od najniže" },
  { value: "price-desc", label: "Cena: od najviše" },
  { value: "name-asc", label: "Naziv: A–Z" },
  { value: "name-desc", label: "Naziv: Z–A" },
] as const;
type SortValue = (typeof SORT_OPTIONS)[number]["value"];

function ShopPage() {
  useReveal();
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("Sve");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortValue>("default");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [onlyStock, setOnlyStock] = useState(false);

  useEffect(() => {
    if (!isFilterDrawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsFilterDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isFilterDrawerOpen]);

  const filtered = useMemo(() => {
    let list = CATALOG.filter((p) => {
      if (cat !== "Sve" && p.category !== cat) return false;
      if (
        q &&
        !p.name.toLowerCase().includes(q.toLowerCase()) &&
        !p.sku.toLowerCase().includes(q.toLowerCase())
      )
        return false;
      if (onlyStock && p.stock <= 0) return false;
      if (minPrice && p.price < Number(minPrice)) return false;
      if (maxPrice && p.price > Number(maxPrice)) return false;
      return true;
    });
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        list = [...list].sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
    return list;
  }, [cat, q, sort, minPrice, maxPrice, onlyStock]);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Asortiman / Rezervni delovi i oprema"
        title="Profesionalni delovi i barista oprema."
        intro="Vrhunski noževi za mlinove, delovi za espreso aparate, filtracija vode i oprema za ugostiteljstvo proverenog kvaliteta."
      />

      <section className="border-b border-border bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
          {/* Mobile Filter Trigger */}
          <div className="md:hidden flex items-center justify-between">
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="flex items-center gap-2 border border-border px-4 py-2.5 font-display text-[10px] uppercase tracking-widest hover:border-primary transition-colors text-foreground bg-background"
            >
              <SlidersHorizontal className="h-3 w-3 text-primary" /> Filteri i sortiranje
            </button>
            <span className="font-mono text-[10px] text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "proizvod" : "proizvoda"}
            </span>
          </div>

          {/* Desktop Filters */}
          <div className="hidden md:flex flex-col gap-4">
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

            <div className="flex flex-wrap gap-3 items-center">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Pretraga po nazivu ili SKU…"
                className="bg-background border border-border px-3 md:px-4 py-2 font-sans text-sm focus:outline-none focus:border-primary w-full md:w-60"
              />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortValue)}
                className="bg-background border border-border px-3 py-2 font-display text-[11px] uppercase tracking-widest focus:outline-none focus:border-primary cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => (
                  <option
                    key={o.value}
                    value={o.value}
                    className="normal-case tracking-normal text-sm"
                  >
                    {o.label}
                  </option>
                ))}
              </select>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Min RSD"
                  className="bg-background border border-border px-3 py-2 font-sans text-sm focus:outline-none focus:border-primary w-28"
                />
                <span className="text-muted-foreground text-xs">—</span>
                <input
                  type="number"
                  min={0}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Max RSD"
                  className="bg-background border border-border px-3 py-2 font-sans text-sm focus:outline-none focus:border-primary w-28"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyStock}
                  onChange={(e) => setOnlyStock(e.target.checked)}
                  className="accent-primary w-4 h-4"
                />
                <span className="font-display text-[11px] uppercase tracking-widest text-muted-foreground">
                  Samo dostupno
                </span>
              </label>
              <span className="font-mono text-[10px] text-muted-foreground ml-auto">
                {filtered.length} {filtered.length === 1 ? "proizvod" : "proizvoda"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filter Overlay & Drawer */}
      <div
        onClick={() => setIsFilterDrawerOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm transition-opacity md:hidden ${
          isFilterDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />
      <aside
        className={`fixed bottom-0 left-0 right-0 z-[70] max-h-[85vh] overflow-y-auto bg-background border-t border-border rounded-t-2xl px-6 py-8 shadow-2xl flex flex-col gap-6 transition-transform duration-300 md:hidden ${
          isFilterDrawerOpen ? "translate-y-0" : "translate-y-full"
        }`}
        role="dialog"
        aria-label="Filteri i sortiranje"
      >
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h3 className="font-display font-bold uppercase tracking-widest text-sm flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-primary" /> Filteri i sortiranje
          </h3>
          <button
            onClick={() => setIsFilterDrawerOpen(false)}
            className="p-1 hover:text-primary transition-colors text-muted-foreground"
            aria-label="Zatvori"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Pretraga */}
        <div className="space-y-2">
          <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block">
            Pretraga
          </label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Pretraži po nazivu ili SKU…"
            className="w-full bg-surface border border-border px-4 py-3 font-sans text-sm focus:outline-none focus:border-primary text-foreground"
          />
        </div>

        {/* Kategorije */}
        <div className="space-y-2">
          <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block">
            Kategorije
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-3 py-2 font-display text-[10px] uppercase tracking-widest border transition-colors ${
                  cat === c
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Sortiranje */}
        <div className="space-y-2">
          <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block">
            Sortiranje
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortValue)}
            className="w-full bg-surface border border-border px-4 py-3 font-display text-[11px] uppercase tracking-widest focus:outline-none focus:border-primary cursor-pointer text-foreground"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} className="normal-case tracking-normal text-sm">
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {/* Cenovni rang */}
        <div className="space-y-2">
          <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block">
            Cenovni rang (RSD)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min={0}
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Min RSD"
              className="w-full bg-surface border border-border px-4 py-3 font-sans text-sm focus:outline-none focus:border-primary text-foreground"
            />
            <span className="text-muted-foreground text-xs">—</span>
            <input
              type="number"
              min={0}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max RSD"
              className="w-full bg-surface border border-border px-4 py-3 font-sans text-sm focus:outline-none focus:border-primary text-foreground"
            />
          </div>
        </div>

        {/* Zalihe */}
        <div className="py-2 border-y border-border/50">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyStock}
              onChange={(e) => setOnlyStock(e.target.checked)}
              className="accent-primary w-5 h-5"
            />
            <span className="font-display text-[11px] uppercase tracking-widest text-card-foreground">
              Samo dostupno na lageru
            </span>
          </label>
        </div>

        <button
          onClick={() => setIsFilterDrawerOpen(false)}
          className="w-full bg-primary text-primary-foreground font-display font-bold uppercase tracking-widest text-xs py-4 hover:bg-accent hover:text-accent-foreground transition-all mt-2 cursor-pointer"
        >
          Prikaži rezultate ({filtered.length})
        </button>
      </aside>

      <section className="py-12 md:py-16 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-16 md:py-24">
              Nema rezultata za zadatu pretragu.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <Card key={p.sku} p={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-border bg-surface/40 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div>
            <div className="font-mono text-primary text-[10px] md:text-xs tracking-widest mb-2">
              [ NAPOMENA ]
            </div>
            <p className="text-muted-foreground text-sm max-w-2xl">
              Asortiman se ažurira iz interne baze. Za prilagođene konfiguracije ili veće količine
              pošaljite upit.
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

const ALT_IMAGES: Record<string, string | undefined> = (() => {
  const skus = CATALOG.map((p) => p.sku);
  const imgs = CATALOG.map((p) => p.image);
  return Object.fromEntries(skus.map((sku, i) => [sku, imgs[(i + 1) % imgs.length]]));
})();

function Card({ p }: { p: Product }) {
  const { add, setOpen } = useCart();
  const [hovered, setHovered] = useState(false);
  const altImg = ALT_IMAGES[p.sku];

  return (
    <article
      className="group border border-border bg-background hover:border-primary/60 transition-colors flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/proizvod/${p.sku}`} className="relative aspect-[4/3] overflow-hidden bg-surface">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${hovered && altImg ? "opacity-0 scale-105" : "opacity-100 scale-100"}`}
        />
        {altImg && (
          <img
            src={altImg}
            alt=""
            loading="lazy"
            aria-hidden
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
          />
        )}
        <div className="absolute top-2 md:top-3 left-2 md:left-3 font-mono text-[10px] uppercase tracking-widest bg-background/80 backdrop-blur px-2 py-1 text-accent z-10">
          {p.category}
        </div>
        {p.stock === 0 && (
          <div className="absolute top-2 md:top-3 right-2 md:right-3 font-mono text-[10px] uppercase tracking-widest bg-muted/90 backdrop-blur px-2 py-1 text-muted-foreground z-10">
            Po narudžbi
          </div>
        )}
      </Link>
      <div className="p-4 md:p-5 flex-1 flex flex-col gap-3">
        <Link to={`/proizvod/${p.sku}`} className="flex justify-between items-start gap-3">
          <h3 className="font-display font-bold text-base leading-tight hover:text-primary transition-colors">
            {p.name}
          </h3>
          <div className="font-mono text-[10px] text-muted-foreground whitespace-nowrap">
            {p.sku}
          </div>
        </Link>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{p.blurb}</p>
        <div className="flex items-end justify-between pt-3 border-t border-border">
          <div>
            <div className="font-display font-black text-lg md:text-xl text-foreground">
              {fmtRSD(p.price)}
            </div>
            <div className="font-mono text-[10px] text-muted-foreground uppercase mt-0.5">
              {p.stock > 0 ? `Zaliha: ${p.stock}` : "Po porudžbini"}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              add(p.sku);
              setOpen(true);
            }}
            className="bg-foreground text-background font-display font-bold uppercase tracking-widest text-[10px] px-3 md:px-4 py-2 md:py-3 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            U korpu +
          </button>
        </div>
      </div>
    </article>
  );
}
