import g1 from "@/assets/gallery/g1.webp";
import g2 from "@/assets/gallery/g2.webp";
import g3 from "@/assets/gallery/g3.webp";
import g4 from "@/assets/gallery/g4.webp";
import g5 from "@/assets/gallery/g5.webp";
import g6 from "@/assets/gallery/g6.webp";
import g7 from "@/assets/gallery/g7.webp";
import g8 from "@/assets/gallery/g8.webp";
import g9 from "@/assets/gallery/g9.webp";
import g10 from "@/assets/gallery/g10.webp";

export type Product = {
  sku: string;
  name: string;
  category: "Burrovi" | "Analizatori" | "Mlinske stanice" | "Pribor" | "Servis";
  price: number; // RSD
  image: string;
  blurb: string;
  stock: number;
};

// Privremeni statički katalog. Kasnije se zamenjuje Google Sheets izvorom.
export const CATALOG: Product[] = [
  {
    sku: "HB-98-TI",
    name: "HyperBurr 98 Titan",
    category: "Burrovi",
    price: 89_900,
    image: g1,
    stock: 8,
    blurb: "Ravan 98 mm burr sa TiN premazom, geometrija promenljivog koraka.",
  },
  {
    sku: "HB-83-K",
    name: "HyperBurr 83 Konični",
    category: "Burrovi",
    price: 74_900,
    image: g2,
    stock: 12,
    blurb: "Konični 83 mm, Rockwell 64 HRC. Idealan za vrhunske espresso mlinove.",
  },
  {
    sku: "RS-LAB-01",
    name: "RoastSee Lab Analizator",
    category: "Analizatori",
    price: 489_000,
    image: g3,
    stock: 3,
    blurb: "Stoni multispektralni analizator za pržionice — SONY IMX-500.",
  },
  {
    sku: "P1-FLG",
    name: "SOU SIK P-1 Flagship",
    category: "Mlinske stanice",
    price: 1_290_000,
    image: g4,
    stock: 1,
    blurb: "Monolitna stanica iz 7075-T6 aluminijuma. Ograničena serija.",
  },
  {
    sku: "P1-LITE",
    name: "SOU SIK P-1 Lite",
    category: "Mlinske stanice",
    price: 690_000,
    image: g5,
    stock: 4,
    blurb: "Lite varijanta mlinske stanice za manje pogone.",
  },
  {
    sku: "DOSER-PRO",
    name: "Doser Pro Inox",
    category: "Pribor",
    price: 24_900,
    image: g6,
    stock: 30,
    blurb: "Precizni dozator od nerđajućeg čelika, 58 mm korpa.",
  },
  {
    sku: "TAMP-58",
    name: "Tamper 58.5 Aluminijum",
    category: "Pribor",
    price: 12_900,
    image: g7,
    stock: 50,
    blurb: "CNC obrađen tamper, 58.5 mm, ergonomski izbalansiran.",
  },
  {
    sku: "WDT-LAB",
    name: "WDT Distribucioni alat",
    category: "Pribor",
    price: 8_900,
    image: g8,
    stock: 80,
    blurb: "Wedge Distribution Tool, 0.3 mm iglice od medicinskog inoxa.",
  },
  {
    sku: "SHARP-SVC",
    name: "Servis oštrenja burrova",
    category: "Servis",
    price: 14_900,
    image: g9,
    stock: 999,
    blurb: "CNC oštrenje vašeg postojećeg burra do tvorničke geometrije.",
  },
  {
    sku: "CAL-RS",
    name: "RoastSee kalibracioni set",
    category: "Pribor",
    price: 19_900,
    image: g10,
    stock: 25,
    blurb: "Agtron-EBC kalibracioni standardi za RoastSee uređaje.",
  },
];

export const fmtRSD = (n: number) =>
  new Intl.NumberFormat("sr-Latn-RS", {
    style: "currency",
    currency: "RSD",
    maximumFractionDigits: 0,
  }).format(n);
