import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { CATALOG, type Product } from "./catalog";

export type CartItem = { sku: string; qty: number };

type CartCtx = {
  items: CartItem[];
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (sku: string, qty?: number) => void;
  remove: (sku: string) => void;
  setQty: (sku: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
  detailed: Array<CartItem & { product: Product; lineTotal: number }>;
};

const DEFAULT_CART: CartCtx = {
  items: [],
  open: false,
  setOpen: () => {},
  add: () => {},
  remove: () => {},
  setQty: () => {},
  clear: () => {},
  count: 0,
  total: 0,
  detailed: [],
};

const Ctx = createContext<CartCtx>(DEFAULT_CART);
const KEY = "eop_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, mounted]);

  const value = useMemo<CartCtx>(() => {
    const detailed = items
      .map((i) => {
        const product = CATALOG.find((p) => p.sku === i.sku);
        return product ? { ...i, product, lineTotal: product.price * i.qty } : null;
      })
      .filter(Boolean) as CartCtx["detailed"];

    return {
      items,
      open,
      setOpen,
      add: (sku, qty = 1) => {
        setItems((prev) => {
          const ex = prev.find((p) => p.sku === sku);
          if (ex) return prev.map((p) => (p.sku === sku ? { ...p, qty: p.qty + qty } : p));
          return [...prev, { sku, qty }];
        });
      },
      remove: (sku) => setItems((prev) => prev.filter((p) => p.sku !== sku)),
      setQty: (sku, qty) =>
        setItems((prev) =>
          qty <= 0 ? prev.filter((p) => p.sku !== sku) : prev.map((p) => (p.sku === sku ? { ...p, qty } : p)),
        ),
      clear: () => setItems([]),
      count: detailed.reduce((s, d) => s + d.qty, 0),
      total: detailed.reduce((s, d) => s + d.lineTotal, 0),
      detailed,
    };
  }, [items, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  return useContext(Ctx);
}
