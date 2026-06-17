import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Često postavljana pitanja — EEF Online Professional" },
      {
        name: "description",
        content:
          "Saznajte sve o B2B uslovima, podržanim brendovima, rokovima isporuke i garanciji za profesionalnu ugostiteljsku opremu.",
      },
      { property: "og:title", content: "FAQ — EEF Online Professional" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: FAQPage,
});

const FAQS = [
  {
    q: "Da li radite B2B sa kafićima, pržionicama i servisima?",
    a: "Da, EEF Online Professional je primarno B2B orijentisan. Nudimo posebne uslove, rabate i odloženo plaćanje za registrovane servise aparata za kafu, pržionice i ugostiteljske mreže. Pošaljite nam upit sa podacima firme preko kontakt forme da biste otvorili partnerski nalog.",
  },
  {
    q: "Koji brendovi aparata za kafu i mlinova su podržani?",
    a: "Obezbeđujemo delove i opremu za vodeće svetske brendove: Mazzer, Anfim, Victoria Arduino, La Marzocco, Mahlkönig, Sanremo, Casadio, Faema, Nuova Simonelli, Astoria, Fiorenzato i mnoge druge. Takođe smo distributeri profesionalnih sistema za filtraciju vode BWT Bestmax i Brita.",
  },
  {
    q: "Koliki je rok isporuke za naručenu opremu i delove?",
    a: "Svi artikli sa lagera poručeni radnim danima do 14:00 šalju se istog dana i isporučuju narednog radnog dana kurirskom službom na vašu adresu. Za specifične delove koji se rade po porudžbini ili uvoze, rok isporuke je obično 7-14 radnih dana.",
  },
  {
    q: "Kolika je garancija na profesionalne komponente i delove?",
    a: "Svi rezervni delovi i komponente dolaze sa garancijom proizvođača. Na premium artikle iz naše ponude prenosimo punu fabričku garanciju od 12 do 24 meseca, dok su određene komponente pokrivene i dužom garancijom prema uslovima samog brenda.",
  },
  {
    q: "Kako mogu biti siguran u kompatibilnost i kvalitet delova?",
    a: "EEF Online Professional nudi isključivo originalne i sertifikovane delove proverenih proizvođača. Za sve proizvode obezbeđujemo tehničku dokumentaciju i specifikacije kako biste bili sigurni da odgovaraju vašem modelu aparata ili mlina.",
  },
  {
    q: "Da li obezbeđujete i prateću podršku i servis?",
    a: "Da, obezbeđujemo tehničku podršku pri izboru delova, a za sve kompleksnije servisne zahteve povezujemo vas sa našom mrežom stručnih i ovlašćenih servisera širom regiona.",
  },
];

function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="PODRŠKA / FAQ"
        title="Često postavljana pitanja"
        intro="Pronađite brze odgovore na najčešća pitanja o našim proizvodima, uslugama, B2B partnerstvu i tehničkoj podršci."
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <div className="divide-y divide-border border-y border-border">
            {FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={idx} className="py-5">
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full flex justify-between items-center text-left py-2 group focus:outline-none"
                  >
                    <span className="font-display text-lg md:text-xl font-bold text-card-foreground group-hover:text-primary transition-colors flex items-start gap-3">
                      <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-1" />
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-primary shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0 ml-4 group-hover:text-primary transition-colors" />
                    )}
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100 mt-3"
                        : "grid-rows-[0fr] opacity-0 overflow-hidden"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm md:text-base leading-relaxed text-muted-foreground pl-8">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 bg-surface/30 border border-border p-8 text-center space-y-4">
            <h3 className="font-display text-xl font-bold">
              Niste pronašli odgovor na vaše pitanje?
            </h3>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Naš tehnički tim je na raspolaganju za sva vaša pitanja. Pišite nam ili nas pozovite
              direktno.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/381648222651?text=Zdravo!%20Imam%20dodatno%20pitanje%20u%20vezi%20EOP%20opreme."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-primary-foreground font-display font-bold uppercase tracking-widest text-[10px] px-6 py-4 hover:bg-accent hover:text-accent-foreground transition"
              >
                Pošalji WhatsApp upit
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
