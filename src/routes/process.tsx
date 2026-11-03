import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero, meta } from "@/components/site/ui";
import { u } from "@/lib/data";
import { AboutBlock, BlogGrid, ContactBlock, CtaBand, Faq, IndustriesGrid, ProcessSteps, ServicesGrid, Stats, Testimonials, WhyGrid } from "@/components/site/sections";

export const Route = createFileRoute("/process")({
  head: () => meta("Our Process", "A structured four-step approach that keeps every engagement clear, accountable and on schedule."),
  component: () => (
    <SiteLayout>
      <PageHero title="Our Process" crumb="Our Process" image={u("1553877522-43269d4ea984", 1920)} text="A structured four-step approach that keeps every engagement clear, accountable and on schedule." />
      <ProcessSteps /><Faq /><CtaBand />
    </SiteLayout>
  ),
});
