import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Coffee } from "lucide-react";

import appCss from "../styles.css?url";
import { CartProvider } from "@/lib/cart";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-12 relative overflow-hidden">
      {/* Background glow blobbies for premium look */}
      <div className="absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <div className="max-w-md text-center space-y-6 relative z-10">
        <div className="flex justify-center">
          <div className="relative flex h-24 w-24 items-center justify-center bg-primary/10 border border-primary/20 rounded-full">
            <Coffee className="h-10 w-10 text-primary" />
            <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-accent animate-ping" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-8xl font-display font-black tracking-tight text-primary animate-reveal">
            404
          </h1>
          <h2 className="text-2xl font-display font-bold text-card-foreground">
            Izgubili smo portafilter.
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground max-w-sm mx-auto">
            Izgleda da ova stranica ne postoji, ili je pritisak u bojleru opao. Kafa se i dalje kuva
            na početnoj stranici!
          </p>
        </div>

        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-primary px-8 py-4 font-display text-xs font-bold uppercase tracking-widest text-primary-foreground transition-all duration-300 hover:bg-accent hover:text-accent-foreground cursor-pointer"
          >
            Nazad na početnu
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Stranica nije učitana
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Došlo je do greške na našoj strani. Pokušajte da osvežite ili se vratite na početnu.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Pokušaj ponovo
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Nazad na početnu
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "EEF Online Professional | Rezervni delovi, barista oprema i aparati za kafu" },
      {
        name: "description",
        content:
          "EEF Online Professional – Vaš pouzdan partner za rezervne delove za ugostiteljstvo, barista opremu, aparate za kafu i domaće uređaje. Usluge održavanja i konsultacije.",
      },
      {
        name: "keywords",
        content:
          "rezervni delovi, aparati za kafu, barista oprema, ugostiteljstvo, domaći uređaji, održavanje",
      },
      { name: "author", content: "EEF Online Professional" },
      { property: "og:site_name", content: "EEF Online Professional" },
      { property: "og:type", content: "website" },
      {
        property: "og:title",
        content: "EEF Online Professional | Rezervni delovi za ugostiteljstvo i dom",
      },
      {
        property: "og:description",
        content:
          "EEF Online Professional – Vaš pouzdan partner za rezervne delove za ugostiteljstvo, barista opremu, aparate za kafu i domaće uređaje.",
      },
      { property: "og:image", content: "/og-image.png" },
      { property: "og:url", content: "https://eop.rs" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "EEF Online Professional | Rezervni delovi za ugostiteljstvo i dom",
      },
      {
        name: "twitter:description",
        content:
          "Vaš pouzdan partner za rezervne delove za ugostiteljstvo, barista opremu, aparate za kafu i domaće uređaje.",
      },
      { name: "twitter:image", content: "/og-image.png" },
      { name: "theme-color", content: "#c8883a" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400..700;1,400..700&family=Exo+2:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "EEF Online Professional",
          description: "Rezervni delovi za ugostiteljstvo, aparate za kafu i domaće uređaje.",
          url: "/",
          telephone: "+381 64 8222 651",
          email: "office@eop.rs",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="sr-Latn">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const routerState = useRouterState();
  const [isMounted, setIsMounted] = useState(false);

  // Always scroll to top on navigation
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      window.scrollTo(0, 0);
    }
  }, [routerState.location.pathname, isMounted]);

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </CartProvider>
    </QueryClientProvider>
  );
}
