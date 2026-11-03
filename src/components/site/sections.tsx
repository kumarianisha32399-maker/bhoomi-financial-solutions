import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronLeft, ChevronRight, Mail, MapPin, Minus, Phone, Plus, Quote } from "lucide-react";
import { Counter, Icon, Img, Reveal, SectionHead, fmtDate } from "./ui";
import { useStore } from "@/lib/store";
import { businessTypes, processSteps, serviceOptions, whyCards, u } from "@/lib/data";

export function Hero() {
  const { data } = useStore();
  const slides = data.hero;
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % slides.length), 6500); return () => clearInterval(t); }, [slides.length]);
  const s = slides[i] ?? slides[0];
  if (!s) return null;
  const go = (d: number) => setI((i + d + slides.length) % slides.length);
  return (
    <section className="relative overflow-hidden bg-surface pb-28 pt-12 md:pt-16" aria-roledescription="carousel">
      <div className="ledger-grid absolute inset-0 -z-0 opacity-60" aria-hidden />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div key={s.id} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="eyebrow">{String(i + 1).padStart(2, "0")} / {s.eyebrow}</span>
          <h1 className="mt-5 text-4xl font-medium leading-[1.1] md:text-[3.4rem]">{s.title}</h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">{s.text}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link to="/services" className="btn-navy">Explore Our Services <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/contact" className="btn-outline-navy">Contact Our Team</Link>
          </div>
          <div className="mt-12 flex items-center gap-4">
            {slides.map((sl, k) => <button key={sl.id} onClick={() => setI(k)} aria-label={`Slide ${k + 1}: ${sl.eyebrow}`} className={`h-1 transition-all ${k === i ? "w-12 bg-gold" : "w-6 bg-border"}`} />)}
            <div className="ml-auto flex gap-2">
              <button aria-label="Previous slide" onClick={() => go(-1)} className="grid h-11 w-11 place-items-center border border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"><ChevronLeft className="h-5 w-5" /></button>
              <button aria-label="Next slide" onClick={() => go(1)} className="grid h-11 w-11 place-items-center border border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"><ChevronRight className="h-5 w-5" /></button>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -right-4 -top-4 h-full w-full border border-gold" aria-hidden />
          <div className="relative aspect-[4/3.6] overflow-hidden shadow-2xl">
            {slides.map((sl, k) => (
              <Img key={sl.id} src={sl.image} alt={`${sl.eyebrow} – Bhoomi Business Solutions`} className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${k === i ? "opacity-100" : "opacity-0"}`} />
            ))}
          </div>
          <div className="absolute -bottom-8 -left-4 hidden w-64 bg-background p-5 shadow-xl sm:block md:-left-10">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Monthly compliance</p>
            <div className="mt-3 flex h-16 items-end gap-1.5" aria-hidden>
              {[40, 62, 48, 75, 58, 88, 70, 95].map((h, k) => <span key={k} className={`flex-1 ${k === 7 ? "bg-gold" : "bg-primary"}`} style={{ height: `${h}%` }} />)}
            </div>
            <p className="mt-3 flex items-center gap-2 text-sm font-bold text-primary"><Check className="h-4 w-4 text-gold" />GST · ITR · TDS on schedule</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Highlights() {
  const { data } = useStore();
  return (
    <section className="relative z-10 -mt-14">
      <div className="container-x grid gap-px bg-border shadow-xl sm:grid-cols-2 lg:grid-cols-4">
        {data.highlights.map((h, k) => (
          <Reveal key={h.id} delay={k * 80} className="group bg-background p-8 transition-colors hover:bg-primary">
            <div className="text-gold"><Icon name={h.icon} className="h-9 w-9" /></div>
            <h3 className="mt-5 text-xl group-hover:text-primary-foreground">{h.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground group-hover:text-primary-foreground/75">{h.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function AboutBlock({ full = false }: { full?: boolean }) {
  const { data: { about: a } } = useStore();
  const items = [["Who We Are", a.who], ["Our Mission", a.mission], ["Our Vision", a.vision], ["Our Core Values", a.values]];
  return (
    <section className="py-24">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="relative">
          <Img src={a.image} alt="Accountant reviewing financial records with a business owner" className="aspect-[4/5] w-full object-cover" />
          <div className="absolute -bottom-6 -right-2 hidden bg-primary p-7 text-primary-foreground md:block">
            <p className="font-display text-4xl text-gold">Trusted</p><p className="mt-1 text-xs uppercase tracking-widest">Accounting & tax partner</p>
          </div>
          <div className="absolute -left-4 -top-4 -z-10 h-full w-full border border-gold" />
        </Reveal>
        <Reveal>
          <span className="eyebrow">Who We Are</span>
          <h2 className="mt-4 text-3xl font-medium md:text-[2.6rem] md:leading-tight">About Bhoomi Business Solutions</h2>
          <p className="mt-5 text-muted-foreground">{a.intro}</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {items.map(([t, d]) => <div key={t} className="border-l-2 border-gold pl-4"><h3 className="font-sans text-sm font-bold uppercase tracking-wider">{t}</h3><p className="mt-2 text-sm text-muted-foreground">{d}</p></div>)}
          </div>
          {!full && <Link to="/about" className="btn-navy mt-10">Read More <ArrowRight className="h-4 w-4" /></Link>}
        </Reveal>
      </div>
    </section>
  );
}

export function WhyGrid() {
  return (
    <section className="bg-surface py-24">
      <div className="container-x">
        <SectionHead eyebrow="Why Choose Us" title="Why businesses choose Bhoomi" text="Careful work, organized records and a transparent process — every month, every filing." />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whyCards.map((c, k) => (
            <Reveal key={c.title} delay={k * 60} className="card-lift border bg-background p-8">
              <div className="grid h-14 w-14 place-items-center bg-gold-soft text-primary"><Icon name={c.icon} /></div>
              <h3 className="mt-6 text-xl">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CareGrid() {
  const { data } = useStore();
  return (
    <section className="bg-primary py-24">
      <div className="container-x">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <span className="eyebrow">Financial Care</span>
          <h2 className="mt-4 text-3xl font-medium text-primary-foreground md:text-[2.6rem] md:leading-tight">Your Business Finances, Managed with Care.</h2>
        </Reveal>
        <div className="grid gap-px bg-primary-foreground/10 md:grid-cols-2 lg:grid-cols-3">
          {data.careFeatures.map((c, k) => (
            <Reveal key={c.id} delay={k * 60} className="group bg-primary p-9 transition-colors hover:bg-navy-2">
              <div className="flex items-center justify-between"><span className="grid h-14 w-14 place-items-center border border-gold/60 text-gold"><Icon name={c.icon} /></span><span className="font-display text-3xl text-primary-foreground/15">0{k + 1}</span></div>
              <h3 className="mt-6 text-xl text-primary-foreground">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">{c.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesGrid({ limit }: { limit?: number }) {
  const { data } = useStore();
  const list = limit ? data.services.slice(0, limit) : data.services;
  return (
    <section className="py-24">
      <div className="container-x">
        <SectionHead eyebrow="Our Services" title="Accounting, GST, tax & compliance services under one roof" text="From daily bookkeeping to GST returns, ITR filing, registrations and payroll — organised and handled with care." />
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s, k) => (
            <Reveal key={s.id} delay={(k % 3) * 80} className="group card-lift flex flex-col border bg-background">
              <div className="relative overflow-hidden">
                <Img src={s.image} alt={s.title} className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute -bottom-6 left-6 grid h-14 w-14 place-items-center bg-primary text-gold"><Icon name={s.icon} /></div>
              </div>
              <div className="flex flex-1 flex-col p-7 pt-10">
                <h3 className="text-xl">{s.title}</h3>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{s.desc}</p>
                <Link to="/services/$slug" params={{ slug: s.slug }} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-gold">Learn More <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></Link>
              </div>
            </Reveal>
          ))}
        </div>
        {limit && <div className="mt-12 text-center"><Link to="/services" className="btn-navy">View All Services</Link></div>}
      </div>
    </section>
  );
}

export function IndustriesGrid() {
  const { data } = useStore();
  return (
    <section className="bg-surface py-24">
      <div className="container-x">
        <SectionHead eyebrow="Who We Serve" title="Accounting support for every kind of business" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.industries.map((x, k) => (
            <Reveal key={x.id} delay={(k % 4) * 70}>
              <Link to="/industries" hash={x.id} className="group relative block aspect-[3/4] overflow-hidden">
                <Img src={x.image} alt={x.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-xl text-primary-foreground">{x.title}</h3>
                  <p className="mt-2 max-h-0 overflow-hidden text-sm text-primary-foreground/80 transition-all duration-500 group-hover:max-h-24">{x.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold">Learn More <ArrowRight className="h-3.5 w-3.5" /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSteps() {
  return (
    <section className="py-24">
      <div className="container-x">
        <SectionHead eyebrow="Our Working Process" title="Four simple steps from documents to filing" />
        <div className="relative grid gap-10 md:grid-cols-4">
          <div className="absolute left-[12%] right-[12%] top-10 hidden border-t border-dashed border-gold md:block" />
          {processSteps.map((p, k) => (
            <Reveal key={p.n} delay={k * 150} className="relative text-center">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border-4 border-background bg-primary text-gold shadow-lg"><Icon name={p.icon} className="h-8 w-8" /></div>
              <p className="mt-5 font-display text-3xl text-gold">{p.n}</p>
              <h3 className="mt-2 text-lg">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden py-24">
      <Img src={u("1554224154-26032ffc0d07", 1920)} alt="Calculator and financial statements on an accountant\'s desk" className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="overlay-solid absolute inset-0 -z-10" />
      <Reveal className="container-x text-center">
        <h2 className="mx-auto max-w-3xl text-3xl font-medium text-primary-foreground md:text-5xl">Keep your accounts, GST and taxes in order.</h2>
        <p className="mx-auto mt-5 max-w-xl text-primary-foreground/80">Tell us what you need — bookkeeping, a GST return, an ITR or a registration — and our team will guide you through it.</p>
        <Link to="/contact" className="btn-gold mt-9">Contact Our Team <ArrowRight className="h-4 w-4" /></Link>
      </Reveal>
    </section>
  );
}

export function Stats() {
  const { data } = useStore();
  return (
    <section className="bg-primary py-20">
      <div className="container-x">
        <div className="grid gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
          {data.stats.map((s) => (
            <div key={s.id} className="border-primary-foreground/10 lg:border-r lg:last:border-0">
              <p className="font-display text-5xl text-gold"><Counter to={Number(s.value)} suffix={s.suffix} /></p>
              <p className="mt-3 text-sm uppercase tracking-widest text-primary-foreground/80">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-xs text-primary-foreground/50">Illustrative demo figures — editable from the admin panel.</p>
      </div>
    </section>
  );
}

export function Testimonials() {
  const { data } = useStore();
  const t = data.testimonials;
  const [i, setI] = useState(0);
  useEffect(() => { const x = setInterval(() => setI((v) => (v + 1) % Math.max(1, t.length)), 7000); return () => clearInterval(x); }, [t.length]);
  const c = t[i] ?? t[0];
  if (!c) return null;
  return (
    <section className="py-24">
      <div className="container-x">
        <SectionHead eyebrow="Client Testimonials" title="What our clients say" text="Sample testimonials shown for demonstration." />
        <div className="relative mx-auto max-w-3xl border bg-surface p-10 text-center md:p-14">
          <Quote className="mx-auto h-10 w-10 text-gold" />
          <p key={c.id} className="mt-6 animate-in fade-in font-display text-xl leading-relaxed text-primary md:text-2xl">"{c.text}"</p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Img src={c.avatar} alt={c.name} className="h-14 w-14 rounded-full object-cover" />
            <div className="text-left"><p className="font-bold text-primary">{c.name}</p><p className="text-sm text-muted-foreground">{c.company}</p></div>
          </div>
          <div className="mt-8 flex justify-center gap-2">{t.map((x, k) => <button key={x.id} onClick={() => setI(k)} aria-label={`Testimonial ${k + 1}`} className={`h-2 rounded-full transition-all ${k === i ? "w-8 bg-gold" : "w-2 bg-border"}`} />)}</div>
        </div>
      </div>
    </section>
  );
}

export function BlogGrid({ limit }: { limit?: number }) {
  const { data } = useStore();
  const list = limit ? data.blogs.slice(0, limit) : data.blogs;
  return (
    <section className="bg-surface py-24">
      <div className="container-x">
        <SectionHead eyebrow="Tax & Accounting Knowledge" title="Financial Knowledge for Smarter Business Decisions" />
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {list.map((b) => (
            <Reveal key={b.id} className="group card-lift flex flex-col bg-background">
              <div className="overflow-hidden"><Img src={b.image} alt={b.title} className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
              <div className="flex flex-1 flex-col p-7">
                <div className="flex items-center gap-3 text-xs"><span className="bg-gold-soft px-2.5 py-1 font-bold text-primary">{b.category}</span><span className="text-muted-foreground">{fmtDate(b.date)}</span></div>
                <h3 className="mt-4 text-xl">{b.title}</h3>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{b.excerpt}</p>
                <Link to="/insights/$slug" params={{ slug: b.slug }} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-gold">Read More <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </Reveal>
          ))}
        </div>
        {limit && <div className="mt-12 text-center"><Link to="/insights" className="btn-navy">All Articles</Link></div>}
      </div>
    </section>
  );
}

export function Faq() {
  const { data } = useStore();
  const [open, setOpen] = useState(0);
  return (
    <section className="py-24">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <SectionHead center={false} eyebrow="FAQ" title="Frequently asked questions" text="Can't find what you're looking for? Our team is happy to help." />
        <div className="divide-y border-y">
          {data.faqs.map((f, k) => (
            <div key={f.id ?? f.q}>
              <button className="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold text-primary" onClick={() => setOpen(open === k ? -1 : k)} aria-expanded={open === k}>
                {f.q}{open === k ? <Minus className="h-5 w-5 shrink-0 text-gold" /> : <Plus className="h-5 w-5 shrink-0 text-gold" />}
              </button>
              <div className={`grid transition-all duration-300 ${open === k ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}><p className="overflow-hidden text-sm text-muted-foreground">{f.a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactBlock() {
  const { data, update } = useStore();
  const s = data.settings;
  const empty = { name: "", phone: "", email: "", businessType: "", service: "", message: "" };
  const [f, setF] = useState(empty);
  const [err, setErr] = useState<Partial<Record<keyof typeof empty, string>>>({});
  const [done, setDone] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: typeof err = {};
    if (f.name.trim().length < 2) er.name = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) er.email = "Enter a valid email";
    if (!/^(\+91[\s-]?)?[6-9]\d{9}$/.test(f.phone.replace(/[\s-]/g, ""))) er.phone = "Enter a valid 10-digit mobile number";
    if (!f.businessType) er.businessType = "Select your business type";
    if (!f.service) er.service = "Select a service";
    if (f.message.trim().length < 10) er.message = "Message should be at least 10 characters";
    setErr(er);
    if (Object.keys(er).length) return;
    update("inquiries", [{ id: String(Date.now()), ...f, status: "New", date: new Date().toISOString().slice(0, 10) }, ...data.inquiries], `New inquiry from ${f.name}`);
    setF(empty); setDone(true);
  };
  const field = (k: keyof typeof f, label: string, type = "text") => (
    <label className="block"><span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-primary">{label}</span>
      <input type={type} className="field" value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} />
      {err[k] && <span className="mt-1 block text-xs text-destructive">{err[k]}</span>}</label>
  );
  const select = (k: keyof typeof f, label: string, opts: string[], ph: string) => (
    <label className="block"><span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-primary">{label}</span>
      <select className="field" value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })}>
        <option value="">{ph}</option>{opts.map((o) => <option key={o}>{o}</option>)}
      </select>{err[k] && <span className="mt-1 block text-xs text-destructive">{err[k]}</span>}</label>
  );
  return (
    <section className="py-24">
      <div className="container-x grid gap-0 shadow-2xl lg:grid-cols-[1fr_1.6fr]">
        <div className="bg-primary p-10 text-primary-foreground md:p-12">
          <span className="eyebrow">Contact Us</span>
          <h2 className="mt-4 text-3xl text-primary-foreground">Send us your service inquiry</h2>
          <p className="mt-4 text-sm text-primary-foreground/70">Share your requirement and our team will get back to you. Contact details below are placeholders.</p>
          <ul className="mt-10 space-y-6 text-sm">
            {[[Phone, "Phone", s.phone], [Mail, "Email", s.email], [MapPin, "Office", s.address]].map(([I, l, v]) => {
              const C = I as typeof Phone;
              return <li key={l as string} className="flex gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center border border-gold/50 text-gold"><C className="h-5 w-5" /></span><span><b className="block text-gold">{l as string}</b>{v as string}</span></li>;
            })}
          </ul>
          <p className="mt-10 text-xs text-primary-foreground/50">{s.hours}</p>
        </div>
        <div className="bg-background p-10 md:p-12">
          {done ? (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-gold-soft text-primary"><Check className="h-8 w-8" /></div>
              <h3 className="mt-6 text-2xl">Thank you — inquiry recorded</h3>
              <p className="mt-3 max-w-sm text-sm text-muted-foreground">This is a demo: your inquiry is saved in this browser and visible in the admin panel. No message has been delivered.</p>
              <button onClick={() => setDone(false)} className="btn-navy mt-8">Send another</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
              {field("name", "Full Name")}{field("phone", "Mobile Number", "tel")}{field("email", "Email Address", "email")}
              {select("businessType", "Business Type", businessTypes, "Select business type")}
              <div className="sm:col-span-2">{select("service", "Required Service", serviceOptions, "Select a service")}</div>
              <label className="block sm:col-span-2"><span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-primary">Message</span>
                <textarea rows={5} className="field" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} />
                {err.message && <span className="mt-1 block text-xs text-destructive">{err.message}</span>}</label>
              <div className="sm:col-span-2"><button type="submit" className="btn-navy">Submit Inquiry <ArrowRight className="h-4 w-4" /></button></div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
