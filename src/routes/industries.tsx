import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero, meta } from "@/components/site/ui";
import { u } from "@/lib/data";
import { AboutBlock, BlogGrid, ContactBlock, CtaBand, Faq, IndustriesGrid, ProcessSteps, ServicesGrid, Stats, Testimonials, WhyGrid } from "@/components/site/sections";
import { IndustryList } from "@/components/site/Gallery";

export const Route = createFileRoute("/industries")({
  head: () => meta("Industries We Serve", "Accounting, GST and tax support for small businesses, startups, traders, manufacturers, LLPs, companies and professionals."),
  component: () => (
    <SiteLayout>
      <PageHero title="Industries We Serve" crumb="Industries" image={u("1486406146926-c627a92ad1ab", 1920)} text="Accounting, GST and tax support for small businesses, startups, traders, manufacturers, LLPs, companies and professionals." />
      <IndustryList /><CtaBand />
    </SiteLayout>
  ),
});
