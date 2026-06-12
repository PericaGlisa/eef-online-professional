import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const OrderSchema = z.object({
  customer: z.object({
    name: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(200),
    phone: z.string().trim().min(5).max(40),
    company: z.string().trim().max(200).optional().default(""),
    address: z.string().trim().min(5).max(400),
    city: z.string().trim().min(2).max(120),
    country: z.string().trim().min(2).max(80).default("Srbija"),
    note: z.string().trim().max(2000).optional().default(""),
  }),
  items: z
    .array(
      z.object({
        sku: z.string().min(1).max(40),
        name: z.string().min(1).max(200),
        qty: z.number().int().min(1).max(999),
        price: z.number().min(0),
      }),
    )
    .min(1)
    .max(50),
  total: z.number().min(0),
});

export type OrderInput = z.infer<typeof OrderSchema>;

const ORDER_TO = "office@eop.rs";
// Bez verifikovanog domena koristimo Resend test pošiljaoca.
// Po podešavanju domena promenite na npr. "EEF Online Professional <porudzbine@eop.rs>".
const ORDER_FROM = "EEF Online Professional <onboarding@resend.dev>";

const fmt = (n: number) =>
  new Intl.NumberFormat("sr-Latn-RS", { style: "currency", currency: "RSD", maximumFractionDigits: 0 }).format(n);

function buildHtml(data: OrderInput, orderNumber: string) {
  const rows = data.items
    .map(
      (i) => `
      <tr>
        <td style="padding:8px;border-bottom:1px solid #e5e7eb;font-family:monospace;font-size:12px;color:#475569">${i.sku}</td>
        <td style="padding:8px;border-bottom:1px solid #e5e7eb">${i.name}</td>
        <td style="padding:8px;border-bottom:1px solid #e5e7eb;text-align:center">${i.qty}</td>
        <td style="padding:8px;border-bottom:1px solid #e5e7eb;text-align:right">${fmt(i.price)}</td>
        <td style="padding:8px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:700">${fmt(i.price * i.qty)}</td>
      </tr>`,
    )
    .join("");

  const c = data.customer;
  return `<!doctype html>
<html><body style="font-family:Arial,Helvetica,sans-serif;background:#ffffff;color:#0f172a;padding:24px">
  <div style="max-width:680px;margin:0 auto;border:1px solid #e5e7eb">
    <div style="background:#0A1630;color:#ffffff;padding:20px 24px">
      <div style="font-size:11px;letter-spacing:.2em;color:#D9A35A;text-transform:uppercase">Nova porudžbina</div>
      <div style="font-size:22px;font-weight:800;margin-top:4px">EEF Online Professional</div>
      <div style="font-size:12px;color:#cbd5e1;margin-top:2px">Br. porudžbine: <b style="color:#fff">${orderNumber}</b></div>
    </div>
    <div style="padding:24px">
      <h3 style="margin:0 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:.15em;color:#475569">Kupac</h3>
      <table style="width:100%;font-size:14px;line-height:1.5">
        <tr><td><b>Ime:</b> ${c.name}</td><td><b>Email:</b> ${c.email}</td></tr>
        <tr><td><b>Telefon:</b> ${c.phone}</td><td><b>Organizacija:</b> ${c.company || "—"}</td></tr>
        <tr><td colspan="2"><b>Adresa:</b> ${c.address}, ${c.city}, ${c.country}</td></tr>
        ${c.note ? `<tr><td colspan="2"><b>Napomena:</b> ${c.note}</td></tr>` : ""}
      </table>

      <h3 style="margin:24px 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:.15em;color:#475569">Stavke</h3>
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead>
          <tr style="background:#f8fafc;text-align:left">
            <th style="padding:8px">SKU</th><th style="padding:8px">Artikal</th>
            <th style="padding:8px;text-align:center">Kol.</th>
            <th style="padding:8px;text-align:right">Cena</th>
            <th style="padding:8px;text-align:right">Ukupno</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
        <tfoot>
          <tr><td colspan="4" style="padding:12px 8px;text-align:right;font-weight:700">UKUPNO</td>
              <td style="padding:12px 8px;text-align:right;font-weight:800;font-size:16px;color:#005BFF">${fmt(data.total)}</td></tr>
        </tfoot>
      </table>

      <p style="margin-top:24px;font-size:12px;color:#64748b">
        Porudžbina je primljena preko sajta eop.rs. Kontaktirajte kupca radi potvrde, dostave i plaćanja.
      </p>
    </div>
  </div>
</body></html>`;
}

function buildCustomerHtml(data: OrderInput, orderNumber: string) {
  return `<!doctype html>
<html><body style="font-family:Arial,Helvetica,sans-serif;background:#ffffff;color:#0f172a;padding:24px">
  <div style="max-width:600px;margin:0 auto">
    <div style="background:#0A1630;color:#fff;padding:24px;text-align:center">
      <div style="font-size:11px;letter-spacing:.2em;color:#D9A35A;text-transform:uppercase">Potvrda porudžbine</div>
      <div style="font-size:22px;font-weight:800;margin-top:6px">Hvala, ${data.customer.name}.</div>
    </div>
    <div style="padding:24px;font-size:14px;line-height:1.6;color:#334155">
      <p>Vaša porudžbina <b>${orderNumber}</b> je uspešno primljena.</p>
      <p>Naš tim će vas u najkraćem roku kontaktirati radi potvrde dostupnosti, dostave i načina plaćanja.</p>
      <p style="margin-top:16px"><b>Ukupno:</b> ${fmt(data.total)}</p>
      <p style="margin-top:24px;font-size:12px;color:#64748b">
        Za sve dodatne informacije: <a href="mailto:office@eop.rs">office@eop.rs</a> · 064 8222 651
      </p>
    </div>
  </div>
</body></html>`;
}

export const submitOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => OrderSchema.parse(data))
  .handler(async ({ data }) => {
    const orderNumber = `EOP-${Date.now().toString(36).toUpperCase()}`;

    // Logujemo porudžbinu u konzolu
    console.log("[submitOrder] Nova porudžbina primljena", { orderNumber, data });

    // Vraćamo uspeh, bez slanja mejla za sada
    return { ok: true, orderNumber, emailed: false };
  });
