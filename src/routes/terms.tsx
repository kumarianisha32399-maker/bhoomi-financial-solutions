import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero, meta } from "@/components/site/ui";
import { u } from "@/lib/data";
import { Legal } from "@/components/site/Gallery";

export const Route = createFileRoute("/terms")({
  head: () => meta("Terms & Conditions", "Terms governing the use of the Bhoomi Business Solutions website."),
  component: () => (
    <SiteLayout>
      <PageHero title="Terms &amp; Conditions" crumb="Terms" image={u("1589829545856-d10d557cf95f", 1920)} text="Terms governing the use of the Bhoomi Business Solutions website." />
      <Legal kind="terms" />
    </SiteLayout>
  ),
});
