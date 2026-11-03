import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { meta } from "@/components/site/ui";
import { AboutBlock, BlogGrid, CareGrid, ContactBlock, CtaBand, Faq, Hero, Highlights, IndustriesGrid, ProcessSteps, ServicesGrid, Stats, Testimonials, WhyGrid } from "@/components/site/sections";

export const Route = createFileRoute("/")({
  head: () => meta("Accounting, GST, Taxation & Financial Services", "Bhoomi Business Solutions offers bookkeeping, GST registration and return filing, income tax and TDS filing, business registration, payroll and financial documentation services."),
  component: () => (
    <SiteLayout>
      <Hero /><Highlights /><AboutBlock /><ServicesGrid limit={6} /><CareGrid /><IndustriesGrid /><ProcessSteps /><WhyGrid /><CtaBand /><Stats /><Testimonials /><BlogGrid limit={3} /><Faq /><ContactBlock />
    </SiteLayout>
  ),
});
