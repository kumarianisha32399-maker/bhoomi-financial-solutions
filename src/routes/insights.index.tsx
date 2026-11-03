import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero, meta } from "@/components/site/ui";
import { u } from "@/lib/data";
import { AboutBlock, BlogGrid, ContactBlock, CtaBand, Faq, IndustriesGrid, ProcessSteps, ServicesGrid, Stats, Testimonials, WhyGrid } from "@/components/site/sections";

export const Route = createFileRoute("/insights/")({
  head: () => meta("Insights & Blogs", "Practical articles on taxation, accounting, compliance and business planning."),
  component: () => (
    <SiteLayout>
      <PageHero title="Insights &amp; Blogs" crumb="Insights" image={u("1434626881859-194d67b2b86f", 1920)} text="Practical articles on taxation, accounting, compliance and business planning." />
      <BlogGrid />
    </SiteLayout>
  ),
});
