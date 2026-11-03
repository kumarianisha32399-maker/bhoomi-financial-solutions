import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, Check, Clock, MapPin } from "lucide-react";
import { Img, Reveal, SectionHead } from "./ui";
import { useStore } from "@/lib/store";
import { careers } from "@/lib/data";

export function Gallery() {
  const { data } = useStore();
  if (!data.gallery.length) return null;
  return (
    <section className="py-24">
      <div className="container-x">
        <SectionHead eyebrow="Gallery" title="Inside our practice" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {data.gallery.map((g) => (
            <figure key={g.id} className="group overflow-hidden">
              <Img src={g.image} alt={g.caption} className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <figcaption className="mt-3 text-sm text-muted-foreground">{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function IndustryList() {
  const { data } = useStore();
  return (
    <section className="py-24">
      <div className="container-x space-y-20">
        {data.industries.map((x, k) => (
          <Reveal key={x.id}>
            <article id={x.id} className={`grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 ${k % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <Img src={x.image} alt={x.title} className="aspect-[16/10] w-full object-cover" />
              <div>
                <span className="eyebrow">Industry {String(k + 1).padStart(2, "0")}</span>
                <h2 className="mt-4 text-3xl font-medium">{x.title}</h2>
                <p className="mt-4 text-muted-foreground">{x.desc}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {["Accounting & MIS", "GST & tax compliance", "Audit support", "Financial advisory"].map((p) => <li key={p} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-gold" />{p}</li>)}
                </ul>
                <Link to="/contact" className="btn-navy mt-8">Discuss Your Requirement <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function CareerList() {
  const [applied, setApplied] = useState<string | null>(null);
  return (
    <section className="py-24">
      <div className="container-x">
        <SectionHead eyebrow="Open Positions" title="Grow with Bhoomi" text="Sample openings for demonstration. Applications are not submitted anywhere." />
        <div className="grid gap-6 md:grid-cols-2">
          {careers.map((c) => (
            <Reveal key={c.title} className="card-lift border p-8">
              <h3 className="text-2xl">{c.title}</h3>
              <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-gold" />{c.type}</span>
                <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-gold" />{c.location}</span>
                <span className="flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5 text-gold" />{c.exp}</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{c.desc}</p>
              <button onClick={() => setApplied(c.title)} className="btn-navy mt-6">{applied === c.title ? "Interest noted (demo)" : "Apply Now"}</button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const legal = {
  privacy: [
    ["Information we collect", "We collect information you provide through our inquiry forms, such as your name, email, phone number and message, solely to respond to your request."],
    ["How we use information", "Information is used to communicate with you about our services, to provide requested assistance and to improve our website."],
    ["Confidentiality", "As a firm handling financial and tax matters, we treat all client information as strictly confidential and do not sell or share it with third parties except where required by law."],
    ["Data security", "We take reasonable technical and organisational measures to protect your information against unauthorised access."],
    ["Contact", "For any questions about this policy, please reach out through our Contact page."],
  ],
  terms: [
    ["Use of website", "The content on this website is for general information only and does not constitute professional, tax or legal advice."],
    ["No client relationship", "Using this website or submitting an inquiry does not create a professional engagement. Engagements are confirmed only through a written engagement letter."],
    ["Intellectual property", "All content, design and text on this website are the property of Bhoomi Business Solutions unless stated otherwise."],
    ["Limitation of liability", "We are not liable for any loss arising from reliance on information on this website without obtaining specific professional advice."],
    ["Changes", "These terms may be updated from time to time. Continued use of the website indicates acceptance of the revised terms."],
  ],
};

export function Legal({ kind }: { kind: "privacy" | "terms" }) {
  return (
    <section className="py-20">
      <div className="container-x max-w-3xl space-y-10">
        <p className="text-sm text-muted-foreground">Last updated: November 2026 · Sample legal text for demonstration — have it reviewed before going live.</p>
        {legal[kind].map(([h, t], k) => <div key={h}><h2 className="text-2xl">{k + 1}. {h}</h2><p className="mt-3 text-muted-foreground">{t}</p></div>)}
      </div>
    </section>
  );
}
