import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import {
  Menu,
  X,
  ShoppingCart,
  ArrowRight,
  Package,
  Coffee,
  Wrench,
  Beaker,
  Droplets,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const NAV = [
  { to: "/", label: "Početna" },
  { to: "/prodavnica", label: "Prodavnica" },
  { to: "/services", label: "Usluge" },
  { to: "/o-nama", label: "O nama" },
  { to: "/blog", label: "Blog" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Kontakt" },
] as const;

const MEGA_MENU_ITEMS = [
  {
    id: "rezervni-delovi",
    title: "Rezervni delovi",
    description: "Originalni i zamenski delovi za sve vrste aparata",
    icon: Package,
    to: "/services",
  },
  {
    id: "barista-oprema",
    title: "Barista oprema",
    description: "Profesionalna oprema za bariste i kafiće",
    icon: Coffee,
    to: "/services",
  },
  {
    id: "aparati",
    title: "Aparati",
    description: "Kompletna ponuda aparata za kafu i ugostiteljstvo",
    icon: Wrench,
    to: "/services",
  },
  {
    id: "hemija",
    title: "Hemija",
    description: "Profesionalni preparati za čišćenje i održavanje",
    icon: Beaker,
    to: "/services",
  },
  {
    id: "omeksivaci-vode",
    title: "Omekšivači vode",
    description: "Sistemi za filtriranje i omekšavanje vode",
    icon: Droplets,
    to: "/services",
  },
];

const PRODAVNICA_MEGA_MENU_ITEMS = [
  {
    id: "ugostiteljska-oprema",
    title: "Ugostiteljska oprema",
    description: "Kvalitetni rezervni delovi za opremu u ugostiteljstvu",
    icon: Wrench,
    to: "/prodavnica",
  },
  {
    id: "aparati-za-kafu",
    title: "Aparati za kafu i vending oprema",
    description: "Efikasne zamene za vašu barista opremu",
    icon: Coffee,
    to: "/prodavnica",
  },
  {
    id: "rezervni-delovi-kucne",
    title: "Rezervni delovi za kućne aparate",
    description: "Trajna podrška za vaše kućne aparate",
    icon: Package,
    to: "/prodavnica",
  },
];

export function Header() {
  const { count, setOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState<string | null>(null); // 'services' or 'prodavnica'
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (route: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setMegaMenuOpen(route);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(null);
    }, 150); // 150ms delay before closing
  };

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="font-display font-bold tracking-tight text-base sm:text-lg uppercase"
        >
          EEF <span className="text-primary">Online</span> Professional
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-7 font-display font-medium text-[11px] uppercase tracking-widest text-muted-foreground">
          {NAV.map((n) => (
            <div
              key={n.to}
              className="relative"
              onMouseEnter={
                n.to === "/services" || n.to === "/prodavnica"
                  ? () => handleMouseEnter(n.to)
                  : undefined
              }
              onMouseLeave={handleMouseLeave}
            >
              {n.to === "/services" || n.to === "/prodavnica" ? (
                <Link
                  to={n.to}
                  className="hover:text-foreground transition-all duration-200 flex items-center gap-1"
                  activeProps={{ className: "text-foreground" }}
                >
                  {n.label.toUpperCase()}
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${megaMenuOpen === n.to ? "rotate-180" : ""}`}
                  />
                </Link>
              ) : (
                <Link
                  to={n.to}
                  className="hover:text-foreground transition-all duration-200"
                  activeProps={{ className: "text-foreground" }}
                >
                  {n.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Right side: Cart + Mobile Menu */}
        <div className="flex items-center gap-3">
          {/* Cart Button */}
          <button
            onClick={() => setOpen(true)}
            aria-label={`Otvori korpu (${count})`}
            className="relative flex items-center justify-center gap-2 px-3 py-1.5 border border-border rounded-md hover:border-primary hover:bg-primary/10 transition-all duration-200"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden md:inline font-display font-semibold text-[11px] uppercase tracking-widest">
              Korpa
            </span>
            <span
              className={`inline-flex items-center justify-center min-w-[18px] h-[18px] rounded-full text-[10px] font-bold text-white ${count > 0 ? "bg-primary" : "bg-surface text-muted-foreground"}`}
            >
              {count}
            </span>
          </button>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 border border-border rounded-md hover:border-primary hover:bg-primary/10 transition-all duration-200"
            aria-label="Otvori meni"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mega Menus */}
      <div
        onMouseEnter={() => {
          if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
          }
        }}
        onMouseLeave={handleMouseLeave}
        className="absolute left-0 right-0"
      >
        {/* Prodavnica Mega Menu */}
        <div
          className={`absolute left-0 right-0 bg-background border-b border-border transition-all duration-300 shadow-lg ${megaMenuOpen === "/prodavnica" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"}`}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {PRODAVNICA_MEGA_MENU_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    to={item.to}
                    onClick={() => setMegaMenuOpen(null)}
                    className="group flex flex-col gap-3 p-4 rounded-xl border border-border bg-background hover:border-primary hover:bg-surface transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-display font-bold text-sm text-foreground group-hover:text-primary transition-colors duration-200">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-primary mt-1 group-hover:gap-2 transition-all duration-300">
                      Pogledaj
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Services Mega Menu */}
        <div
          className={`absolute left-0 right-0 bg-background border-b border-border transition-all duration-300 shadow-lg ${megaMenuOpen === "/services" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"}`}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
              {MEGA_MENU_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    to={item.to}
                    onClick={() => setMegaMenuOpen(null)}
                    className="group flex flex-col gap-3 p-4 rounded-xl border border-border bg-background hover:border-primary hover:bg-surface transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-display font-bold text-sm text-foreground group-hover:text-primary transition-colors duration-200">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-primary mt-1 group-hover:gap-2 transition-all duration-300">
                      Saznaj više
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>

      {/* Mobile Menu - BRAND COFFEE THEMED SOLID BACKGROUND! */}
      {/* MOVED OUTSIDE NAV TO ESCAPE BACKDROP-FILTER CONTAINING BLOCK */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[999999] bg-background flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-4 sm:p-6 border-b border-border bg-background">
            <Link
              to="/"
              className="font-display font-bold tracking-tight text-lg sm:text-xl uppercase text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              EEF <span className="text-primary">Online</span> Professional
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 border border-border rounded-md hover:border-primary hover:bg-primary/10 transition-all duration-200"
              aria-label="Zatvori meni"
            >
              <X className="w-6 h-6 text-foreground" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-background">
            <div className="space-y-1">
              {NAV.map((n) => (
                <div key={n.to}>
                  {n.to === "/services" || n.to === "/prodavnica" ? (
                    <div className="border-b border-border">
                      <div className="flex items-center justify-between py-2">
                        <Link
                          to={n.to}
                          onClick={() => setMobileMenuOpen(false)}
                          className="py-2 text-xl font-display font-medium uppercase tracking-widest text-foreground hover:text-primary transition-colors duration-200"
                          activeProps={{ className: "text-primary pl-2" }}
                        >
                          {n.label}
                        </Link>
                        <button
                          onClick={() =>
                            setMobileSubmenuOpen(mobileSubmenuOpen === n.to ? null : n.to)
                          }
                          className="p-3 hover:bg-surface rounded transition-colors"
                          aria-label={`Prikaži podmeni za ${n.label}`}
                        >
                          {mobileSubmenuOpen === n.to ? (
                            <ChevronUp className="w-5 h-5 text-muted-foreground hover:text-primary" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted-foreground hover:text-primary" />
                          )}
                        </button>
                      </div>
                      {/* Mobile Submenu */}
                      {mobileSubmenuOpen === n.to && (
                        <div className="pl-4 pb-4 space-y-2">
                          {(n.to === "/services"
                            ? MEGA_MENU_ITEMS
                            : PRODAVNICA_MEGA_MENU_ITEMS
                          ).map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.id}
                                to={item.to}
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setMobileSubmenuOpen(null);
                                }}
                                className="flex items-center gap-3 py-3 text-muted-foreground hover:text-primary transition-colors duration-200"
                              >
                                <Icon className="w-5 h-5 text-primary" />
                                <span className="text-sm font-display uppercase tracking-widest">
                                  {item.title}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={n.to}
                      to={n.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className="group flex items-center justify-between py-4 border-b border-border hover:pl-2 transition-all duration-200 text-foreground"
                      activeProps={{ className: "text-primary border-primary pl-2" }}
                    >
                      <span className="text-xl font-display font-medium uppercase tracking-widest text-foreground group-hover:text-primary transition-colors">
                        {n.label}
                      </span>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all duration-200" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer Contact Info */}
          <div className="p-4 sm:p-6 border-t border-border bg-background">
            <div className="space-y-3">
              <a
                href="tel:+381648222651"
                className="flex items-center gap-2 text-muted-foreground font-display tracking-widest uppercase text-[10px] hover:text-foreground transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                064 8222 651
              </a>
              <a
                href="mailto:office@eop.rs"
                className="flex items-center gap-2 text-muted-foreground font-display tracking-widest uppercase text-[10px] hover:text-foreground transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                office@eop.rs
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
