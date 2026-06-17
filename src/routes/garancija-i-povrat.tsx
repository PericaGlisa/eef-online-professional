import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { ShieldCheck, RefreshCw, AlertCircle, FileText } from "lucide-react";

export const Route = createFileRoute("/garancija-i-povrat")({
  head: () => ({
    meta: [
      { title: "Garancija i povrat — EEF Online Professional" },
      {
        name: "description",
        content:
          "Informacije o uslovima garancije za profesionalnu barista opremu i pravilniku o povratu robe u roku od 14 dana.",
      },
      { property: "og:title", content: "Garancija i povrat — EEF Online Professional" },
    ],
    links: [{ rel: "canonical", href: "/garancija-i-povrat" }],
  }),
  component: WarrantyPage,
});

function WarrantyPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="INFORMACIJE / USLOVI"
        title="Garancija i povrat robe"
        intro="Kao kompanija posvećena vrhunskom kvalitetu, garantujemo za ispravnost i dugovečnost svih naših komponenti uz jasne uslove povrata."
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          {/* Section 1: Warranty */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-border pb-4">
              <ShieldCheck className="h-7 w-7 text-primary shrink-0" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-card-foreground">
                Profesionalna garancija do 5 godina
              </h2>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              Za naše premium komponente (kao što su <strong>HyperBurr sečiva</strong> i{" "}
              <strong>SOU SIK mlinske stanice</strong>) dajemo garanciju na habanje i dimenzionu
              stabilnost u trajanju od <strong>5 godina</strong> od datuma kupovine, pod uslovom da
              se koriste u skladu sa fabričkim preporukama.
            </p>
            <div className="grid md:grid-cols-2 gap-4 pt-2">
              <div className="bg-surface/30 border border-border p-5 space-y-2">
                <h3 className="font-display font-bold text-sm text-card-foreground">
                  Šta garancija pokriva:
                </h3>
                <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
                  <li>Proizvodne greške i skrivene mane materijala.</li>
                  <li>Odstupanja u geometriji van deklarisanih mikronskih tolerancija.</li>
                  <li>Prevremeno habanje TiN/DLC premaza u normalnim radnim uslovima.</li>
                </ul>
              </div>
              <div className="bg-surface/30 border border-border p-5 space-y-2">
                <h3 className="font-display font-bold text-sm text-card-foreground">
                  Šta garancija ne pokriva:
                </h3>
                <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
                  <li>
                    Mehanička oštećenja nastala prolaskom stranih tela kroz mlin (npr. kamenčići,
                    metal).
                  </li>
                  <li>
                    Nepravilno čišćenje i pranje vodom ili kiselinama (za komponente koje to ne
                    dozvoljavaju).
                  </li>
                  <li>Fizička oštećenja prilikom nestručne montaže.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 2: Returns */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-border pb-4">
              <RefreshCw className="h-7 w-7 text-primary shrink-0" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-card-foreground">
                Povrat robe u roku od 14 dana
              </h2>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              Ukoliko ste fizičko lice i niste u potpunosti zadovoljni isporučenim proizvodom, imate
              pravo na odustanak od ugovora i povrat sredstava u roku od <strong>14 dana</strong> od
              dana prijema robe, u skladu sa Zakonom o zaštiti potrošača.
            </p>
            <div className="bg-surface/30 border border-border p-6 space-y-4">
              <h3 className="font-display font-bold text-sm text-card-foreground flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-primary" /> Uslovi za prihvat povrata:
              </h3>
              <ul className="text-xs md:text-sm text-muted-foreground list-decimal pl-5 space-y-2 leading-relaxed">
                <li>
                  Roba mora biti nekorišćena, u originalnoj i neoštećenoj ambalaži, sa svim pratećim
                  papirima.
                </li>
                <li>
                  Ukoliko je proizvod montiran na aparat za kafu ili mlin i ima tragove upotrebe
                  (npr. ostaci kafe ili ogrebotine), povrat ne može biti odobren iz higijenskih i
                  tehničkih razloga.
                </li>
                <li>
                  Troškove transporta prilikom povrata robe snosi kupac, osim u slučajevima kada je
                  isporučena pogrešna ili oštećena roba.
                </li>
              </ul>
            </div>
          </div>

          {/* Section 3: Process */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-border pb-4">
              <FileText className="h-7 w-7 text-primary shrink-0" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-card-foreground">
                Kako pokrenuti reklamaciju ili povrat?
              </h2>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              Da biste pokrenuli proces povrata ili reklamacije, pratite sledeće korake:
            </p>
            <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-3 leading-relaxed">
              <li>
                Pošaljite email na{" "}
                <a href="mailto:office@eop.rs" className="text-primary hover:underline">
                  office@eop.rs
                </a>{" "}
                sa brojem porudžbine i kratkim obrazloženjem.
              </li>
              <li>
                Priložite fotografije artikla u originalnoj ambalaži (za povrate) ili
                fotografije/video defekta (za reklamacije).
              </li>
              <li>
                Nakon potvrde od strane našeg tima, zapakujte artikal i pošaljite ga kurirskom
                službom na našu adresu (koju ćete dobiti u instrukcijama).
              </li>
              <li>
                Povrat novca ili zamenski artikal biće procesuirani u roku od 7 radnih dana od
                momenta kada roba stigne na našu adresu i prođe tehničku proveru ispravnosti.
              </li>
            </ol>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
