import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero, meta } from "@/components/site/ui";
import { u } from "@/lib/data";
import { Legal } from "@/components/site/Gallery";

export const Route = createFileRoute("/privacy-policy")({
  head: () => meta("Privacy Policy", "How Bhoomi Business Solutions collects, uses and protects your information."),
  component: () => (
    <SiteLayout>
      <PageHero title="Privacy Policy" crumb="Privacy Policy" image={u("1450101499163-c8848c66ca85", 1920)} text="How Bhoomi Business Solutions collects, uses and protects your information." />
      <Legal kind="privacy" />
    </SiteLayout>
  ),
});
