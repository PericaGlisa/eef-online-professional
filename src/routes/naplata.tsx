import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { useCart } from "@/lib/cart";
import { fmtRSD } from "@/lib/catalog";
import { submitOrder } from "@/lib/orders.functions";

export const Route = createFileRoute("/naplata")({
  head: () => ({
    meta: [
      { title: "Naplata — EEF Online Professional" },
      {
        name: "description",
        content: "Završite porudžbinu — naš tim će vas kontaktirati radi potvrde i dostave.",
      },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/naplata" }],
  }),
  component: CheckoutPage,
});

type Form = {
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  city: string;
  country: string;
  note: string;
};
type FieldErrors = Partial<Record<keyof Form, string>>;

// ── Promo codes ──────────────────────────────────────────────────────────────
const PROMO_CODES: Record<string, { label: string; apply: (total: number) => number }> = {
  BARISTA10: { label: "–10%", apply: (t) => Math.round(t * 0.9) },
  EOP500: { label: "–500 RSD", apply: (t) => Math.max(0, t - 500) },
};

// ── Field validators ─────────────────────────────────────────────────────────
function validate(form: Form): FieldErrors {
  const e: FieldErrors = {};
  if (!form.name.trim()) e.name = "Unesite ime i prezime.";
  if (!form.email.trim()) e.email = "Unesite email adresu.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email nije validan.";
  if (!form.phone.trim()) e.phone = "Unesite broj telefona.";
  else if (!/^[+\d\s\-()]{6,}$/.test(form.phone)) e.phone = "Broj telefona nije validan.";
  if (!form.address.trim()) e.address = "Unesite adresu isporuke.";
  if (!form.city.trim()) e.city = "Unesite grad.";
  if (!form.country.trim()) e.country = "Unesite državu.";
  return e;
}

function CheckoutPage() {
  const { detailed, total, clear } = useCart();
  const navigate = useNavigate();
  const send = useServerFn(submitOrder);

  const [form, setForm] = useState<Form>({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    city: "",
    country: "Srbija",
    note: "",
  });
  const [touched, setTouched] = useState<Partial<Record<keyof Form, boolean>>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ orderNumber: string } | null>(null);

  // Promo
  const [promoInput, setPromoInput] = useState("");
  const [promoApplied, setPromoApplied] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  const fieldErrors = validate(form);
  const isValid = Object.keys(fieldErrors).length === 0;

  const upd = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((s) => ({ ...s, [k]: e.target.value }));
  const touch = (k: keyof Form) => () => setTouched((s) => ({ ...s, [k]: true }));

  // Discount application
  const discountedTotal =
    promoApplied && PROMO_CODES[promoApplied] ? PROMO_CODES[promoApplied].apply(total) : total;
  const discount = total - discountedTotal;

  function applyPromo() {
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setPromoApplied(code);
      setPromoError(null);
    } else {
      setPromoError("Kod nije validan ili je istekao.");
      setPromoApplied(null);
    }
  }
  function removePromo() {
    setPromoApplied(null);
    setPromoInput("");
    setPromoError(null);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    // Mark all touched to show errors
    setTouched(Object.fromEntries(Object.keys(form).map((k) => [k, true])));
    if (!isValid) {
      setError("Popunite sva obavezna polja ispravno.");
      return;
    }
    if (detailed.length === 0) {
      setError("Vaša korpa je prazna.");
      return;
    }
    setBusy(true);
    try {
      const res = await send({
        data: {
          customer: form,
          items: detailed.map((d) => ({
            sku: d.sku,
            name: d.product.name,
            qty: d.qty,
            price: d.product.price,
          })),
          total: discountedTotal,
          promoCode: promoApplied ?? undefined,
        },
      });
      if (!res.ok) {
        setError(res.error || "Slanje nije uspelo.");
        return;
      }
      setDone({ orderNumber: res.orderNumber });
      clear();
    } catch (err) {
      console.error(err);
      setError("Došlo je do greške. Pokušajte ponovo.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <PageShell>
        <PageHeader eyebrow="Porudžbina primljena" title="Hvala. Porudžbina je zabeležena." />
        <section className="py-16">
          <div className="max-w-2xl mx-auto px-6 text-center space-y-6">
            <div className="font-mono text-primary tracking-widest">{done.orderNumber}</div>
            <p className="text-muted-foreground">
              Naš tim će vas kontaktirati u najkraćem mogućem roku radi potvrde dostupnosti, dostave
              i plaćanja. Kopija porudžbine je poslata na vašu email adresu.
            </p>
            <div className="flex gap-3 justify-center">
              <Link
                to="/prodavnica"
                className="border border-border px-6 py-3 font-display text-xs uppercase tracking-widest hover:border-primary hover:text-accent transition"
              >
                Nastavi kupovinu
              </Link>
              <button
                onClick={() => navigate({ to: "/" })}
                className="bg-primary text-primary-foreground px-6 py-3 font-display text-xs uppercase tracking-widest hover:bg-accent hover:text-accent-foreground"
              >
                Na početnu
              </button>
            </div>
          </div>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHeader
        eyebrow="Naplata / Korak 02"
        title="Pošaljite porudžbinu."
        intro="Bez online plaćanja. Tim eop.rs potvrđuje svaku porudžbinu lično pre isporuke."
      />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <form onSubmit={onSubmit} noValidate className="lg:col-span-2 space-y-8">
            <Fieldset legend="Kontakt">
              <Field label="Ime i prezime *" error={touched.name ? fieldErrors.name : undefined}>
                <input
                  required
                  maxLength={120}
                  value={form.name}
                  onChange={upd("name")}
                  onBlur={touch("name")}
                  className={inpCls(!!touched.name && !!fieldErrors.name)}
                />
              </Field>
              <Field label="Email *" error={touched.email ? fieldErrors.email : undefined}>
                <input
                  required
                  type="email"
                  maxLength={200}
                  value={form.email}
                  onChange={upd("email")}
                  onBlur={touch("email")}
                  className={inpCls(!!touched.email && !!fieldErrors.email)}
                />
              </Field>
              <Field label="Telefon *" error={touched.phone ? fieldErrors.phone : undefined}>
                <input
                  required
                  maxLength={40}
                  value={form.phone}
                  onChange={upd("phone")}
                  onBlur={touch("phone")}
                  className={inpCls(!!touched.phone && !!fieldErrors.phone)}
                />
              </Field>
              <Field label="Organizacija">
                <input
                  maxLength={200}
                  value={form.company}
                  onChange={upd("company")}
                  className={inpCls(false)}
                />
              </Field>
            </Fieldset>

            <Fieldset legend="Adresa isporuke">
              <Field
                label="Adresa *"
                full
                error={touched.address ? fieldErrors.address : undefined}
              >
                <input
                  required
                  maxLength={400}
                  value={form.address}
                  onChange={upd("address")}
                  onBlur={touch("address")}
                  className={inpCls(!!touched.address && !!fieldErrors.address)}
                />
              </Field>
              <Field label="Grad *" error={touched.city ? fieldErrors.city : undefined}>
                <input
                  required
                  maxLength={120}
                  value={form.city}
                  onChange={upd("city")}
                  onBlur={touch("city")}
                  className={inpCls(!!touched.city && !!fieldErrors.city)}
                />
              </Field>
              <Field label="Država *" error={touched.country ? fieldErrors.country : undefined}>
                <input
                  required
                  maxLength={80}
                  value={form.country}
                  onChange={upd("country")}
                  onBlur={touch("country")}
                  className={inpCls(!!touched.country && !!fieldErrors.country)}
                />
              </Field>
              <Field label="Napomena" full>
                <textarea
                  rows={3}
                  maxLength={2000}
                  value={form.note}
                  onChange={upd("note")}
                  className={`${inpCls(false)} resize-none`}
                />
              </Field>
            </Fieldset>

            {error && (
              <div className="border border-destructive/60 text-destructive bg-destructive/10 px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={busy || detailed.length === 0}
              className="w-full bg-primary text-primary-foreground font-display font-bold uppercase tracking-widest text-sm py-5 hover:bg-accent hover:text-accent-foreground transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {busy ? "Slanje porudžbine…" : `Potvrdi porudžbinu — ${fmtRSD(discountedTotal)}`}
            </button>
            <p className="text-[11px] text-muted-foreground">
              Slanjem porudžbine prihvatate da vas kontaktiramo radi potvrde. Bez online naplate.
            </p>
          </form>

          <aside className="border border-border bg-surface/40 p-6 h-fit lg:sticky lg:top-24 space-y-4">
            <div className="font-display font-bold uppercase tracking-widest text-xs text-muted-foreground">
              Vaša korpa
            </div>
            {detailed.length > 0 && (
              <div className="bg-primary/[0.04] border border-primary/20 p-3 text-[10px] font-mono uppercase tracking-widest text-primary text-center">
                {getDeliveryEstimate()}
              </div>
            )}
            {detailed.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Korpa je prazna.{" "}
                <Link to="/prodavnica" className="text-accent underline">
                  Idi u prodavnicu
                </Link>
                .
              </p>
            ) : (
              <>
                <ul className="divide-y divide-border">
                  {detailed.map((d) => (
                    <li key={d.sku} className="py-3 flex gap-3 text-sm">
                      <img
                        src={d.product.image}
                        alt=""
                        className="w-14 h-14 object-cover bg-background"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-display font-semibold leading-tight">
                          {d.product.name}
                        </div>
                        <div className="text-muted-foreground font-mono text-[10px] uppercase">
                          {d.sku} · ×{d.qty}
                        </div>
                      </div>
                      <div className="font-display font-bold whitespace-nowrap">
                        {fmtRSD(d.lineTotal)}
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Promo code */}
                <div className="border-t border-border pt-4 space-y-3">
                  <div className="font-display uppercase tracking-widest text-[10px] text-muted-foreground">
                    Promo kod
                  </div>
                  {promoApplied ? (
                    <div className="flex items-center justify-between bg-primary/10 border border-primary/30 px-3 py-2">
                      <span className="font-mono text-xs text-primary font-bold">
                        {promoApplied} — {PROMO_CODES[promoApplied].label}
                      </span>
                      <button
                        type="button"
                        onClick={removePromo}
                        className="font-mono text-[10px] uppercase text-muted-foreground hover:text-destructive transition-colors ml-2"
                      >
                        Ukloni
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), applyPromo())}
                        placeholder="Unesite kod…"
                        className="flex-1 bg-background border border-border px-3 py-2 font-mono text-xs focus:outline-none focus:border-primary uppercase"
                      />
                      <button
                        type="button"
                        onClick={applyPromo}
                        className="border border-border px-3 py-2 font-display text-[10px] uppercase tracking-widest hover:border-primary hover:text-primary transition-colors whitespace-nowrap"
                      >
                        Primeni
                      </button>
                    </div>
                  )}
                  {promoError && <p className="text-destructive text-[11px]">{promoError}</p>}
                </div>

                {/* Totals */}
                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-display uppercase text-[10px] tracking-widest">
                      Međuzbir
                    </span>
                    <span className="font-display font-bold">{fmtRSD(total)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-primary font-display uppercase text-[10px] tracking-widest">
                        Popust
                      </span>
                      <span className="font-display font-bold text-primary">
                        –{fmtRSD(discount)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-baseline border-t border-border pt-2">
                    <span className="font-display uppercase text-xs tracking-widest text-muted-foreground">
                      Ukupno
                    </span>
                    <span className="font-display font-black text-2xl">
                      {fmtRSD(discountedTotal)}
                    </span>
                  </div>
                </div>
              </>
            )}
          </aside>
        </div>
      </section>
    </PageShell>
  );
}

const inpCls = (hasError: boolean) =>
  `w-full bg-background border ${hasError ? "border-destructive" : "border-border"} px-4 py-3 font-sans text-sm focus:outline-none focus:border-primary transition-colors`;

function Fieldset({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset className="border border-border p-6">
      <legend className="px-2 font-display uppercase tracking-widest text-[11px] text-primary">
        {legend}
      </legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">{children}</div>
    </fieldset>
  );
}

function Field({
  label,
  children,
  full,
  error,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
  error?: string;
}) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="font-display uppercase tracking-widest text-[10px] text-muted-foreground block mb-2">
        {label}
      </span>
      {children}
      {error && <span className="text-destructive text-[11px] mt-1 block">{error}</span>}
    </label>
  );
}

function getDeliveryEstimate(): string {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  if (day >= 1 && day <= 5 && hour < 14) {
    return "Slanje danas, isporuka sutra!";
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
    return `Slanje u ${nextShipDay}, isporuka narednog dana.`;
  }
}
