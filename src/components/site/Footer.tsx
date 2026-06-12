import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="py-24 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-12 gap-12">
        <div className="col-span-12 md:col-span-6 space-y-8">
          <Link to="/" className="font-display font-bold tracking-tight text-xl block text-card-foreground uppercase">
            EEF Online Professional
          </Link>
          <p className="text-foreground text-sm max-w-sm">
            Rezervni delovi, barista oprema, aparati, hemija i rešenja za vodu za lokale i uređaje
            koji moraju da rade pouzdano iz dana u dan.
          </p>
          <div className="space-y-1 font-sans text-sm text-foreground">
            <div><a href="tel:+381648222651" className="hover:text-primary transition-colors">064 8222 651</a></div>
            <div><a href="mailto:office@eop.rs" className="hover:text-primary transition-colors">office@eop.rs</a></div>
            <div><a href="https://eop.rs" className="hover:text-primary transition-colors">eop.rs</a></div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 grid grid-cols-2 gap-8 font-display font-medium text-[10px] uppercase tracking-widest">
          <div className="space-y-4">
            <div className="text-primary">Navigacija</div>
            <div className="flex flex-col gap-2 text-muted-foreground">
              <Link to="/" className="hover:text-foreground">Početna</Link>
              <Link to="/prodavnica" className="hover:text-foreground">Prodavnica</Link>
              <Link to="/services" className="hover:text-foreground">Usluge</Link>
              <Link to="/o-nama" className="hover:text-foreground">O nama</Link>
              <Link to="/blog" className="hover:text-foreground">Blog</Link>
            </div>
          </div>
          <div className="space-y-4">
            <div className="text-primary">Kontakt</div>
            <div className="flex flex-col gap-2 text-muted-foreground">
              <Link to="/contact" className="hover:text-foreground">Kontaktirajte nas</Link>
              <a href="tel:+381648222651" className="hover:text-foreground">064 8222 651</a>
              <a href="mailto:office@eop.rs" className="hover:text-foreground">office@eop.rs</a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-24 pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 font-display text-[9px] text-muted-foreground uppercase tracking-widest">
        <div>© 2026 EEF Online Professional. Sva prava zadržana.</div>
        <div>office@eop.rs // 064 8222 651</div>
      </div>
    </footer>
  );
}
