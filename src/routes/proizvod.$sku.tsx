import { createFileRoute, Link, notFound } from "@tanstack/react-router";
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
            {
              name: "description",
              content: product.blurb,
            },
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

function ProductPage() {
  const { sku } = Route.useParams();
  const product = CATALOG.find((p) => p.sku === sku) as Product;
  const { add, setOpen } = useCart();

  return (
    <PageShell>
      <PageHeader
        eyebrow={`${product.category} / ${product.sku}`}
        title={product.name}
        intro={product.blurb}
      />

      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <img
            src={product.image}
            alt={product.name}
            width={1280}
            height={1280}
            className="w-full aspect-square object-cover"
          />
        </div>
      </section>

      <section className="py-24 border-b border-border bg-surface/30">
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">Specifikacije</div>
              <h3 className="text-2xl font-black tracking-tight">Detalji o proizvodu</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-border bg-background p-5">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">SKU</div>
                <div className="font-display font-bold">{product.sku}</div>
              </div>
              <div className="border border-border bg-background p-5">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Kategorija</div>
                <div className="font-display font-bold">{product.category}</div>
              </div>
              <div className="border border-border bg-background p-5">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Cena</div>
                <div className="font-display font-black text-2xl">{fmtRSD(product.price)}</div>
              </div>
              <div className="border border-border bg-background p-5">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Zaliha</div>
                <div className="font-display font-bold">{product.stock > 0 ? `${product.stock} kom.` : "Po porudžbini"}</div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">Kupovina</div>
              <h3 className="text-2xl font-black tracking-tight">Dodaj u korpu</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Ovaj proizvod je dostupan za naručivanje. Naš tim će vas kontaktirati radi potvrde dostupnosti i organizacije isporuke.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => { add(product.sku); setOpen(true); }}
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

      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-4">POTPUNA PODRŠKA</div>
          <h2 className="text-3xl font-black tracking-tight mb-6">Potreban vam je dodatni informacija?</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            Za sve nejasnoće, prilagođene konfiguracije ili veće količine, slobodno nas kontaktirajte.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-foreground text-background font-display font-bold uppercase tracking-[0.2em] text-xs px-8 py-4 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Pošaljite upit
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
