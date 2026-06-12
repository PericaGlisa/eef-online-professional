import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/site/PageShell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Kontakt — EEF Online Professional" },
      {
        name: "description",
        content:
          "Razgovarajte sa EEF Online Professional inženjerskim timom o HyperBurrs proizvodima, RoastSee analizatoru, SOU SIK P-1, oštrenju ili bespoke inženjerskim projektima.",
      },
      { property: "og:title", content: "Kontakt — EEF Online Professional" },
      {
        property: "og:description",
        content: "Na inženjerske upite odgovaramo u roku od dva radna dana.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const TOPICS = [
  "HyperBurrs katalog",
  "RoastSee analizator",
  "SOU SIK P-1 prijava",
  "Servis oštrenja burrova",
  "Prilagođen inženjering",
  "Mediji / štampa",
];

function Contact() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="KONTAKT / 08"
        title="Na inženjerske upite odgovaramo u roku od dva radna dana."
        intro="Navedite temu i obim vaše laboratorije. Upit prosleđujemo inženjeru koji zna odgovor, ne redu čekanja."
      />

      <section className="py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12">
          {/* Form */}
          <form
            className="lg:col-span-7 space-y-8"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <Field label="IME I PREZIME">
                <input
                  type="text"
                  required
                  className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-3 font-display"
                />
              </Field>
              <Field label="ORGANIZACIJA">
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-3 font-display"
                />
              </Field>
              <Field label="E-POŠTA">
                <input
                  type="email"
                  required
                  className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-3 font-display"
                />
              </Field>
              <Field label="DRŽAVA">
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-3 font-display"
                />
              </Field>
            </div>

            <Field label="TEMA">
              <select className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-3 font-display">
                {TOPICS.map((t) => (
                  <option key={t} className="bg-background">
                    {t}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="PORUKA">
              <textarea
                rows={6}
                required
                className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-3 font-display resize-none"
              />
            </Field>

            <button
              type="submit"
              className="bg-foreground text-background font-mono text-xs px-8 py-4 uppercase font-bold tracking-widest hover:bg-primary transition-colors"
            >
              Pošalji upit
            </button>
          </form>

          {/* Side */}
          <div className="lg:col-span-5 space-y-12">
            <Block label="INŽENJERING">
              <a href="mailto:office@eop.rs" className="hover:text-primary">office@eop.rs</a>
              <br />
              <a href="tel:+381648222651" className="hover:text-primary">064 8222 651</a>
            </Block>
            <Block label="VEB">
              <a href="https://eop.rs" className="hover:text-primary">eop.rs</a>
            </Block>
            <Block label="RADNO VREME">
              Pon–Pet // 09.00 — 18.00 CET
              <br />
              Van radnog vremena uz najavu
            </Block>
            <div className="pt-8 border-t border-border font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
              EEF Online Professional // GMT+1
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="font-mono text-[10px] uppercase tracking-widest text-primary">{label}</div>
      <div className="text-foreground leading-relaxed">{children}</div>
    </div>
  );
}
