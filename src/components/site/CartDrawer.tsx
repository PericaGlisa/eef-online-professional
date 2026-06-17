import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { fmtRSD, CATALOG } from "@/lib/catalog";

function getEstimatedDeliveryMessage(): string {
  const now = new Date();
  const day = now.getDay(); // 0 = Ned, 1 = Pon, ... 6 = Sub
  const hour = now.getHours();
  const minutes = now.getMinutes();

  // Radni dani (Pon-Pet) pre 14:00h
  if (day >= 1 && day <= 5 && hour < 14) {
    const remainingHours = 13 - hour;
    const remainingMinutes = 59 - minutes;
    return `Poručite za ${remainingHours}h i ${remainingMinutes}m za isporuku sutra!`;
  } else {
    let nextShipDay = "ponedeljak";
    if (day === 5 && hour >= 14) {
      nextShipDay = "ponedeljak";
    } else if (day === 6) {
      nextShipDay = "ponedeljak";
    } else if (day === 0) {
      nextShipDay = "ponedeljak";
    } else {
      nextShipDay = "sutra";
    }
    return `Brzo slanje: šaljemo već u ${nextShipDay}!`;
  }
}

export function CartDrawer() {
  const { open, setOpen, detailed, total, setQty, remove, add } = useCart();

  const upsellProduct =
    detailed.length > 0 &&
    (detailed.some((item) => item.sku === "WDT-LAB")
      ? CATALOG.find((p) => p.sku === "TAMP-58")
      : CATALOG.find((p) => p.sku === "WDT-LAB"));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/75 backdrop-blur-sm transition-opacity duration-500 ease-out ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      />
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-background border-l border-border shadow-2xl flex flex-col transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Korpa"
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-border">
          <div className="font-display font-bold uppercase tracking-widest text-sm">
            Korpa{" "}
            <span className="text-primary">/{detailed.length.toString().padStart(2, "0")}</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
            aria-label="Zatvori"
          >
            Zatvori ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {detailed.length === 0 ? (
            <div className="p-10 text-center space-y-4">
              <div className="text-5xl">⌁</div>
              <p className="text-muted-foreground text-sm">Korpa je prazna.</p>
              <Link
                to="/prodavnica"
                onClick={() => setOpen(false)}
                className="inline-block border border-border px-6 py-3 font-display text-xs uppercase tracking-widest hover:border-primary hover:text-accent transition-colors"
              >
                Pregled asortimana
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {detailed.map((it) => (
                <li key={it.sku} className="flex gap-4 p-4">
                  <img
                    src={it.product.image}
                    alt={it.product.name}
                    className="w-20 h-20 object-cover bg-surface"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <div className="font-display font-semibold text-sm leading-tight">
                        {it.product.name}
                      </div>
                      <button
                        onClick={() => remove(it.sku)}
                        className="text-muted-foreground hover:text-destructive text-xs"
                        aria-label="Ukloni"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                      {it.sku}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-border">
                        <button
                          className="w-7 h-7 hover:bg-surface"
                          onClick={() => setQty(it.sku, it.qty - 1)}
                          aria-label="Smanji"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-mono text-xs">{it.qty}</span>
                        <button
                          className="w-7 h-7 hover:bg-surface"
                          onClick={() => setQty(it.sku, it.qty + 1)}
                          aria-label="Povećaj"
                        >
                          +
                        </button>
                      </div>
                      <div className="font-display font-bold text-sm">{fmtRSD(it.lineTotal)}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {upsellProduct && (
            <div className="mx-6 my-6 p-4 border border-primary/20 bg-primary/[0.02] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={upsellProduct.image}
                  alt=""
                  className="w-12 h-12 object-cover border border-border bg-background"
                />
                <div className="min-w-0">
                  <span className="font-mono text-[9px] text-accent uppercase tracking-widest block">
                    [ Preporuka ]
                  </span>
                  <h4 className="font-display font-bold text-xs truncate text-foreground leading-tight">
                    {upsellProduct.name}
                  </h4>
                  <p className="font-display font-black text-xs text-primary mt-0.5">
                    {fmtRSD(upsellProduct.price)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => add(upsellProduct.sku)}
                className="bg-primary text-primary-foreground font-display font-bold uppercase tracking-widest text-[9px] px-3 py-2 hover:bg-accent hover:text-accent-foreground transition-all cursor-pointer whitespace-nowrap"
              >
                Dodaj +
              </button>
            </div>
          )}
        </div>

        {detailed.length > 0 && (
          <div className="border-t border-border p-6 space-y-4 bg-surface/40">
            {/* Dynamic Estimated Delivery Notice */}
            <div className="bg-primary/[0.04] border border-primary/20 p-3 text-[10px] font-mono uppercase tracking-widest text-primary text-center">
              {getEstimatedDeliveryMessage()}
            </div>
            <div className="flex justify-between font-display">
              <span className="text-muted-foreground uppercase text-xs tracking-widest">
                Međuzbir
              </span>
              <span className="text-xl font-black">{fmtRSD(total)}</span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Dostava i porez biće obračunati pri potvrdi porudžbine od strane naše službe.
            </p>
            <Link
              to="/naplata"
              onClick={() => setOpen(false)}
              className="block text-center bg-primary text-primary-foreground font-display font-bold uppercase tracking-widest text-xs py-4 hover:bg-accent hover:text-accent-foreground transition"
            >
              Nastavi na naplatu →
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
