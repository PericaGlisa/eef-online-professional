import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { CATALOG, fmtRSD, type Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/proizvod/$sku")({
  component: ProductPage,
  head: ({ params }) => {
    const product = CATALOG.find((p) => p.sku === params.sku);
    return {
      meta: product
        ? [
            { title: `${product.name} — EEF Online Professional` },
            { name: "description", content: product.blurb },
          ]
        : [
            { title: "Proizvod nije pronađen — EEF Online Professional" },
            { name: "robots", content: "noindex" },
          ],
      links: [{ rel: "canonical", href: `/proizvod/${params.sku}` }],
    };
  },
  beforeLoad: ({ params }) => {
    const product = CATALOG.find((p) => p.sku === params.sku);
    if (!product) throw notFound();
  },
});

const TABS = ["Opis", "Specifikacija", "Održavanje"] as const;
type Tab = (typeof TABS)[number];

// Spec content per product category
function getSpecs(p: Product): { label: string; value: string }[] {
  const common = [
    { label: "SKU", value: p.sku },
    { label: "Kategorija", value: p.category },
    { label: "Zaliha", value: p.stock > 0 ? `${p.stock} kom.` : "Po porudžbini" },
    { label: "Cena", value: fmtRSD(p.price) },
  ];
  const extra: { label: string; value: string }[] =
    {
      Burrovi: [
        { label: "Materijal", value: "Kaljeni čelik (Rockwell 62–65 HRC)" },
        { label: "Kompatibilnost", value: "Mazzer, Anfim, Mythos" },
      ],
      Analizatori: [
        { label: "Senzor", value: "SONY IMX-500 multispektar" },
        { label: "Interfejs", value: "USB-C / Wi-Fi 6" },
      ],
      "Mlinske stanice": [
        { label: "Materijal kućišta", value: "7075-T6 CNC aluminijum" },
        { label: "Masa", value: "≈ 4,2 kg" },
      ],
      Pribor: [
        { label: "Prečnik", value: "58 / 58.5 mm" },
        { label: "Materijal", value: "Nerđajući čelik / Aluminijum" },
      ],
      Servis: [
        { label: "Metoda", value: "CNC precizno oštrenje" },
        { label: "Rok isporuke", value: "3–5 radnih dana" },
      ],
    }[p.category] ?? [];
  return [...common, ...extra];
}

function getMaintenance(p: Product): string {
  const map: Record<Product["category"], string> = {
    Burrovi:
      "Nakon svakih 200 kg mlevene kafe preporučujemo proveru hrapavosti sečiva. Čišćenje suvom četkicom posle svake smene. Izbegavati vlagu i abrazivna sredstva.",
    Analizatori:
      "Kalibrišite uređaj Agtron-EBC standardima svakih 30 dana. Sočiva čistite isključivo mikrofiber krpom. Čuvati na temperaturi 5–35 °C, bez direktne sunčeve svetlosti.",
    "Mlinske stanice":
      "Svake nedelje pažljivo obrišite kućište neabrazivnom krpom. Proveravajte zategnutost vijaka nosača burra na svakih 50 radnih sati.",
    Pribor:
      "Perite toplom vodom i neutralnim sapunom. Ne koristiti u mašini za pranje sudova. Obrišite do suha odmah nakon pranja da izbegnete mrlje od vodenog kamenca.",
    Servis:
      'Nakon servisa oštrenja preporučujemo 2–3 kg sezoniranja ("seasoning") pre prve ozbiljne upotrebe kako bi sečiva dostigla optimalne performanse.',
  };
  return map[p.category];
}

// Cross-sell: pick 2 products from same or adjacent category, excluding self
function getCrossSell(p: Product): Product[] {
  const same = CATALOG.filter((x) => x.sku !== p.sku && x.category === p.category);
  const others = CATALOG.filter((x) => x.sku !== p.sku && x.category !== p.category);
  return [...same, ...others].slice(0, 2);
}

