import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero, meta } from "@/components/site/ui";
import { u } from "@/lib/data";
import { AboutBlock, BlogGrid, ContactBlock, CtaBand, Faq, IndustriesGrid, ProcessSteps, ServicesGrid, Stats, Testimonials, WhyGrid } from "@/components/site/sections";

export const Route = createFileRoute("/services/")({
  head: () => meta("Our Services", "Accounting, GST, income tax, audit, ROC compliance, payroll and financial advisory services."),
  component: () => (
    <SiteLayout>
      <PageHero title="Our Services" crumb="Our Services" image={u("1460925895917-afdab827c52f", 1920)} text="Accounting, GST, income tax, audit, ROC compliance, payroll and financial advisory services." />
      <ServicesGrid /><ProcessSteps /><CtaBand />
    </SiteLayout>
  ),
});
