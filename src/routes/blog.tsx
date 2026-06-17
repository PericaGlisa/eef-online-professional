import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHeader } from "@/components/site/PageShell";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Tehnički blog — EEF Online Professional" },
      {
        name: "description",
        content:
          "Praktični saveti za kalibraciju mlinova, održavanje ugostiteljske opreme i tehnički vodiči za espresso aparate — EEF Online Professional.",
      },
      { property: "og:title", content: "Tehnički blog — EEF Online Professional" },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: Blog,
});

const POSTS = [
  {
    tag: "KALIBRACIJA",
    title: "Kako pravilno kalibrisati burr sečiva na profesionalnom mlinu",
    excerpt:
      "Vodič kroz mikronsko podešavanje rastojanja noževa i pronalaženje nulte tačke za ujednačenu ekstrakciju.",
    content:
      "Kalibracija burrova (sečiva) na mlinu je osnova za postizanje konzistentnog espressa. Prvi korak je pronalaženje fizičke nulte tačke (tačka u kojoj se noževi dodiruju).\n\nKada mlin isključite iz struje, lagano okrećite podešivač granulacije dok ne osetite blagi otpor pri ručnom okretanju pogonskog vratila. Od te tačke vratite podešivač unazad za preporučeni broj mikrona (obično 10-15 mikrona za espresso).\n\nRedovno čišćenje sečiva i provera istrošenosti osiguravaju da nema odstupanja u toku rada. Kod ugradnje novih noževa, preporučljivo je proći kroz fazu 'seasoninga' (slično razrađivanju novog motora) sa 2-5kg stare kafe, kako bi se uklonile neravnine sa ivica i postigla stabilna distribucija granulacije.",
    date: "12.05.2026.",
    read: "6 min",
  },
  {
    tag: "EKSTRAKCIJA / TEHNOLOGIJA",
    title: "EBC vs Agtron: Razlika u merenju prženja i ekstrakcije kafe",
    excerpt:
      "Analiza dva vodeća industrijska standarda za merenje spektralne refleksije svetlosti na samlevenoj kafi.",
    content:
      "Dok je EBC (European Brewery Convention) standard primarno nastao u industriji piva i koristi se za merenje boje i mutnoće tečnosti (uključujući espresso napitke), Agtron je zlatni standard za merenje nivoa prženosti kafe u zrnu ili u prahu.\n\nAgtron meri spektralnu refleksiju svetlosti u bliskom infracrvenom spektru (Near-Infrared - NIR). Što je broj manji (npr. Agtron 35), kafa je tamnije pržena, dok veći brojevi (npr. Agtron 75) označavaju svetlije prženje.\n\nRazumevanje obe skale omogućava pržionicama i ugostiteljima precizno mapiranje ujednačenosti profila i ekstrakcije kafe.",
    date: "04.04.2026.",
    read: "9 min",
  },
  {
    tag: "ODRŽAVANJE",
    title: "Kako pravilno održavati aparate za kafu i produžiti im vek trajanja.",
    excerpt:
      "Saveti za redovno čišćenje, zamenu filtera i održavanje aparata kako bi imali maksimalne performanse godinama.",
    content:
      "Održavanje espresso aparata zahteva dnevnu, nedeljnu i mesečnu rutinu. Svakodnevno je potrebno raditi backflush slepim sitom i namenskim praškom (poput Cafiza) kako bi se uklonila nakupljena ulja kafe iz grupe.\n\nNedeljno čistite portafiltere i sita potapanjem u rastvor praška i tople vode. Mesečno proveravajte pritisak pumpe i stanje filtera za vodu (BWT/Brita), jer je tvrda voda najveći neprijatelj grejača i ventila. Kamenac može trajno smanjiti protok i oštetiti osetljive mesingane i bakarne komponente aparata.",
    date: "18.04.2026.",
    read: "8 min",
  },
  {
    tag: "SAVETI",
    title: "Koju opremu treba svaki profesionalni kafić da ima u 2026. godini.",
    excerpt:
      "Kompletna lista opreme od osnovnih aparata do naprednih rešenja za kvalitet i efikasnost u radu.",
    content:
      "Pored vrhunskog espresso aparata sa stabilnom temperaturom (saturisane grupe), moderan kafić u 2026. mora imati kvalitetan mlin sa flat noževima prečnika preko 80 mm za ujednačenu distribuciju čestica.\n\nTakođe, obavezni su WDT alati za distribuciju kafe u portafilteru kako bi se sprečilo kanalisanje (channeling), i pouzdan sistem za filtraciju vode koji garantuje optimalan mineralni sastav za ekstrakciju slatkih tonova kafe. Razmislite o uvođenju preciznih vaga i alata kako biste osigurali da svaki barista služi isti kvalitet.",
    date: "02.03.2026.",
    read: "10 min",
  },
];

function Blog() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (title: string) => {
    setExpanded(expanded === title ? null : title);
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="TEHNIČKI BLOG"
        title="Korisni saveti i vodiči"
        intro="Praktični saveti, uputstva za održavanje i tehnički vodiči za optimalan rad vaše ugostiteljske opreme."
      />

      <section className="py-12 bg-background">
        <div className="max-w-5xl mx-auto px-6 divide-y divide-border border-y border-border">
          {POSTS.map((p) => {
            const isOpen = expanded === p.title;
            return (
              <article
                key={p.title}
                onClick={() => toggle(p.title)}
                className="grid grid-cols-12 gap-6 py-10 group hover:bg-surface/20 transition-all duration-300 -mx-6 px-6 cursor-pointer"
              >
                <div className="col-span-12 md:col-span-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground flex flex-col gap-2">
                  <span className="text-primary font-bold">{p.tag}</span>
                  <span>{p.date}</span>
                  <span>{p.read}</span>
                  <span className="text-accent/60 group-hover:text-primary transition-colors mt-2 text-[9px] font-bold">
                    {isOpen ? "[ ZATVORI - ]" : "[ PROČITAJ + ]"}
                  </span>
                </div>
                <div className="col-span-12 md:col-span-9 space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-card-foreground group-hover:text-primary transition-colors">
                    {p.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base max-w-2xl">
                    {p.excerpt}
                  </p>

                  <div
                    className={`grid transition-all duration-500 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100 mt-4"
                        : "grid-rows-[0fr] opacity-0 overflow-hidden"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-border/50 pt-4 mt-2 text-foreground/90 text-sm md:text-base leading-relaxed max-w-2xl font-sans space-y-4 whitespace-pre-line">
                        {p.content}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}
