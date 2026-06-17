import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Beaker,
  Coffee,
  Droplets,
  Gauge,
  HomeIcon,
  PackageCheck,
  ShieldCheck,
  Wrench,
  Zap,
  ChevronRight,
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { useReveal } from "@/hooks/useReveal";

import aparatiZaKafu from "@/assets/aparati-za-kafu-i-vending-oprema.webp";
import rezervniDelovi from "@/assets/rezervni-delovi-za-kucne-aparate.webp";
import ugostiteljskaOprema from "@/assets/ugostiteljska-oprema.webp";
import serviceAparati from "@/assets/service-aparati.webp";
import serviceBaristaOprema from "@/assets/service-barista-oprema.webp";
import serviceHemija from "@/assets/service-hemija.webp";
import serviceOmeksivaci from "@/assets/service-omeksivaci-vode.webp";
import serviceRezervniDelovi from "@/assets/service-rezervni-delovi.webp";
import g1 from "@/assets/gallery/g1.webp";
import g2 from "@/assets/gallery/g2.webp";
import g3 from "@/assets/gallery/g3.webp";
import g4 from "@/assets/gallery/g4.webp";
import g5 from "@/assets/gallery/g5.webp";
import g6 from "@/assets/gallery/g6.webp";
import g7 from "@/assets/gallery/g7.webp";
import g8 from "@/assets/gallery/g8.webp";
import g9 from "@/assets/gallery/g9.webp";
import g10 from "@/assets/gallery/g10.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EEF Online Professional — Preciznost i kvalitet bez kompromisa" },
      {
        name: "description",
        content:
          "Vrhunska oprema i rezervni delovi za profesionalne bariste, ugostiteljske objekte i kućnu upotrebu. Kvalitet koji se meri u mikronima.",
      },
      {
        property: "og:title",
        content: "EEF Online Professional — Preciznost i kvalitet bez kompromisa",
      },
      {
        property: "og:description",
        content:
          "Vrhunska oprema i rezervni delovi za profesionalne bariste, ugostiteljske objekte i kućnu upotrebu.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const OFFERS = [
  {
    title: "Ugostiteljska oprema",
    body: "Vrhunske komponente za termičku i rashladnu ugostiteljsku opremu koje garantuju besprekornu stabilnost i kontinuitet rada vašeg restorana ili bara.",
    image: ugostiteljskaOprema,
    eyebrow: "Ugostiteljstvo i horeca",
    stat: "Servisna stabilnost",
    heroTitle: "Profesionalni delovi za ugostiteljstvo.",
    Icon: Wrench,
  },
  {
    title: "Aparati za kafu i espresso oprema",
    body: "Zaptivke glave grupe, precizna sita, tuševi i rezervni delovi za vrhunske espresso aparate. Sve što vam treba za stabilnu ekstrakciju i savršen espresso.",
    image: aparatiZaKafu,
    eyebrow: "Barista i vending",
    stat: "Kontinuitet rada",
    heroTitle: "Oprema za bariste i espresso sisteme.",
    Icon: Coffee,
  },
  {
    title: "Rezervni delovi za kućne aparate",
    body: "Precizni rezervni delovi za kućne espresso aparate, mlinove i kućnu tehniku. Vratite fabričke performanse vašim omiljenim uređajima.",
    image: rezervniDelovi,
    eyebrow: "Kućni aparati",
    stat: "Duža upotreba",
    heroTitle: "Originalni delovi za kućne uređaje.",
    Icon: HomeIcon,
  },
] as const;

const SERVICE_TILES = [
  {
    title: "Rezervni delovi",
    body: "Originalne komponente za ugostiteljsku opremu, pumpe, grejače, ventile i elektroniku za brz servis.",
    image: serviceRezervniDelovi,
    icon: PackageCheck,
  },
  {
    title: "Barista oprema",
    body: "Precizna sita (IMS, VST), tuševi grupe, portafiltri, tamperi i ostali profesionalni pribor za bariste.",
    image: serviceBaristaOprema,
    icon: Coffee,
  },
  {
    title: "Aparati",
    body: "Distribucija i servis profesionalnih espresso aparata, mlinova i prateće barske opreme renomiranih brendova.",
    image: serviceAparati,
    icon: Zap,
  },
  {
    title: "Hemija",
    body: "Profesionalna hemijska sredstva za dekalcifikaciju, pranje grupa (backflush) i održavanje higijene mlinova.",
    image: serviceHemija,
    icon: Beaker,
  },
  {
    title: "Omekšivači vode",
    body: "BWT Bestmax i Brita profesionalni sistemi za filtraciju vode koji sprečavaju kamenac i štite opremu.",
    image: serviceOmeksivaci,
    icon: Droplets,
  },
] as const;

const GALLERY_IMAGES = [
  { src: g1 },
  { src: g2 },
  { src: g3 },
  { src: g4 },
  { src: g6 },
  { src: g7 },
  { src: g8 },
  { src: g9 },
  { src: g10 },
];

