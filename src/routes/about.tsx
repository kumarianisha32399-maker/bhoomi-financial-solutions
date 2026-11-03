import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero, meta } from "@/components/site/ui";
import { u } from "@/lib/data";
import { AboutBlock, BlogGrid, ContactBlock, CtaBand, Faq, IndustriesGrid, ProcessSteps, ServicesGrid, Stats, Testimonials, WhyGrid } from "@/components/site/sections";
import { Gallery } from "@/components/site/Gallery";

export const Route = createFileRoute("/about")({
  head: () => meta("About Us", "A CA and accounting services firm built on integrity, precision and long-term client relationships."),
  component: () => (
    <SiteLayout>
      <PageHero title="About Us" crumb="About Us" image={u("1568992687947-868a62a9f521", 1920)} text="A CA and accounting services firm built on integrity, precision and long-term client relationships." />
      <AboutBlock full /><Stats /><WhyGrid /><Gallery /><CtaBand />
    </SiteLayout>
  ),
});
