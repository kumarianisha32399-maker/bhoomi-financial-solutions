import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Img, PageHero, fmtDate } from "@/components/site/ui";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/insights/$slug")({
  head: ({ params }) => {
    const t = `${params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} | Bhoomi Insights`;
    const d = "Insights on taxation, accounting and compliance from Bhoomi Business Solutions.";
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }, { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  component: BlogPage,
});

function BlogPage() {
  const { slug } = Route.useParams();
  const { data, ready } = useStore();
  const b = data.blogs.find((x) => x.slug === slug);
  if (!b) return <SiteLayout><div className="container-x py-32 text-center">{ready ? <><h1 className="text-3xl">Article not found</h1><Link to="/insights" className="btn-navy mt-6">All Insights</Link></> : null}</div></SiteLayout>;
  const others = data.blogs.filter((x) => x.slug !== slug).slice(0, 3);
  return (
    <SiteLayout>
      <PageHero title={b.title} crumb={b.category} image={b.image} />
      <article className="container-x max-w-3xl py-20">
        <p className="text-sm text-muted-foreground"><span className="bg-gold-soft px-2.5 py-1 font-bold text-primary">{b.category}</span> <span className="ml-3">{fmtDate(b.date)}</span></p>
        <p className="mt-8 font-display text-xl text-primary">{b.excerpt}</p>
        {b.body.split("\n\n").map((p, k) => <p key={k} className="mt-6 leading-relaxed text-foreground/85">{p}</p>)}
        <Link to="/insights" className="mt-12 inline-flex items-center gap-2 font-bold text-primary hover:text-gold"><ArrowLeft className="h-4 w-4" /> Back to Insights</Link>
      </article>
      {others.length > 0 && (
        <section className="bg-surface py-16"><div className="container-x">
          <h2 className="text-2xl">Related articles</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {others.map((o) => <Link key={o.id} to="/insights/$slug" params={{ slug: o.slug }} className="group card-lift block bg-background"><Img src={o.image} alt={o.title} className="aspect-[16/10] w-full object-cover" /><div className="p-5"><p className="text-xs text-muted-foreground">{fmtDate(o.date)}</p><h3 className="mt-2 text-lg group-hover:text-gold">{o.title}</h3></div></Link>)}
          </div>
        </div></section>
      )}
    </SiteLayout>
  );
}
