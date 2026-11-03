import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero, meta } from "@/components/site/ui";
import { u } from "@/lib/data";
import { AboutBlock, BlogGrid, ContactBlock, CtaBand, Faq, IndustriesGrid, ProcessSteps, ServicesGrid, Stats, Testimonials, WhyGrid } from "@/components/site/sections";

export const Route = createFileRoute("/contact")({
  head: () => meta("Contact Us", "Speak with our team about accounting, tax, compliance or advisory requirements."),
  component: () => (
    <SiteLayout>
      <PageHero title="Contact Us" crumb="Contact Us" image={u("1497366216548-37526070297c", 1920)} text="Speak with our team about accounting, tax, compliance or advisory requirements." />
      <ContactBlock /><Faq />
    </SiteLayout>
  ),
});
