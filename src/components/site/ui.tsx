import { useEffect, useRef, useState, type ReactNode } from "react";
import * as Icons from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import bhoomiLogo from "@/assets/bhoomi-logo.png";

export function Icon({ name, className = "h-6 w-6" }: { name: string; className?: string }) {
  const C = (Icons as unknown as Record<string, Icons.LucideIcon>)[name] ?? Icons.Circle;
  return <C className={className} strokeWidth={1.5} />;
}

/** Brand logo: shows uploaded logo URL from Admin > Logo Settings, otherwise the default Bhoomi logo. On dark surfaces (light) it sits on a white pill so the navy lettering stays readable. */
export function Logo({ light = false }: { light?: boolean }) {
  const { data } = useStore();
  const src = data.settings.logoUrl || bhoomiLogo;
  const img = <img src={src} alt={data.settings.siteName} className="h-11 w-auto max-w-[220px] object-contain" />;
  if (light) return <span className="inline-flex items-center rounded-md bg-white px-3 py-1.5">{img}</span>;
  return img;
}

export function Img({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [err, setErr] = useState(false);
  if (err || !src) return <div role="img" aria-label={alt} className={`bg-gradient-to-br from-primary to-navy-2 ${className}`} />;
  return <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setErr(true)} className={className} />;
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function SectionHead({ eyebrow, title, text, center = true }: { eyebrow: string; title: string; text?: string; center?: boolean }) {
  return (
    <Reveal className={`mb-12 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-4 text-3xl font-medium md:text-[2.6rem] md:leading-tight">{title}</h2>
      {text && <p className="mt-4 text-muted-foreground">{text}</p>}
    </Reveal>
  );
}

export function PageHero({ title, crumb, image, text }: { title: string; crumb: string; image: string; text?: string }) {
  return (
    <section className="relative isolate overflow-hidden">
      <Img src={image} alt={title} className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="overlay-navy absolute inset-0 -z-10" />
      <div className="container-x py-24 md:py-32">
        <span className="eyebrow">{crumb}</span>
        <h1 className="mt-4 max-w-3xl text-4xl font-medium text-primary-foreground md:text-6xl">{title}</h1>
        {text && <p className="mt-5 max-w-xl text-primary-foreground/80">{text}</p>}
        <nav className="mt-8 text-sm text-primary-foreground/70" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-gold">Home</Link> <span className="mx-2 text-gold">/</span> {crumb}
        </nav>
      </div>
    </section>
  );
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return; io.disconnect();
      const start = performance.now();
      const tick = (t: number) => { const p = Math.min(1, (t - start) / 1600); setN(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    });
    io.observe(el); return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

export const fmtDate = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export function meta(title: string, description: string) {
  const t = `${title} | Bhoomi Business Solutions`;
  return { meta: [{ title: t }, { name: "description", content: description }, { property: "og:title", content: t }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] };
}
