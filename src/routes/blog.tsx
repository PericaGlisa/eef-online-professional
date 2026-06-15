import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/site/PageShell";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Beleške iz laboratorije — EEF Online Professional blog" },
      {
        name: "description",
        content:
          "Beleške sa terena iz EEF Online Professional optičke i metalurške laboratorije. Studije ekstrakcije, poređenja legura i inženjerske odluke iza svakog izdanja.",
      },
      { property: "og:title", content: "Beleške iz laboratorije — EEF Online Professional" },
      {
        property: "og:description",
        content: "Inženjerske beleške iz EEF Online Professional laboratorije.",
      },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: Blog,
});

const POSTS = [
  {
    tag: "ODRŽAVANJE",
    title: "Kako pravilno održavati aparate za kafu i produžiti im vek trajanja.",
    excerpt:
      "Saveti za redovno čišćenje, zamenu filtera i održavanje aparata kako bi imali maksimalne performanse godinama.",
    date: "18.04.2026.",
    read: "8 min",
  },
  {
    tag: "SAVETI",
    title: "Koju opremu treba svaki profesionalni kafić da ima u 2026. godini.",
    excerpt:
      "Kompletna lista opreme od osnovnih aparata do naprednih rešenja za kvalitet i efikasnost u radu.",
    date: "02.03.2026.",
    read: "12 min",
  },
  {
    tag: "REZERVNI DELOVI",
    title: "Najčešći kvarovi na aparatima za kafu i kako ih rešiti brzo i lako.",
    excerpt:
      "Identifikuj problem, nađi pravi rezervni deo i vrati aparat u rad u najkraćem roku.",
    date: "27.01.2026.",
    read: "6 min",
  },
  {
    tag: "VODA",
    title: "Zašto je kvalitet vode ključan za pravljenje savršene kafe i čuvanje aparata.",
    excerpt:
      "Sve o omekšivačima, filterima i kvalitetu vode koji utiče na ukus kafe i vek trajanja vašeg aparata.",
    date: "14.11.2025.",
    read: "9 min",
  },
  {
    tag: "UGOSTITELJSTVO",
    title: "Kako izabrati prave rezervne delove za vaš ugostiteljski objekat.",
    excerpt:
      "Vodič kroz izbor originalnih i zamenskih delova za sve vrste aparata u ugostiteljstvu.",
    date: "30.09.2025.",
    read: "15 min",
  },
];

function Blog() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="BLOG / 01"
        title="Saveti i vodiči za vaš biznis i dom."
        intro="Kako pravilno održavati aparate, izabrati prave rezervne delove i poboljšati kvalitet usluga u vašem kafiću ili ugostiteljskom objektu."
      />

      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6 divide-y divide-border">
          {POSTS.map((p) => (
            <Link
              to="/blog"
              key={p.title}
              className="grid grid-cols-12 gap-6 py-10 group hover:bg-surface transition-colors -mx-6 px-6"
            >
              <div className="col-span-12 md:col-span-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground flex flex-col gap-2">
                <span className="text-primary">{p.tag}</span>
                <span>{p.date}</span>
                <span>{p.read}</span>
              </div>
              <div className="col-span-12 md:col-span-9 space-y-3">
                <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-balance group-hover:text-primary transition-colors">
                  {p.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-pretty max-w-2xl">
                  {p.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
