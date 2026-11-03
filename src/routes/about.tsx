import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero, meta } from "@/components/site/ui";
import { u } from "@/lib/data";
import { AboutBlock, BlogGrid, ContactBlock, CtaBand, Faq, IndustriesGrid, ProcessSteps, ServicesGrid, Stats, Testimonials, WhyGrid } from "@/components/site/sections";
import { Gallery } from "@/components/site/Gallery";

export const Route = createFileRoute("/about")({
  head: () => meta("About Us", "Accounting, taxation, GST and financial documentation services for individuals, startups and businesses."),
  component: () => (
    <SiteLayout>
      <PageHero title="About Us" crumb="About Us" image={u("1568992687947-868a62a9f521", 1920)} text="Accounting, taxation, GST and financial documentation services for individuals, startups and businesses." />
      <AboutBlock full /><Stats /><WhyGrid /><Gallery /><CtaBand />
    </SiteLayout>
  ),
});
