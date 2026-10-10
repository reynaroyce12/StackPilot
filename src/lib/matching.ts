import type { Technology } from "@/types/technology";
import type { Integration } from "@/types/integration";

export interface IntegrationMatch {
  integration: Integration;
  status: "detected" | "not_detected";
  matchedTechnology: Technology | null;
  checklist: string[];
}

export function matchIntegrations(
  technologies: Technology[],
  integrations: Integration[]
): IntegrationMatch[] {
  return integrations.map((integration) => {
    const matchedTechnology =
      technologies.find((technology) =>
        integration.technologies.some(
          (name) =>
            name.toLowerCase().trim() ===
            technology.name.toLowerCase().trim()
        )
      ) ?? null;

    return {
      integration,
      status: matchedTechnology ? "detected" : "not_detected",
      matchedTechnology,
      checklist: integration.checklist,
    };
  });
}