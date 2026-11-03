import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { defaultData, type SiteData } from "./data";

const KEY = "bhoomi-site-data-v1";
const AUTH = "bhoomi-admin-auth";
export const ADMIN_EMAIL = "admin@bhoomibusiness.com";
export const ADMIN_PASSWORD = "Admin@123";

type Ctx = {
  data: SiteData;
  update: <K extends keyof SiteData>(key: K, value: SiteData[K], note?: string) => void;
  reset: () => void;
  ready: boolean;
};
const StoreCtx = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(defaultData);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setData({ ...defaultData, ...JSON.parse(raw) });
    } catch { /* ignore corrupt storage */ }
    setReady(true);
  }, []);
  const persist = (next: SiteData) => { setData(next); try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* quota */ } };
  const update: Ctx["update"] = (key, value, note) => {
    const today = new Date().toISOString().slice(0, 10);
    const updates = note ? [{ id: String(Date.now()), text: note, date: today }, ...data.updates].slice(0, 20) : data.updates;
    persist({ ...data, [key]: value, updates });
  };
  const reset = () => { localStorage.removeItem(KEY); setData(defaultData); };
  return <StoreCtx.Provider value={{ data, update, reset, ready }}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const c = useContext(StoreCtx);
  if (!c) throw new Error("useStore outside provider");
  return c;
}

export const auth = {
  login: (e: string, p: string) => {
    const ok = e.trim().toLowerCase() === ADMIN_EMAIL && p === ADMIN_PASSWORD;
    if (ok) localStorage.setItem(AUTH, "1");
    return ok;
  },
  logout: () => localStorage.removeItem(AUTH),
  isIn: () => typeof window !== "undefined" && localStorage.getItem(AUTH) === "1",
};
