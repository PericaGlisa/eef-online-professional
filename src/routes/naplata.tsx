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
      { name: "description", content: "Završite porudžbinu — naš tim će vas kontaktirati radi potvrde i dostave." },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/naplata" }],
  }),
  component: CheckoutPage,
});

type Form = {
  name: string; email: string; phone: string; company: string;
  address: string; city: string; country: string; note: string;
};

function CheckoutPage() {
  const { detailed, total, clear } = useCart();
  const navigate = useNavigate();
  const send = useServerFn(submitOrder);

  const [form, setForm] = useState<Form>({
    name: "", email: "", phone: "", company: "",
    address: "", city: "", country: "Srbija", note: "",
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ orderNumber: string } | null>(null);

  const upd = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((s) => ({ ...s, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (detailed.length === 0) { setError("Vaša korpa je prazna."); return; }
    setBusy(true);
    try {
      const res = await send({
        data: {
          customer: form,
          items: detailed.map((d) => ({ sku: d.sku, name: d.product.name, qty: d.qty, price: d.product.price })),
          total,
        },
      });
      if (!res.ok) { setError(res.error || "Slanje nije uspelo."); return; }
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
              Naš tim će vas kontaktirati u najkraćem mogućem roku radi potvrde dostupnosti, dostave i plaćanja.
              Kopija porudžbine je poslata na vašu email adresu.
            </p>
            <div className="flex gap-3 justify-center">
              <Link to="/prodavnica" className="border border-border px-6 py-3 font-display text-xs uppercase tracking-widest hover:border-primary hover:text-accent transition">
                Nastavi kupovinu
              </Link>
              <button onClick={() => navigate({ to: "/" })} className="bg-primary text-primary-foreground px-6 py-3 font-display text-xs uppercase tracking-widest hover:bg-accent hover:text-accent-foreground">
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
      <PageHeader eyebrow="Naplata / Korak 02" title="Pošaljite porudžbinu." intro="Bez online plaćanja. Tim eop.rs potvrđuje svaku porudžbinu lično pre isporuke." />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <form onSubmit={onSubmit} className="lg:col-span-2 space-y-8">
            <Fieldset legend="Kontakt">
              <Field label="Ime i prezime *"><input required maxLength={120} value={form.name} onChange={upd("name")} className={inp} /></Field>
              <Field label="Email *"><input required type="email" maxLength={200} value={form.email} onChange={upd("email")} className={inp} /></Field>
              <Field label="Telefon *"><input required maxLength={40} value={form.phone} onChange={upd("phone")} className={inp} /></Field>
              <Field label="Organizacija"><input maxLength={200} value={form.company} onChange={upd("company")} className={inp} /></Field>
            </Fieldset>

            <Fieldset legend="Adresa isporuke">
              <Field label="Adresa *" full><input required maxLength={400} value={form.address} onChange={upd("address")} className={inp} /></Field>
              <Field label="Grad *"><input required maxLength={120} value={form.city} onChange={upd("city")} className={inp} /></Field>
              <Field label="Država *"><input required maxLength={80} value={form.country} onChange={upd("country")} className={inp} /></Field>
              <Field label="Napomena" full><textarea rows={3} maxLength={2000} value={form.note} onChange={upd("note")} className={`${inp} resize-none`} /></Field>
            </Fieldset>

            {error && (
              <div className="border border-destructive/60 text-destructive bg-destructive/10 px-4 py-3 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={busy || detailed.length === 0}
              className="w-full bg-primary text-primary-foreground font-display font-bold uppercase tracking-widest text-sm py-5 hover:bg-accent hover:text-accent-foreground transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {busy ? "Slanje porudžbine…" : `Potvrdi porudžbinu — ${fmtRSD(total)}`}
            </button>
            <p className="text-[11px] text-muted-foreground">
              Slanjem porudžbine prihvatate da vas kontaktiramo radi potvrde. Bez online naplate.
            </p>
          </form>

          <aside className="border border-border bg-surface/40 p-6 h-fit lg:sticky lg:top-24 space-y-4">
            <div className="font-display font-bold uppercase tracking-widest text-xs text-muted-foreground">Vaša korpa</div>
            {detailed.length === 0 ? (
              <p className="text-sm text-muted-foreground">Korpa je prazna. <Link to="/prodavnica" className="text-accent underline">Idi u prodavnicu</Link>.</p>
            ) : (
              <>
                <ul className="divide-y divide-border">
                  {detailed.map((d) => (
                    <li key={d.sku} className="py-3 flex gap-3 text-sm">
                      <img src={d.product.image} alt="" className="w-14 h-14 object-cover bg-background" />
                      <div className="flex-1 min-w-0">
                        <div className="font-display font-semibold leading-tight">{d.product.name}</div>
                        <div className="text-muted-foreground font-mono text-[10px] uppercase">{d.sku} · ×{d.qty}</div>
                      </div>
                      <div className="font-display font-bold whitespace-nowrap">{fmtRSD(d.lineTotal)}</div>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-border pt-4 flex justify-between items-baseline">
                  <span className="font-display uppercase text-xs tracking-widest text-muted-foreground">Ukupno</span>
                  <span className="font-display font-black text-2xl">{fmtRSD(total)}</span>
                </div>
              </>
            )}
          </aside>
        </div>
      </section>
    </PageShell>
  );
}

const inp =
  "w-full bg-background border border-border px-4 py-3 font-sans text-sm focus:outline-none focus:border-primary transition-colors";

function Fieldset({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset className="border border-border p-6">
      <legend className="px-2 font-display uppercase tracking-widest text-[11px] text-primary">{legend}</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">{children}</div>
    </fieldset>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="font-display uppercase tracking-widest text-[10px] text-muted-foreground block mb-2">{label}</span>
      {children}
    </label>
  );
}
