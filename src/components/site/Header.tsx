import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";

const NAV = [
  { to: "/", label: "Početna" },
  { to: "/prodavnica", label: "Prodavnica" },
  { to: "/services", label: "Usluge" },
  { to: "/o-nama", label: "O nama" },
  { to: "/blog", label: "Blog" },
] as const;

export function Header() {
  const { count, setOpen } = useCart();
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
          <Link
            to="/contact"
            className="hidden sm:inline-block font-display font-semibold text-[11px] border border-border px-3 py-1.5 hover:border-primary hover:text-foreground transition-colors uppercase tracking-widest"
          >
            Upit
          </Link>
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
    </nav>
  );
}
