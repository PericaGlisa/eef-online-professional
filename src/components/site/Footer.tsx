import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="py-16 sm:py-24 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Brand Info */}
        <div className="col-span-12 md:col-span-7 lg:col-span-6 space-y-6">
          <Link
            to="/"
            className="font-display font-bold tracking-tight text-lg sm:text-xl block text-card-foreground uppercase"
          >
            EEF Online Professional
          </Link>
          <p className="text-foreground text-sm leading-relaxed max-w-sm">
            Rezervni delovi, barista oprema, aparati za kafu i uređaji — sve na jednom mestu.
          </p>
          <div className="space-y-2 font-sans text-sm text-foreground">
            <div>
              <a href="tel:+381648222651" className="hover:text-primary transition-colors">
                064 8222 651
              </a>
            </div>
            <div>
              <a href="mailto:office@eop.rs" className="hover:text-primary transition-colors">
                office@eop.rs
              </a>
            </div>
            <div>
              <a href="https://eop.rs" className="hover:text-primary transition-colors">
                eop.rs
              </a>
            </div>
          </div>
        </div>

        {/* Navigation & Contact */}
        <div className="col-span-12 md:col-span-5 lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8 font-display font-medium text-[10px] uppercase tracking-widest">
          <div className="space-y-4">
            <div className="text-primary">Navigacija</div>
            <div className="flex flex-col gap-2 text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">
                Početna
              </Link>
              <Link to="/prodavnica" className="hover:text-foreground transition-colors">
                Prodavnica
              </Link>
              <Link to="/services" className="hover:text-foreground transition-colors">
                Usluge
              </Link>
              <Link to="/o-nama" className="hover:text-foreground transition-colors">
                O nama
              </Link>
              <Link to="/blog" className="hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link to="/faq" className="hover:text-foreground transition-colors">
                FAQ / Podrška
              </Link>
              <Link to="/garancija-i-povrat" className="hover:text-foreground transition-colors">
                Garancija i povrat
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <div className="text-primary">Kontakt</div>
            <div className="flex flex-col gap-2 text-muted-foreground">
              <Link to="/contact" className="hover:text-foreground transition-colors">
                Kontaktirajte nas
              </Link>
              <a href="tel:+381648222651" className="hover:text-foreground transition-colors">
                064 8222 651
              </a>
              <a href="mailto:office@eop.rs" className="hover:text-foreground transition-colors">
                office@eop.rs
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-16 sm:mt-24 pt-8 sm:pt-12 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 font-display text-[9px] text-muted-foreground uppercase tracking-widest">
        <div>© 2026 EEF Online Professional. Sva prava zadržana.</div>
        <div>
          <a href="mailto:office@eop.rs" className="hover:text-foreground transition-colors">
            office@eop.rs
          </a>
          {" • "}
          <a href="tel:+381648222651" className="hover:text-foreground transition-colors">
            064 8222 651
          </a>
        </div>
      </div>
    </footer>
  );
}
