import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Briefcase, Factory, FileText, Image, Inbox, LayoutDashboard, LogOut, MessageSquare, Menu, Settings, Stamp, Globe, Trash2, Plus, Pencil, X } from "lucide-react";
import { Logo, meta } from "@/components/site/ui";
import { auth, useStore } from "@/lib/store";
import type { SiteData } from "@/lib/data";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => meta("Admin Dashboard", "Manage Bhoomi Business Solutions website content (demo)."),
  component: Admin,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObj = any;
type F = { k: string; label: string; type?: "text" | "textarea" | "image" | "number" | "select" | "list"; options?: string[] };
const tabs = [
  ["dashboard", "Dashboard", LayoutDashboard], ["website", "Website Content", Globe], ["services", "Services", Briefcase], ["industries", "Industries", Factory],
  ["testimonials", "Testimonials", MessageSquare], ["blogs", "Blogs", FileText], ["gallery", "Gallery", Image], ["inquiries", "Inquiries", Inbox],
  ["settings", "Website Settings", Settings], ["logo", "Logo Settings", Stamp],
] as const;
type Tab = (typeof tabs)[number][0];

const slugify = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function Admin() {
  const nav = useNavigate();
  const [ok, setOk] = useState(false);
  const [tab, setTab] = useState<Tab>("dashboard");
  const [side, setSide] = useState(false);
  useEffect(() => { if (!auth.isIn()) nav({ to: "/admin/login" }); else setOk(true); }, [nav]);
  if (!ok) return null;
  return (
    <div className="min-h-screen bg-surface lg:grid lg:grid-cols-[260px_1fr]">
      <aside className={`fixed inset-y-0 left-0 z-40 w-[260px] bg-primary p-6 transition-transform lg:static lg:translate-x-0 ${side ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between"><Logo light /><button className="text-primary-foreground lg:hidden" onClick={() => setSide(false)} aria-label="Close menu"><X /></button></div>
        <nav className="mt-10 space-y-1">
          {tabs.map(([k, l, I]) => (
            <button key={k} onClick={() => { setTab(k); setSide(false); }} className={`flex w-full items-center gap-3 px-3 py-2.5 text-sm ${tab === k ? "bg-gold text-primary font-bold" : "text-primary-foreground/75 hover:bg-navy-2"}`}><I className="h-4 w-4" />{l}</button>
          ))}
        </nav>
      </aside>
      <div className="min-w-0">
        <header className="flex h-16 items-center justify-between border-b bg-background px-5">
          <div className="flex items-center gap-3"><button className="lg:hidden" onClick={() => setSide(true)} aria-label="Open menu"><Menu /></button><h1 className="text-xl">{tabs.find((t) => t[0] === tab)?.[1]}</h1></div>
          <div className="flex items-center gap-3">
            <Link to="/" className="hidden text-sm text-muted-foreground hover:text-primary sm:block">View Website</Link>
            <button onClick={() => { auth.logout(); nav({ to: "/admin/login" }); }} className="btn-navy !py-2"><LogOut className="h-4 w-4" />Logout</button>
          </div>
        </header>
        <div className="p-5 md:p-8"><Panel tab={tab} setTab={setTab} /></div>
      </div>
    </div>
  );
}

function Panel({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  const { data } = useStore();
  switch (tab) {
    case "dashboard": return <Dash setTab={setTab} />;
    case "website": return <Website />;
    case "services": return <ListEditor k="services" title="title" fields={[{ k: "title", label: "Title" }, { k: "icon", label: "Icon name (lucide)" }, { k: "desc", label: "Short description", type: "textarea" }, { k: "body", label: "Detailed description", type: "textarea" }, { k: "points", label: "Included points (one per line)", type: "list" }, { k: "image", label: "Image", type: "image" }]} make={(v) => ({ ...v, id: v.id || slugify(v.title), slug: v.slug || slugify(v.title) })} />;
    case "industries": return <ListEditor k="industries" title="title" fields={[{ k: "title", label: "Title" }, { k: "desc", label: "Description", type: "textarea" }, { k: "image", label: "Image", type: "image" }]} make={(v) => ({ ...v, id: v.id || slugify(v.title) })} />;
    case "testimonials": return <ListEditor k="testimonials" title="name" fields={[{ k: "name", label: "Client name" }, { k: "company", label: "Company" }, { k: "text", label: "Testimonial", type: "textarea" }, { k: "avatar", label: "Avatar", type: "image" }]} />;
    case "blogs": return <><BlogCats /><ListEditor k="blogs" title="title" fields={[{ k: "title", label: "Title" }, { k: "category", label: "Category", type: "select", options: data.blogCategories }, { k: "date", label: "Date (YYYY-MM-DD)" }, { k: "excerpt", label: "Short description", type: "textarea" }, { k: "body", label: "Article body", type: "textarea" }, { k: "image", label: "Image", type: "image" }]} make={(v) => ({ ...v, id: v.id || slugify(v.title), slug: v.slug || slugify(v.title), date: v.date || new Date().toISOString().slice(0, 10) })} /></>;
    case "gallery": return <ListEditor k="gallery" title="caption" fields={[{ k: "caption", label: "Description" }, { k: "image", label: "Image", type: "image" }]} />;
    case "inquiries": return <Inquiries />;
    case "settings": return <Settings_ />;
    case "logo": return <LogoSettings />;
  }
}

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => <div className={`border bg-background p-6 ${className}`}>{children}</div>;

function Dash({ setTab }: { setTab: (t: Tab) => void }) {
  const { data, reset } = useStore();
  const stats = [["Total Services", data.services.length, "services"], ["Total Industries", data.industries.length, "industries"], ["Total Blogs", data.blogs.length, "blogs"], ["Total Inquiries", data.inquiries.length, "inquiries"]] as const;
  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([l, v, t]) => <button key={l} onClick={() => setTab(t)} className="card-lift border-l-4 border-gold bg-background p-6 text-left"><p className="text-xs uppercase tracking-wider text-muted-foreground">{l}</p><p className="mt-2 font-display text-4xl text-primary">{v}</p></button>)}
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <Card><h2 className="text-lg">Recent Inquiries</h2>
          <ul className="mt-4 divide-y text-sm">{data.inquiries.slice(0, 5).map((q) => <li key={q.id} className="flex justify-between gap-3 py-3"><span><b className="text-primary">{q.name}</b> · {q.service}</span><span className="text-xs text-muted-foreground">{q.status}</span></li>)}{!data.inquiries.length && <li className="py-3 text-muted-foreground">No inquiries yet.</li>}</ul>
        </Card>
        <Card><h2 className="text-lg">Recent Content Updates</h2>
          <ul className="mt-4 divide-y text-sm">{data.updates.slice(0, 6).map((x) => <li key={x.id} className="flex justify-between py-3"><span>{x.text}</span><span className="text-xs text-muted-foreground">{x.date}</span></li>)}</ul>
        </Card>
      </div>
      <Card><h2 className="text-lg">Website Overview</h2>
        <p className="mt-2 text-sm text-muted-foreground">{data.hero.length} hero slides · {data.testimonials.length} testimonials · {data.gallery.length} gallery images · {data.blogCategories.length} blog categories. All changes are stored in this browser only (demo).</p>
        <button onClick={() => confirm("Reset all content to defaults?") && reset()} className="mt-4 text-sm font-bold text-destructive">Reset demo content</button>
      </Card>
    </div>
  );
}

function ImageInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <input className="field" placeholder="Image URL" value={value} onChange={(e) => onChange(e.target.value)} />
      <input type="file" accept="image/*" className="text-xs" onChange={(e) => { const f = e.target.files?.[0]; if (!f) return; const r = new FileReader(); r.onload = () => onChange(String(r.result)); r.readAsDataURL(f); }} />
      {value && <img src={value} alt="Preview" className="h-20 w-32 object-cover" />}
    </div>
  );
}

function Fields({ fields, v, set }: { fields: F[]; v: AnyObj; set: (v: AnyObj) => void }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {fields.map((f) => (
        <label key={f.k} className={`block text-xs font-bold uppercase tracking-wider text-primary ${f.type === "textarea" || f.type === "list" || f.type === "image" ? "md:col-span-2" : ""}`}>
          {f.label}
          <div className="mt-1.5 font-normal normal-case tracking-normal">
            {f.type === "textarea" ? <textarea rows={4} className="field" value={v[f.k] ?? ""} onChange={(e) => set({ ...v, [f.k]: e.target.value })} />
              : f.type === "list" ? <textarea rows={4} className="field" value={(v[f.k] ?? []).join("\n")} onChange={(e) => set({ ...v, [f.k]: e.target.value.split("\n") })} />
              : f.type === "image" ? <ImageInput value={v[f.k] ?? ""} onChange={(x) => set({ ...v, [f.k]: x })} />
              : f.type === "select" ? <select className="field" value={v[f.k] ?? ""} onChange={(e) => set({ ...v, [f.k]: e.target.value })}><option value="">Select</option>{f.options?.map((o) => <option key={o}>{o}</option>)}</select>
              : <input type={f.type === "number" ? "number" : "text"} className="field" value={v[f.k] ?? ""} onChange={(e) => set({ ...v, [f.k]: f.type === "number" ? Number(e.target.value) : e.target.value })} />}
          </div>
        </label>
      ))}
    </div>
  );
}

function ListEditor({ k, fields, title, make = (v) => v }: { k: keyof SiteData; fields: F[]; title: string; make?: (v: AnyObj) => AnyObj }) {
  const { data, update } = useStore();
  const list = data[k] as unknown as AnyObj[];
  const [edit, setEdit] = useState<AnyObj | null>(null);
  const save = () => {
    if (!edit) return;
    const isNew = !edit.id;
    const item = make({ ...edit, points: edit.points?.filter?.(Boolean) });
    if (!item.id) item.id = String(Date.now());
    const next = isNew ? [...list, item] : list.map((x) => (x.id === edit.id ? item : x));
    update(k, next as never, `${isNew ? "Added" : "Updated"} ${String(k).replace(/s$/, "")}: ${item[title]}`);
    setEdit(null);
  };
  const del = (x: AnyObj) => { if (confirm(`Delete "${x[title]}"?`)) update(k, list.filter((y) => y.id !== x.id) as never, `Deleted ${String(k).replace(/s$/, "")}: ${x[title]}`); };
  return (
    <div className="space-y-5">
      <div className="flex justify-between"><p className="text-sm text-muted-foreground">{list.length} items</p><button className="btn-navy !py-2" onClick={() => setEdit({ points: [] })}><Plus className="h-4 w-4" />Add New</button></div>
      {edit && <Card className="border-gold"><Fields fields={fields} v={edit} set={setEdit} /><div className="mt-5 flex gap-3"><button className="btn-navy !py-2" onClick={save}>Save</button><button className="text-sm" onClick={() => setEdit(null)}>Cancel</button></div></Card>}
      <div className="grid gap-3">
        {list.map((x) => (
          <div key={x.id} className="flex items-center gap-4 border bg-background p-3">
            {(x.image || x.avatar) && <img src={x.image || x.avatar} alt="" className="h-14 w-20 shrink-0 object-cover" />}
            <div className="min-w-0 flex-1"><p className="truncate font-bold text-primary">{x[title]}</p><p className="truncate text-xs text-muted-foreground">{x.desc || x.text || x.excerpt || x.company || ""}</p></div>
            <button aria-label="Edit" onClick={() => setEdit(x)} className="p-2 hover:text-gold"><Pencil className="h-4 w-4" /></button>
            <button aria-label="Delete" onClick={() => del(x)} className="p-2 text-destructive"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlogCats() {
  const { data, update } = useStore();
  const [n, setN] = useState("");
  return (
    <Card className="mb-6"><h2 className="text-lg">Blog Categories</h2>
      <div className="mt-3 flex flex-wrap gap-2">{data.blogCategories.map((c) => <span key={c} className="flex items-center gap-2 bg-gold-soft px-3 py-1 text-sm">{c}<button aria-label={`Remove ${c}`} onClick={() => update("blogCategories", data.blogCategories.filter((x) => x !== c), `Removed category ${c}`)}><X className="h-3 w-3" /></button></span>)}</div>
      <div className="mt-4 flex gap-2"><input className="field max-w-xs" placeholder="New category" value={n} onChange={(e) => setN(e.target.value)} /><button className="btn-navy !py-2" onClick={() => { if (n.trim()) { update("blogCategories", [...data.blogCategories, n.trim()], `Added category ${n}`); setN(""); } }}>Add</button></div>
    </Card>
  );
}

function ObjEditor<K extends "about" | "settings">({ k, fields, heading }: { k: K; fields: F[]; heading: string }) {
  const { data, update } = useStore();
  const [v, setV] = useState<AnyObj>(data[k]);
  const [saved, setSaved] = useState(false);
  useEffect(() => setV(data[k]), [data, k]);
  return <Card><h2 className="mb-4 text-lg">{heading}</h2><Fields fields={fields} v={v} set={(x) => { setV(x); setSaved(false); }} /><button className="btn-navy mt-5 !py-2" onClick={() => { update(k, v as SiteData[K], `Updated ${heading}`); setSaved(true); }}>{saved ? "Saved ✓" : "Save Changes"}</button></Card>;
}

function Website() {
  return (
    <div className="space-y-8">
      <div><h2 className="mb-3 text-xl">Hero Slider</h2><ListEditor k="hero" title="title" fields={[{ k: "eyebrow", label: "Slide label" }, { k: "title", label: "Headline" }, { k: "text", label: "Description", type: "textarea" }, { k: "image", label: "Background image", type: "image" }]} /></div>
      <ObjEditor k="about" heading="About Section" fields={[{ k: "intro", label: "Introduction", type: "textarea" }, { k: "who", label: "Who We Are", type: "textarea" }, { k: "mission", label: "Mission", type: "textarea" }, { k: "vision", label: "Vision", type: "textarea" }, { k: "values", label: "Values", type: "textarea" }, { k: "image", label: "Image", type: "image" }]} />
      <div><h2 className="mb-3 text-xl">Business Highlights</h2><ListEditor k="highlights" title="title" fields={[{ k: "title", label: "Title" }, { k: "icon", label: "Icon name (lucide)" }, { k: "text", label: "Text", type: "textarea" }]} /></div>
      <div><h2 className="mb-3 text-xl">Statistics (demo figures)</h2><ListEditor k="stats" title="label" fields={[{ k: "label", label: "Label" }, { k: "value", label: "Value", type: "number" }, { k: "suffix", label: "Suffix (e.g. +)" }]} /></div>
      <ObjEditor k="settings" heading="Footer Information" fields={[{ k: "footerAbout", label: "Footer company introduction", type: "textarea" }]} />
    </div>
  );
}

function Settings_() {
  return <ObjEditor k="settings" heading="Website Settings" fields={[{ k: "siteName", label: "Website name" }, { k: "tagline", label: "Tagline" }, { k: "phone", label: "Phone" }, { k: "email", label: "Email" }, { k: "address", label: "Address", type: "textarea" }, { k: "hours", label: "Working hours" }, { k: "linkedin", label: "LinkedIn URL" }, { k: "facebook", label: "Facebook URL" }, { k: "instagram", label: "Instagram URL" }, { k: "twitter", label: "X / Twitter URL" }]} />;
}

function LogoSettings() {
  return (
    <div className="space-y-5">
      <Card><p className="text-sm text-muted-foreground">The official Bhoomi Business Solutions logo is live in the navbar, footer and admin. To replace it, upload a new logo or paste its URL below — it will update everywhere automatically. Clear the field to return to the default logo.</p><div className="mt-5 border bg-surface p-6"><Logo /></div></Card>
      <ObjEditor k="settings" heading="Approved Logo" fields={[{ k: "logoUrl", label: "Logo image", type: "image" }]} />
    </div>
  );
}

function Inquiries() {
  const { data, update } = useStore();
  const [view, setView] = useState<string | null>(null);
  const setStatus = (id: string, status: string) => update("inquiries", data.inquiries.map((q) => (q.id === id ? { ...q, status } : q)), "Updated inquiry status");
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">Demo inquiries stored in this browser.</p>
      {data.inquiries.map((q) => (
        <Card key={q.id} className="!p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="min-w-0 flex-1"><p className="font-bold text-primary">{q.name} <span className="font-normal text-muted-foreground">· {q.service}</span></p><p className="text-xs text-muted-foreground">{q.email} · {q.date}</p></div>
            <select className="field !w-auto !py-1.5" value={q.status} onChange={(e) => setStatus(q.id, e.target.value)}>{["New", "In Progress", "Resolved", "Closed"].map((s) => <option key={s}>{s}</option>)}</select>
            <button className="text-sm font-bold text-primary" onClick={() => setView(view === q.id ? null : q.id)}>{view === q.id ? "Hide" : "View"}</button>
            <button aria-label="Delete inquiry" className="text-destructive" onClick={() => confirm("Delete this inquiry?") && update("inquiries", data.inquiries.filter((x) => x.id !== q.id), "Deleted inquiry")}><Trash2 className="h-4 w-4" /></button>
          </div>
          {view === q.id && <div className="mt-4 border-t pt-4 text-sm"><p><b>Phone:</b> {q.phone}</p><p className="mt-2"><b>Message:</b> {q.message}</p></div>}
        </Card>
      ))}
      {!data.inquiries.length && <Card>No inquiries.</Card>}
    </div>
  );
}
