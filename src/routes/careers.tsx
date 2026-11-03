import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero, meta } from "@/components/site/ui";
import { u } from "@/lib/data";
import { CareerList } from "@/components/site/Gallery";

export const Route = createFileRoute("/careers")({
  head: () => meta("Careers", "Build your career in accounting, taxation and advisory with a growing professional team."),
  component: () => (
    <SiteLayout>
      <PageHero title="Careers" crumb="Careers" image={u("1522071820081-009f0129c71c", 1920)} text="Build your career in accounting, taxation and advisory with a growing professional team." />
      <CareerList />
    </SiteLayout>
  ),
});
