import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Icon, Img, PageHero } from "@/components/site/ui";
import { CtaBand } from "@/components/site/sections";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/services/$slug")({
  head: ({ params }) => {
    const t = `${params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} | Bhoomi Business Solutions`;
    const d = "Professional CA, accounting and advisory services from Bhoomi Business Solutions.";
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }, { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  component: ServicePage,
});

function ServicePage() {
  const { slug } = Route.useParams();
  const { data, ready } = useStore();
  const s = data.services.find((x) => x.slug === slug);
  if (!s) return <SiteLayout><div className="container-x py-32 text-center">{ready ? <><h1 className="text-3xl">Service not found</h1><Link to="/services" className="btn-navy mt-6">All Services</Link></> : null}</div></SiteLayout>;
  return (
    <SiteLayout>
      <PageHero title={s.title} crumb="Our Services" image={s.image} text={s.desc} />
      <section className="py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_340px]">
          <article>
            <Img src={s.image} alt={s.title} className="aspect-[16/8] w-full object-cover" />
            <h2 className="mt-10 text-3xl font-medium">Overview</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{s.body}</p>
            <h3 className="mt-10 text-2xl">What's included</h3>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {s.points.map((p) => <li key={p} className="flex items-start gap-3 border bg-surface p-4 text-sm"><Check className="h-5 w-5 shrink-0 text-gold" />{p}</li>)}
            </ul>
            <Link to="/contact" className="btn-navy mt-10">Request this Service <ArrowRight className="h-4 w-4" /></Link>
          </article>
          <aside className="space-y-8">
            <div className="border bg-surface p-6">
              <h3 className="font-sans text-sm font-bold uppercase tracking-widest">All Services</h3>
              <ul className="mt-4 divide-y">
                {data.services.map((x) => (
                  <li key={x.id}><Link to="/services/$slug" params={{ slug: x.slug }} className={`flex items-center gap-3 py-3 text-sm ${x.slug === slug ? "font-bold text-primary" : "text-muted-foreground hover:text-primary"}`}><Icon name={x.icon} className="h-4 w-4 text-gold" />{x.title}</Link></li>
                ))}
              </ul>
            </div>
            <div className="bg-primary p-7 text-primary-foreground">
              <h3 className="text-xl text-primary-foreground">Need expert help?</h3>
              <p className="mt-2 text-sm text-primary-foreground/70">Talk to our team about your requirement.</p>
              <Link to="/contact" className="btn-gold mt-5">Get Consultation</Link>
            </div>
          </aside>
        </div>
      </section>
      <CtaBand />
    </SiteLayout>
  );
}
