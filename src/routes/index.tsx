import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { meta } from "@/components/site/ui";
import { AboutBlock, BlogGrid, ContactBlock, CtaBand, Faq, Hero, Highlights, IndustriesGrid, ProcessSteps, ServicesGrid, Stats, Testimonials, WhyGrid } from "@/components/site/sections";

export const Route = createFileRoute("/")({
  head: () => meta("CA, Tax & Accounting Services", "Bhoomi Business Solutions offers accounting, GST, income tax, audit, company registration and business advisory services."),
  component: () => (
    <SiteLayout>
      <Hero /><Highlights /><AboutBlock /><WhyGrid /><ServicesGrid limit={6} /><IndustriesGrid /><ProcessSteps /><CtaBand /><Stats /><Testimonials /><BlogGrid limit={3} /><Faq /><ContactBlock />
    </SiteLayout>
  ),
});
