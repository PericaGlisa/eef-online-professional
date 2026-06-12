import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/site/PageShell";

export const Route = createFileRoute("/o-nama")({
  head: () => ({
    meta: [
      { title: "O nama — EEF Online Professional" },
      {
        name: "description",
        content:
          "Naša priča, naš tim i naš pristup pružanju profesionalnih usluga i opreme za ugostiteljstvo i domaćinstva.",
      },
    ],
  }),
  component: ONama,
});

const TEAM = [
  {
    name: "Nikola Damnjanović",
    role: "Direktor prodaje",
    bio: "Posvećen razvoju i unapređenju ponude, sa fokusom na kvalitet usluge, dugoročna partnerstva i zadovoljstvo kupaca.",
  },
  {
    name: "Denis Đorđević",
    role: "Predstavnik prodaje",
    bio: "Pruža stručne savete i podršku pri izboru opreme, pomažući kupcima da pronađu rešenja koja najbolje odgovaraju njihovim potrebama.",
  },
];

function ONama() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="O NAMA / 01"
        title="Ko smo mi i šta radimo?"
        intro="EEF Online Professional je vaš pouzdan partner za rezervne delove, barista opremu, aparate i rešenja za održavanje. Naš tim je posvećen kvalitetu, pouzdanosti i zadovoljstvu svakog kupca."
      />

      {/* Our Story */}
      <section className="border-b border-border py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="font-mono text-primary text-xs mb-4 tracking-widest">
              [ NAŠA PRIČA ]
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-6">
              Usluga i kvalitet iz prve ruke.
            </h2>
          </div>
          <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
            <p>
              Pružamo kompletna rešenja za ugostiteljske objekte, kafiće i domaćinstva već godinama.
              Naša misija je da vam omogućimo pristup kvalitetnim rezervnim delovima, profesionalnoj opremi
              i stručnoj podršci, kako bi vaši uređaji radili nesmetano iz dana u dan.
            </p>
            <p>
              Verujemo u dugoročna partnerstva, individualni pristup i transparentnost u svakom koraku.
              Bez obzira da li vam treba jedan mali deo ili kompletno rešenje za vaš objekat,
              naš tim je tu da vam pomogne.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-surface border-b border-border">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="font-mono text-primary text-xs mb-4 tracking-widest">
              [ NAŠ TIM ]
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-6">
              Ljudi koji stoje iza kvaliteta.
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Naš tim je uvek spreman da odgovori na vaše pitanje i da vam pruži stručne savete.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {TEAM.map((member, index) => (
              <div
                key={member.name}
                className="border border-border bg-background p-10 transition-all"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center font-display font-bold text-2xl text-primary">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                      {member.role}
                    </div>
                    <h3 className="text-xl font-black tracking-tight">{member.name}</h3>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="font-mono text-primary text-xs mb-4 tracking-widest">
              [ NAŠE VREDNOSTI ]
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-6">
              Šta nas čini drugačijima.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "✓",
                title: "Kvalitet",
                desc: "Radimo samo sa pouzdanim proizvođačima i kvalitetnim delovima.",
              },
              {
                icon: "⚡",
                title: "Pouzdanost",
                desc: "Vraćamo aparate u rad u najkraćem roku i pružamo dugoročne garancije.",
              },
              {
                icon: "💡",
                title: "Stručnost",
                desc: "Naš tim je edukovan i spreman za sve vaše izazove.",
              },
            ].map((value) => (
              <div key={value.title} className="text-center p-8 border border-border">
                <div className="text-4xl mb-4 text-primary">{value.icon}</div>
                <h3 className="text-xl font-black tracking-tight mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-surface/60 border-t border-border">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter">
            Upoznajte se sa nama i započnite saradnju.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Budite slobodni da nas kontaktirate za bilo kakvo pitanje ili ponudu.
            Naš tim je tu za vas.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-foreground text-background font-mono text-xs px-10 py-5 uppercase font-bold tracking-widest hover:bg-primary transition-colors"
          >
            Kontaktirajte nas
            <span>→</span>
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
