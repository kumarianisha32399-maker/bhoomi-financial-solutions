import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Facebook, Instagram, Linkedin, Mail, MapPin, Menu, Phone, Twitter, X } from "lucide-react";
import { Logo } from "./ui";
import { useStore } from "@/lib/store";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Our Services", dd: "services" },
  { to: "/industries", label: "Industries", dd: "industries" },
  { to: "/why-choose-us", label: "Why Choose Us" },
  { to: "/process", label: "Our Process" },
  { to: "/insights", label: "Insights" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact Us" },
] as const;

function Socials({ cls }: { cls: string }) {
  const { data: { settings: s } } = useStore();
  const items = [[s.linkedin, Linkedin, "LinkedIn"], [s.facebook, Facebook, "Facebook"], [s.instagram, Instagram, "Instagram"], [s.twitter, Twitter, "X"]] as const;
  return <div className="flex gap-2">{items.map(([href, I, l]) => <a key={l} href={href} target="_blank" rel="noreferrer" aria-label={l} className={cls}><I className="h-3.5 w-3.5" /></a>)}</div>;
}

export function Header() {
  const { data } = useStore();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => { const f = () => setScrolled(window.scrollY > 40); f(); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);
  const active = (to: string) => (to === "/" ? path === "/" : path.startsWith(to));
  const s = data.settings;
  const ddItems = (k: string) => k === "services"
    ? data.services.map((x) => ({ label: x.title, link: <Link to="/services/$slug" params={{ slug: x.slug }}>{x.title}</Link> }))
    : data.industries.map((x) => ({ label: x.title, link: <Link to="/industries" hash={x.id}>{x.title}</Link> }));

  return (
    <>
      <div className="hidden bg-primary text-xs text-primary-foreground/80 md:block">
        <div className="container-x flex h-10 items-center justify-between">
          <div className="flex gap-6">
            <a href={`tel:${s.phone}`} className="flex items-center gap-2 hover:text-gold"><Phone className="h-3.5 w-3.5 text-gold" />{s.phone}</a>
            <a href={`mailto:${s.email}`} className="flex items-center gap-2 hover:text-gold"><Mail className="h-3.5 w-3.5 text-gold" />{s.email}</a>
            <span className="hidden items-center gap-2 lg:flex"><MapPin className="h-3.5 w-3.5 text-gold" />{s.address}</span>
          </div>
          <Socials cls="grid h-6 w-6 place-items-center rounded-full border border-primary-foreground/20 hover:border-gold hover:text-gold" />
        </div>
      </div>
      <header className={`sticky top-0 z-50 border-b bg-background/95 backdrop-blur transition-shadow ${scrolled ? "shadow-[0_8px_30px_-18px_var(--color-primary)]" : ""}`}>
        <div className="container-x flex h-20 items-center justify-between gap-4">
          <Link to="/" aria-label="Bhoomi Business Solutions home"><Logo /></Link>
          <nav className="hidden items-center xl:flex" aria-label="Main">
            {nav.map((n) => (
              <div key={n.to} className="group relative">
                <Link to={n.to} className={`flex items-center gap-1 px-2.5 py-7 text-[13.5px] font-semibold transition-colors ${active(n.to) ? "text-primary" : "text-foreground/70 hover:text-primary"}`}>
                  {n.label}{"dd" in n && <ChevronDown className="h-3.5 w-3.5" />}
                  <span className={`absolute inset-x-2.5 bottom-5 h-0.5 bg-gold transition-transform ${active(n.to) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </Link>
                {"dd" in n && (
                  <div className="invisible absolute left-0 top-full w-64 translate-y-2 border-t-2 border-gold bg-background py-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {ddItems(n.dd).map((i) => <div key={i.label} className="px-5 py-2 text-sm text-foreground/80 hover:bg-surface hover:text-primary [&>a]:block">{i.link}</div>)}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/contact" className="btn-navy hidden sm:inline-flex">Get Consultation</Link>
            <button className="grid h-11 w-11 place-items-center border xl:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="max-h-[75vh] overflow-y-auto border-t bg-background xl:hidden" aria-label="Mobile">
            <div className="container-x py-3">
              {nav.map((n) => (
                <div key={n.to} className="border-b last:border-0">
                  <div className="flex items-center justify-between">
                    <Link to={n.to} className={`block flex-1 py-3 font-semibold ${active(n.to) ? "text-primary" : "text-foreground/75"}`}>{n.label}</Link>
                    {"dd" in n && <button aria-label={`Show ${n.label}`} className="p-3" onClick={() => setSub(sub === n.dd ? null : n.dd)}><ChevronDown className={`h-4 w-4 transition ${sub === n.dd ? "rotate-180" : ""}`} /></button>}
                  </div>
                  {"dd" in n && sub === n.dd && <div className="pb-3 pl-4 text-sm text-muted-foreground [&_a]:block [&_a]:py-1.5">{ddItems(n.dd).map((i) => <div key={i.label}>{i.link}</div>)}</div>}
                </div>
              ))}
              <Link to="/contact" className="btn-navy mt-4 w-full justify-center">Get Consultation</Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}

export function Footer() {
  const { data } = useStore();
  const s = data.settings;
  const col = "text-sm text-primary-foreground/70 hover:text-gold transition-colors";
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr_1.3fr]">
        <div>
          <Logo light />
          <p className="mt-5 text-sm leading-relaxed text-primary-foreground/70">{s.footerAbout}</p>
          <div className="mt-6"><Socials cls="grid h-9 w-9 place-items-center rounded-full border border-primary-foreground/20 hover:border-gold hover:text-gold" /></div>
        </div>
        <div>
          <h3 className="mb-5 font-sans text-sm font-bold uppercase tracking-widest text-gold">Quick Links</h3>
          <ul className="space-y-2.5">{nav.map((n) => <li key={n.to}><Link to={n.to} className={col}>{n.label}</Link></li>)}</ul>
        </div>
        <div>
          <h3 className="mb-5 font-sans text-sm font-bold uppercase tracking-widest text-gold">Services</h3>
          <ul className="space-y-2.5">{data.services.slice(0, 7).map((x) => <li key={x.id}><Link to="/services/$slug" params={{ slug: x.slug }} className={col}>{x.title}</Link></li>)}</ul>
        </div>
        <div>
          <h3 className="mb-5 font-sans text-sm font-bold uppercase tracking-widest text-gold">Industries</h3>
          <ul className="space-y-2.5">{data.industries.map((x) => <li key={x.id}><Link to="/industries" hash={x.id} className={col}>{x.title}</Link></li>)}</ul>
        </div>
        <div>
          <h3 className="mb-5 font-sans text-sm font-bold uppercase tracking-widest text-gold">Contact</h3>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            <li className="flex gap-3"><Phone className="h-4 w-4 shrink-0 text-gold" />{s.phone}</li>
            <li className="flex gap-3"><Mail className="h-4 w-4 shrink-0 text-gold" />{s.email}</li>
            <li className="flex gap-3"><MapPin className="h-4 w-4 shrink-0 text-gold" />{s.address}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-primary-foreground/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {s.siteName}. All rights reserved. · Designed and development by SOSynch Ai Tech</p>
          <div className="flex gap-5">
            <Link to="/privacy-policy" className="hover:text-gold">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gold">Terms &amp; Conditions</Link>
            <Link to="/admin/login" className="hover:text-gold">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return <><Header /><main>{children}</main><Footer /></>;
}
