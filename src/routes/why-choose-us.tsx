import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero, meta } from "@/components/site/ui";
import { u } from "@/lib/data";
import { AboutBlock, BlogGrid, ContactBlock, CtaBand, Faq, IndustriesGrid, ProcessSteps, ServicesGrid, Stats, Testimonials, WhyGrid } from "@/components/site/sections";

export const Route = createFileRoute("/why-choose-us")({
  head: () => meta("Why Choose Us", "Accuracy, organized records, timely assistance and a transparent working process."),
  component: () => (
    <SiteLayout>
      <PageHero title="Why Choose Us" crumb="Why Choose Us" image={u("1521737604893-d14cc237f11d", 1920)} text="Accuracy, organized records, timely assistance and a transparent working process." />
      <WhyGrid /><Stats /><Testimonials /><CtaBand />
    </SiteLayout>
  ),
});