function ProductPage() {
  const { sku } = Route.useParams();
  const product = CATALOG.find((p) => p.sku === sku) as Product;
  const { add, setOpen } = useCart();
  const [activeTab, setActiveTab] = useState<Tab>("Opis");
  const specs = getSpecs(product);
  const crossSell = getCrossSell(product);

  const buyBoxRef = useRef<HTMLDivElement>(null);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!buyBoxRef.current) return;
      const rect = buyBoxRef.current.getBoundingClientRect();
      setShowSticky(rect.bottom < 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <PageShell>
      <PageHeader
        eyebrow={`${product.category} / ${product.sku}`}
        title={product.name}
        intro={product.blurb}
      />

      {/* Hero Image */}
      <section className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <img
            src={product.image}
            alt={product.name}
            width={1280}
            height={1280}
            className="w-full aspect-square object-cover"
          />
        </div>
      </section>

      {/* Info + Buy */}
      <section className="py-16 border-b border-border bg-surface/30">
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          {/* Tabs */}
          <div className="space-y-6">
            {/* Tab switcher */}
            <div className="flex border-b border-border">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 font-mono text-[10px] uppercase tracking-widest border-b-2 transition-colors -mb-px ${
                    activeTab === tab
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Opis */}
            {activeTab === "Opis" && (
              <div className="space-y-4 animate-reveal">
                <h3 className="font-display text-2xl font-bold tracking-tight">O proizvodu</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{product.blurb}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Ovaj proizvod je deo profesionalnog asortimana EEF Online Professional —
                  obezbeđujemo originalne rezervne delove i opremu vrhunskog kvaliteta za vaše
                  ugostiteljske objekte.
                </p>
              </div>
            )}

            {/* Specifikacija */}
            {activeTab === "Specifikacija" && (
              <div className="animate-reveal grid grid-cols-2 gap-3">
                {specs.map((s) => (
                  <div key={s.label} className="border border-border bg-background p-4">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                      {s.label}
                    </div>
                    <div className="font-display font-bold text-sm">{s.value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Održavanje */}
            {activeTab === "Održavanje" && (
              <div className="space-y-4 animate-reveal">
                <h3 className="font-display text-2xl font-bold tracking-tight">
                  Uputstvo za održavanje
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {getMaintenance(product)}
                </p>
              </div>
            )}
          </div>

          {/* Buy box */}
          <div ref={buyBoxRef} className="space-y-6">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
                Kupovina
              </div>
              <h3 className="font-display text-2xl font-bold tracking-tight">Dodaj u korpu</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Ovaj proizvod je dostupan za naručivanje. Naš tim će vas kontaktirati radi potvrde
              dostupnosti i organizacije isporuke.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between border border-border p-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Cena
                </span>
                <span className="font-display font-black text-2xl">{fmtRSD(product.price)}</span>
              </div>
              <div className="flex items-center justify-between border border-border p-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Zaliha
                </span>
                <span
                  className={`font-display font-bold text-sm ${product.stock > 0 ? "text-card-foreground" : "text-muted-foreground"}`}
                >
                  {product.stock > 0 ? `${product.stock} kom.` : "Po porudžbini"}
                </span>
              </div>
              <button
                onClick={() => {
                  add(product.sku);
                  setOpen(true);
                }}
                className="w-full bg-primary text-primary-foreground font-display font-bold uppercase tracking-[0.2em] text-xs py-5 hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                U korpu — {fmtRSD(product.price)}
              </button>
              <Link
                to="/prodavnica"
                className="block w-full text-center border border-border px-6 py-4 font-display text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
              >
                Povratak u prodavnicu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-selling */}
      {crossSell.length > 0 && (
        <section className="py-16 border-b border-border">
          <div className="max-w-4xl mx-auto px-6">
            <div className="mb-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
                Preporuka
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight">
                Često se kupuje zajedno
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {crossSell.map((cs) => (
                <CrossSellCard key={cs.sku} p={cs} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-4">
            POTPUNA PODRŠKA
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight mb-6">
            Potrebna vam je dodatna informacija?
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            Za sve nejasnoće, prilagođene konfiguracije ili veće količine, slobodno nas
            kontaktirajte.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-foreground text-background font-display font-bold uppercase tracking-[0.2em] text-xs px-8 py-4 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Pošaljite upit
          </Link>
        </div>
      </section>

      {/* Mobile Sticky Add to Cart Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-border p-4 md:hidden flex items-center justify-between transition-transform duration-300 shadow-[0_-8px_30px_rgb(0,0,0,0.4)] ${
          showSticky ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center gap-3">
          <img
            src={product.image}
            alt=""
            className="w-12 h-12 object-cover border border-border bg-background"
          />
          <div className="min-w-0">
            <h4 className="font-display font-bold text-xs truncate max-w-[160px] text-foreground">
              {product.name}
            </h4>
            <p className="font-display font-black text-xs text-primary">{fmtRSD(product.price)}</p>
          </div>
        </div>
        <button
          onClick={() => {
            add(product.sku);
            setOpen(true);
          }}
          className="bg-primary text-primary-foreground font-display font-bold uppercase tracking-wider text-[10px] px-6 py-3.5 hover:bg-accent hover:text-accent-foreground transition-all cursor-pointer"
        >
          U korpu +
        </button>
      </div>

      {/* Schema.org Product Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: product.name,
            image: product.image,
            description: product.blurb,
            sku: product.sku,
            offers: {
              "@type": "Offer",
              priceCurrency: "RSD",
              price: product.price,
              itemCondition: "https://schema.org/NewCondition",
              availability:
                product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            },
          }),
        }}
      />
    </PageShell>
  );
}

function CrossSellCard({ p }: { p: Product }) {
  const { add, setOpen } = useCart();
  return (
    <div className="flex gap-4 border border-border bg-background p-4 hover:border-primary/50 transition-colors">
      <Link to={`/proizvod/${p.sku}`} className="shrink-0">
        <img src={p.image} alt={p.name} className="w-20 h-20 object-cover bg-surface" />
      </Link>
      <div className="flex-1 min-w-0 flex flex-col justify-between gap-2">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-accent mb-0.5">
            {p.category}
          </div>
          <Link
            to={`/proizvod/${p.sku}`}
            className="font-display font-bold text-sm leading-tight hover:text-primary transition-colors line-clamp-2"
          >
            {p.name}
          </Link>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-display font-black text-base">{fmtRSD(p.price)}</span>
          <button
            onClick={() => {
              add(p.sku);
              setOpen(true);
            }}
            className="bg-foreground text-background font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-2 hover:bg-primary hover:text-primary-foreground transition-colors whitespace-nowrap"
          >
            U korpu +
          </button>
        </div>
      </div>
    </div>
  );
}
