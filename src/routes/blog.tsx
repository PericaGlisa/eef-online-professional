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
    tag: "ODRŽAVANJE VODE",
    title: "Zašto je omekšivač vode najvažniji dodatak vašem espresso aparatu",
    excerpt:
      "Kamenac je neprijatelj broj jedan ugostiteljske opreme. Saznajte kako pravilna filtracija vode produžava vek trajanja vaših aparata.",
    content:
      "Tvrda voda sadrži visok nivo kalcijuma i magnezijuma, koji se pri zagrevanju talože u obliku kamenca unutar bojlera, cevi i ventila espresso aparata. Ovo ne samo da smanjuje protok vode i pritisak, već može dovesti do ozbiljnih kvarova i skupih popravki.\n\nRedovna zamena filtera i korišćenje profesionalnih omekšivača vode (depuratora) su ključni za stabilan rad. Pored zaštite same opreme, pravilno filtrirana voda direktno utiče na kvalitet i ukus kafe koju služite vašim gostima, jer eliminiše neželjene mirise i hlor.",
    date: "12.05.2026.",
    read: "5 min",
  },
  {
    tag: "REZERVNI DELOVI",
    title: "Originalni vs. zamenski delovi: Šta izabrati za vašu ugostiteljsku opremu?",
    excerpt:
      "Da li se ušteda na jeftinijim zamenskim delovima isplati na duže staze? Analiziramo prednosti korišćenja kvalitetnih komponenti.",
    content:
      "Kada dođe do kvara na termičkoj ili rashladnoj opremi, brzina popravke je ključna za kontinuitet poslovanja. Međutim, izbor ugrađenih delova je jednako važan.\n\nOriginalni (OEM) delovi garantuju potpunu kompatibilnost i fabričke performanse. Iako visokokvalitetni zamenski delovi iz Evrope mogu biti odlična i ekonomična alternativa, treba izbegavati neproverene komponente. U EEF Online Professional ponudi fokusiramo se isključivo na proverene rezervne delove koji osiguravaju pouzdanost i sigurnost u najzahtevnijim profesionalnim uslovima rada.",
    date: "04.04.2026.",
    read: "7 min",
  },
  {
    tag: "HIGIJENA",
    title: "Pravilna upotreba hemije za čišćenje espresso aparata i mlinova",
    excerpt:
      "Vodič za svakodnevno i nedeljno održavanje higijene vaše opreme uz pomoć profesionalnih preparata.",
    content:
      "Profesionalna higijena šanka ne podrazumeva samo brisanje radnih površina. Espresso aparati zahtevaju svakodnevno čišćenje radnih grupa (backflush) pomoću specijalizovanog praška ili tableta koje efikasno rastvaraju nakupljena ulja kafe.\n\nPored aparata, ne smemo zaboraviti ni mlinove. Korišćenje granula za čišćenje mlinova uklanja zaostala užegla ulja sa noževa bez potrebe za rasklapanjem celog uređaja. Redovno korišćenje profesionalne hemije ne samo da održava opremu ispravnom, već garantuje da svaka šoljica kafe ima savršen, čist ukus.",
    date: "18.04.2026.",
    read: "6 min",
  },
  {
    tag: "SERVIS",
    title: "5 najčešćih znakova da vaš aparat za kafu treba hitan servis",
    excerpt:
      "Naučite da prepoznate rane simptome kvara pre nego što dođe do potpunog zastoja u radu vašeg restorana ili kafića.",
    content:
      "Pravovremeno prepoznavanje problema može vam uštedeti mnogo novca i stresa. Ako primetite pad pritiska na manometru prilikom ekstrakcije, to može ukazivati na problem sa pumpom ili zapušenje u sistemu.\n\nCurenje vode oko portafiltera najčešće znači da je vreme za zamenu silikonske ili gumene zaptivke (dihtunga) na grupi. Neobični zvuci, oscilacije u temperaturi ili pojava pare tamo gde ne bi trebalo da je bude, jasni su signali da je vašem aparatu potreban stručan pregled i adekvatan rezervni deo iz naše ponude.",
    date: "02.03.2026.",
    read: "8 min",
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
