import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { Menu, X } from "lucide-react";

const NAV = [
  { to: "/", label: "Početna" },
  { to: "/prodavnica", label: "Prodavnica" },
  { to: "/services", label: "Usluge" },
  { to: "/o-nama", label: "O nama" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Kontakt" },
] as const;

export function Header() {
  const { count, setOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="font-display font-bold tracking-tight text-base sm:text-lg uppercase">
          EEF <span className="text-primary">Online</span> Professional
        </Link>
        <div className="hidden md:flex gap-7 font-display font-medium text-[11px] uppercase tracking-widest text-muted-foreground">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 border border-border rounded-md hover:border-primary"
          >
            <Menu className="w-5 h-5" />
          </button>
          <button
            onClick={() => setOpen(true)}
            aria-label={`Otvori korpu (${count})`}
            className="relative font-display font-semibold text-[11px] border border-border px-3 py-1.5 hover:border-primary hover:text-accent transition-colors uppercase tracking-widest"
          >
            Korpa
            <span className={`ml-2 inline-grid place-items-center min-w-[18px] h-[18px] rounded-full text-[10px] font-bold ${count > 0 ? "bg-primary text-primary-foreground" : "bg-surface text-muted-foreground"}`}>
              {count}
            </span>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-background z-50 flex flex-col p-6">
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 border border-border rounded-md hover:border-primary"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-col gap-4 font-display font-medium text-lg uppercase tracking-widest">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-primary transition-colors"
                activeProps={{ className: "text-primary" }}
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
