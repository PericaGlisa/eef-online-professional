import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import service1 from "@/assets/service-rezervni-delovi.webp";
import service2 from "@/assets/service-barista-oprema.webp";
import service3 from "@/assets/service-aparati.webp";
import service4 from "@/assets/service-hemija.webp";
import service5 from "@/assets/service-omeksivaci-vode.webp";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Usluge — EEF Online Professional" },
      {
        name: "description",
        content:
          "Kompletno rešenje za ugostiteljske objekte, kafiće i domaćinstva: rezervni delovi, barista oprema, aparati, hemija i omekšivači vode.",
      },
      { property: "og:title", content: "Usluge — EEF Online Professional" },
      {
        property: "og:description",
        content: "Vaš pouzdan partner za opremu i rezervne delove.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: Services,
});

const SERVICES = [
  {
    id: "rezervni-delovi",
    title: "Rezervni delovi",
    description:
      "Širok asortiman originalnih i zamenskih delova za sve vrste aparata. Od najmanjih zavrtnja do celih sistema — mi imamo ono što vam treba za neprekidni rad.",
    image: service1,
    features: ["Originalni delovi", "Brza dostava", "Savetovanje"],
  },
  {
    id: "barista-oprema",
    title: "Barista oprema",
    description:
      "Profesionalna oprema za bariste i kafiće. Od tampera do mlinova, sve što vam treba za pravljenje savršene kafe.",
    image: service2,
    features: ["Vrhunski kvalitet", "Profesionalna oprema", "Garancija"],
  },
  {
    id: "aparati",
    title: "Aparati",
    description:
      "Kompletna ponuda aparata za kafu i ugostiteljstvo. Od domaćih modela do profesionalnih sistema za velike objekte.",
    image: service3,
    features: ["Instalacija", "Obuka", "Servis"],
  },
  {
    id: "hemija",
    title: "Hemija",
    description:
      "Profesionalni preparati za čišćenje i održavanje aparata. Bezbedni, efikasni i u skladu sa svim standardima.",
    image: service4,
    features: ["Eco-friendly", "Visoka efikasnost", "Širok spektar"],
  },
  {
    id: "omeksivaci-vode",
    title: "Omekšivači vode",
    description:
      "Sistemi za filtriranje i omekšavanje vode. Ključni za dugovečnost aparata i kvalitet napitaka.",
    image: service5,
    features: ["Instalacija", "Održavanje", "Zamena filtera"],
  },
];

function Services() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="USLUGE / 01"
        title="Kompletno rešenje za vaš biznis i dom."
        intro="Od rezervnih delova do profesionalne opreme — sve na jednom mestu. Pružamo podršku od izbora proizvoda do instalacije i održavanja."
      />

      {/* Clean Services Grid */}
      <section className="border-b border-border py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-12 md:mb-16 text-center">
            <div className="font-mono text-primary text-[10px] md:text-xs mb-4 tracking-widest">
              [ SVE USLUGE ]
            </div>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tighter mb-4 md:mb-6">
              Kompletno rešenje za sve vaše potrebe.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Od rezervnih delova do profesionalne opreme — sve na jednom mestu,
              uz podršku stručnjaka koji razumeju vaš biznis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="group border border-border bg-background hover:border-primary/30 hover:bg-surface/80 transition-all"
              >
                <div className="overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 md:p-8">
                  <div className="font-mono text-primary text-[10px] mb-3 uppercase tracking-widest">
                    {service.id === "omeksivaci-vode"
                      ? "OMEKŠIVAČI-VODE"
                      : service.id.toUpperCase()}
                  </div>
                  <h3 className="text-lg md:text-xl font-black tracking-tight mb-3 md:mb-4">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5 md:mb-6">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5 md:mb-6">
                    {service.features.map((f) => (
                      <span
                        key={f}
                        className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                      >
                        • {f}
                      </span>
                    ))}
                  </div>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 font-mono text-[10px] md:text-[11px] uppercase tracking-widest border-b border-transparent text-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    Kontaktirajte nas
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-8 md:mb-12">
            <div className="font-mono text-primary text-[10px] md:text-xs mb-4 tracking-widest">
              [ KAKO RADIMO ]
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter mb-4">
              Jednostavno, brzo i profesionalno.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {[
              {
                n: "01",
                h: "Konsultacija",
                p: "Slušamo vaše potrebe i pružamo personalizovane savete.",
              },
              {
                n: "02",
                h: "Ponuda",
                p: "Kreiramo jasnu i transparentnu ponudu bez skrivenih troškova.",
              },
              {
                n: "03",
                h: "Realizacija",
                p: "Brza dostava, profesionalna instalacija i obuka ukoliko je potrebno.",
              },
              {
                n: "04",
                h: "Podrška",
                p: "Nastavljamo da vam stojimo na raspolaganju i nakon što je posao završen.",
              },
            ].map((step, i) => (
              <div
                key={step.n}
                className={`space-y-4 ${i > 0 ? "md:border-l md:border-border md:pl-8" : ""}`}
              >
                <div className="font-mono text-primary text-[10px] md:text-xs">
                  [ {step.n} ]
                </div>
                <h3 className="text-lg font-bold tracking-tight">{step.h}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.p}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center space-y-6 md:space-y-8">
          <div className="font-mono text-primary text-[10px] md:text-xs tracking-widest">
            [ SPREMNI ZA SARADNJU? ]
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tighter">
            Kontaktirajte nas i započnimo saradnju.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Bez obzira da li vam treba jedan rezervni deo ili kompletno
            rešenje za vaš objekat — mi smo tu za vas.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-mono text-[10px] md:text-xs px-8 md:px-10 py-4 md:py-6 uppercase font-bold tracking-widest hover:bg-foreground transition-colors"
          >
            Pošaljite upit
            <span>→</span>
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