const SLIDE_INTERVAL = 7000;

function Home() {
  useReveal();
  const [active, setActive] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const activeOffer = OFFERS[active];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % OFFERS.length);
    }, SLIDE_INTERVAL);

    return () => window.clearInterval(timer);
  }, [isMounted]);

  const previousSlide = () => {
    setActive((current) => (current - 1 + OFFERS.length) % OFFERS.length);
  };

  const nextSlide = () => {
    setActive((current) => (current + 1) % OFFERS.length);
  };

  return (
    <PageShell>
      {/* Hero Slider - Ultra Premium */}
      <section className="relative min-h-screen overflow-hidden border-b border-border bg-background">
        {OFFERS.map((offer, index) => (
          <div
            key={offer.title}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === active ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <img src={offer.image} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          </div>
        ))}

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-4 py-8 md:px-6 md:py-20">
          <div className="animate-reveal max-w-4xl pt-8 md:pt-32">
            <div className="mb-4 md:mb-6 inline-flex items-center gap-2 md:gap-3 border border-primary/30 bg-background/60 px-3 md:px-5 py-2 md:py-2.5 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-accent backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              {activeOffer.eyebrow}
            </div>
            <h1 className="font-display text-3xl md:text-5xl lg:text-7xl font-bold leading-[1.0] tracking-tight text-card-foreground">
              {activeOffer.heroTitle}
            </h1>
            <p className="mt-6 md:mt-8 max-w-2xl text-base md:text-lg lg:text-xl leading-relaxed text-foreground/85">
              {activeOffer.body}
            </p>
            <div className="mt-8 md:mt-10 flex flex-wrap gap-3 md:gap-4">
              <Link
                to="/prodavnica"
                className="group inline-flex items-center justify-center gap-2 md:gap-3 bg-primary px-6 md:px-8 py-4 md:py-5 font-display text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:bg-accent hover:text-accent-foreground"
              >
                <activeOffer.Icon className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:-translate-x-0.5" />
                Pregled ponude
                <ChevronRight className="h-3 w-3 md:h-4 md:w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center border border-foreground/30 bg-background/50 px-6 md:px-8 py-4 md:py-5 font-display text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-foreground backdrop-blur-xl transition-all hover:border-primary hover:text-accent hover:bg-background/70"
              >
                Pošaljite upit
              </Link>
            </div>
          </div>

          <div className="mt-16 grid gap-5 pb-6 md:grid-cols-[1fr_auto] md:items-end">
            <div className="grid gap-4 md:grid-cols-3">
              {OFFERS.map((offer, index) => (
                <button
                  key={offer.title}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`group relative min-h-[120px] md:min-h-[140px] overflow-hidden border bg-background/40 p-0 text-left transition-all ${
                    index === active
                      ? "border-primary bg-primary/10"
                      : "border-foreground/15 hover:border-primary/40"
                  }`}
                  aria-label={`Prikaži slajd: ${offer.title}`}
                >
                  <img
                    src={offer.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-40 transition-all group-hover:opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-transparent" />
                  <div className="relative flex h-full flex-col justify-between p-4 md:p-5">
                    <offer.Icon
                      className={`h-5 w-5 md:h-6 md:w-6 transition-colors ${
                        index === active ? "text-primary" : "text-accent"
                      }`}
                      aria-hidden
                    />
                    <div className="space-y-2">
                      <span className="block font-display text-sm font-bold leading-tight text-card-foreground">
                        {offer.title}
                      </span>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                        {offer.stat}
                      </span>
                    </div>
                  </div>
                  {index === active && (
                    <div className="absolute bottom-0 left-0 h-1 w-full bg-primary" />
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={previousSlide}
                className="grid h-14 w-14 place-items-center border border-foreground/20 bg-background/50 text-foreground backdrop-blur-xl transition-all hover:border-primary hover:bg-primary/10 hover:text-accent"
                aria-label="Prethodni slajd"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="grid h-14 w-14 place-items-center border border-foreground/20 bg-background/50 text-foreground backdrop-blur-xl transition-all hover:border-primary hover:bg-primary/10 hover:text-accent"
                aria-label="Sledeći slajd"
              >
                <ArrowRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-border/50 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-border/50 to-transparent" />
      </section>

      {/* Category Cards - Perfectly Identical */}
      <section className="border-b border-border bg-surface py-16 md:py-24 reveal-on-scroll">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12 md:mb-16 grid gap-6 border-b border-border pb-8 md:pb-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <div className="mb-4 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-accent">
                [ Ponuda rezervnih delova ]
              </div>
              <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-card-foreground">
                Sve ključne kategorije na jednom mestu.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Fokus je na opremi koja svakodnevno radi pod opterećenjem: ugostiteljstvo, aparati za
              kafu, vending sistemi i kućni uređaji kojima treba pouzdana zamena delova.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {OFFERS.map((offer) => (
              <article
                key={offer.title}
                className="group flex flex-col overflow-hidden border border-border bg-background transition-all hover:border-primary/30"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-950">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <offer.Icon
                    className="absolute bottom-4 md:bottom-6 left-4 md:left-6 h-7 md:h-9 w-7 md:w-9 text-accent"
                    aria-hidden
                  />
                </div>
                <div className="flex flex-col justify-between p-5 md:p-7 min-h-[180px] md:min-h-[220px]">
                  <div className="space-y-3">
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                      {offer.eyebrow}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-card-foreground">
                      {offer.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground mt-3 md:mt-4">
                    {offer.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Premium 2-Column Services Grid with All Buttons */}
      <section className="border-b border-border bg-background py-16 md:py-24 reveal-on-scroll">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-8 md:mb-12">
            <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
              [ Naše usluge ]
            </div>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-card-foreground">
              Kompletno rešenje za vašu opremu.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Hero service (1st) - Large prominent card */}
            {SERVICE_TILES.slice(0, 1).map((service) => (
              <article
                key={service.title}
                className="group relative overflow-hidden border-2 border-primary/40 bg-background md:col-span-2 hover:border-primary/80 transition-all duration-300"
              >
                <div className="relative aspect-[4/5] sm:aspect-[16/10] md:aspect-[16/9]">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-12">
                    <div className="mb-4 md:mb-6 inline-flex h-16 md:h-20 w-16 md:w-20 items-center justify-center bg-primary/20 backdrop-blur-md border border-primary/30">
                      <service.icon
                        className="h-7 md:h-10 w-7 md:w-10 text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="mb-3 md:mb-4 text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-card-foreground">
                      {service.title}
                    </h3>
                    <p className="max-w-xl text-sm md:text-base lg:text-lg leading-relaxed text-foreground/85">
                      {service.body}
                    </p>
                    <Link
                      to="/services"
                      className="mt-6 md:mt-8 inline-flex items-center gap-2 md:gap-3 bg-primary text-primary-foreground px-6 md:px-8 py-3 md:py-4 font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] transition-all hover:bg-accent hover:text-accent-foreground"
                    >
                      Saznaj više
                      <ChevronRight className="h-3 md:h-4 w-3 md:w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}

            {/* Remaining 4 services in 2-column grid with buttons */}
            {SERVICE_TILES.slice(1).map((service) => (
              <article
                key={service.title}
                className="group relative overflow-hidden border-2 border-border bg-background hover:border-primary/60 transition-all duration-300"
              >
                <div className="relative aspect-[4/5] sm:aspect-[16/10]">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 lg:p-8">
                    <div className="mb-3 md:mb-4 inline-flex h-12 md:h-14 w-12 md:w-14 items-center justify-center bg-primary/15 backdrop-blur">
                      <service.icon
                        className="h-5 md:h-7 w-5 md:w-7 text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="mb-2 text-xl md:text-2xl font-black tracking-tight text-card-foreground">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground/80 mb-3 md:mb-4">
                      {service.body}
                    </p>
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-accent transition-all hover:text-primary"
                    >
                      Saznaj više
                      <ChevronRight className="h-3 w-3 md:h-3.5 md:w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Compact Premium Gallery */}
      <section className="border-b border-border bg-surface/40 py-16 reveal-on-scroll">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-end justify-between border-b border-border pb-6">
            <div>
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                [ Naša oprema ]
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-card-foreground">
                Koju koristimo u svakodnevnom radu.
              </h2>
            </div>
            <Link
              to="/services"
              className="hidden font-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-accent md:block"
            >
              Pogledaj više →
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-2 md:grid-cols-3">
            {GALLERY_IMAGES.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden border border-border bg-background aspect-square"
              >
                <img
                  src={image.src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Ticker */}
      <section className="py-16 border-b border-border bg-surface/10 overflow-hidden reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-6 mb-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent text-center">
            [ Podržani brendovi i sistemi ]
          </div>
        </div>
        <div className="relative flex overflow-x-hidden border-y border-border/30 bg-background/50 py-6">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(4)]
              .flatMap(() => [
                "Mazzer",
                "Anfim",
                "Victoria Arduino",
                "La Marzocco",
                "Mahlkönig",
                "Sanremo",
                "BWT",
                "Brita",
              ])
              .map((brand, idx) => (
                <span
                  key={idx}
                  className="mx-8 font-display text-2xl md:text-3xl font-bold tracking-widest text-muted-foreground/30 hover:text-primary transition-all duration-300 cursor-default uppercase"
                >
                  {brand} <span className="text-primary/30 ml-8 font-sans text-lg">•</span>
                </span>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium */}
      <section className="bg-background py-28 reveal-on-scroll">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display mb-6 text-4xl font-bold tracking-tight text-card-foreground md:text-5xl">
            Spremni za saradnju.
          </h2>
          <p className="mb-10 max-w-2xl mx-auto text-lg leading-relaxed text-muted-foreground">
            Kontaktirajte nas i saznajte kako možemo poboljšati rad vaše opreme.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 bg-primary px-10 py-6 font-display text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
          >
            Kontaktirajte nas
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
