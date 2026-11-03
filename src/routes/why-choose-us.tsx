import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero, meta } from "@/components/site/ui";
import { u } from "@/lib/data";
import { AboutBlock, BlogGrid, ContactBlock, CtaBand, Faq, IndustriesGrid, ProcessSteps, ServicesGrid, Stats, Testimonials, WhyGrid } from "@/components/site/sections";

export const Route = createFileRoute("/why-choose-us")({
  head: () => meta("Why Choose Us", "Experienced professionals, transparent fees and dependable support for every stage of your business."),
  component: () => (
    <SiteLayout>
      <PageHero title="Why Choose Us" crumb="Why Choose Us" image={u("1521737604893-d14cc237f11d", 1920)} text="Experienced professionals, transparent fees and dependable support for every stage of your business." />
      <WhyGrid /><Stats /><Testimonials /><CtaBand />
    </SiteLayout>
  ),
});
