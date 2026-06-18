import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";
import { X } from "lucide-react";

const WHATSAPP_CONTACTS = [
  {
    name: "Nikola Damnjanović",
    phone: "+381648222606",
    message: "Zdravo Nikola! Interesuje me ponuda i servis EEF opreme.",
  },
  {
    name: "Denis Đorđević",
    phone: "+381648222651",
    message: "Zdravo Denis! Interesuje me ponuda i servis EEF opreme.",
  },
];

export function PageShell({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const openWhatsApp = (contact: typeof WHATSAPP_CONTACTS[0]) => {
    const url = `https://wa.me/${contact.phone.replace(/\D/g, "")}?text=${encodeURIComponent(contact.message)}`;
    window.open(url, "_blank");
    setWhatsappModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-display">
      <Header />
      <main>{children}</main>
      <Footer />
      <CartDrawer />

      {/* WhatsApp Contact Selector Modal */}
      {whatsappModalOpen && (
        <div className="fixed inset-0 z-[60]">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={() => setWhatsappModalOpen(false)}
          />
          
          {/* Modal Content positioned above widget */}
          <div className="absolute bottom-28 left-4 right-4 sm:left-auto sm:right-6 bg-background rounded-2xl shadow-2xl border border-border max-w-sm">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h3 className="font-display font-bold text-lg tracking-tight">Odaberite osobu za kontakt</h3>
                <p className="text-xs text-muted-foreground mt-1">Odaberite ko će vam odgovoriti</p>
              </div>
              <button 
                onClick={() => setWhatsappModalOpen(false)}
                className="p-2 hover:bg-surface rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-3">
              {WHATSAPP_CONTACTS.map((contact, index) => (
                <button
                  key={index}
                  onClick={() => openWhatsApp(contact)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary hover:bg-surface transition-all duration-200 text-left"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="font-display font-bold">{contact.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-display font-semibold text-sm">{contact.name}</div>
                    <div className="text-xs text-muted-foreground font-mono">{contact.phone}</div>
                  </div>
                  <svg viewBox="0 0 24 24" className="h-6 w-6 text-primary">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor"/>
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Chat Button */}
      <button
        onClick={() => setWhatsappModalOpen(true)}
        className="fixed bottom-6 right-6 z-[50] flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:bg-accent hover:text-accent-foreground hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background group"
        aria-label="Kontaktirajte nas preko WhatsApp-a"
      >
        {/* Elegant wave/ripple effect */}
        <span className="absolute animate-whatsapp-wave rounded-full bg-primary/70 h-14 w-14"></span>
        <span className="absolute animate-whatsapp-wave rounded-full bg-primary/50 h-14 w-14" style={{ animationDelay: '0.8s' }}></span>
        
        <span className="absolute right-16 scale-0 bg-surface border border-border px-3 py-1.5 rounded text-[10px] font-mono uppercase tracking-widest text-foreground whitespace-nowrap opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 pointer-events-none shadow-md">
          WhatsApp Kontakt
        </span>
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current relative z-10">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </button>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-24 z-[49] flex h-14 w-14 items-center justify-center rounded-full bg-border text-card-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0 pointer-events-none"
        }`}
        aria-label="Nazad na vrh"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="border-b border-border">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="font-mono text-primary text-xs mb-6 tracking-widest uppercase">
          [ {eyebrow} ]
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] text-balance max-w-4xl animate-reveal">
          {title}
        </h1>
        {intro && (
          <p className="mt-8 max-w-xl text-muted-foreground leading-relaxed text-pretty">{intro}</p>
        )}
      </div>
    </section>
  );
}

export function SpecRow({ items }: { items: { label: string; value: string }[] }) {
  return (
    <dl className="grid grid-cols-2 md:grid-cols-4 border-y border-border divide-x divide-border">
      {items.map((it) => (
        <div key={it.label} className="p-6">
          <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {it.label}
          </dt>
          <dd className="mt-2 font-mono text-xl text-foreground">{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}
