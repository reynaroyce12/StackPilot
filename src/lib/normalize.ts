import rawData from "@/data/databricks.json";
import type { CompanyProfile, Technology } from "@/types/technology";

const categories: Record<string, string> = {
  "HR": "Human Resources",
  "CRM": "CRM",
  "ERP": "ERP",
  "Finance": "Finance",
  "Support": "Support",
  "Security": "Security",
  "Dev Tools": "Developer Tools",
  "Marketing": "Marketing",
  "Communication": "Communication",
  "Data Management": "Data Management",
};

function normalizeName(name: string): string {
  return name
    .replace(/\s*\([^)]*\)/g, "")
    .trim()
    .toLowerCase();
}

function parseDetectionData(
  input: string
): Map<string, { firstDetected: string | null; evidence: string[] }> {
  const results = new Map();

  for (const block of input.split(/\n\s*\n/)) {
    const lines = block.split("\n").map(line => line.trim());

    const name = lines[0];
    if (!name) continue;

    const date = lines.find(line => line.startsWith("First Detected:"));
    const providers = lines.find(line => line.startsWith("Providers:"));

    results.set(normalizeName(name), {
      firstDetected: date?.split(":").slice(1).join(":").trim() || null,
      evidence: providers
        ? providers.replace("Providers:", "").split(",").map(p => p.trim())
        : [],
    });
  }

  return results;
}

export function getCompanyProfile(): CompanyProfile {
  const data = rawData as Record<string, string | object>;
  const technologies: Technology[] = [];

  for (const [key, category] of Object.entries(categories)) {
    const providerList = data[`${key} Providers`];
    const detectionData = data[`${key} Detection Data`];

    if (typeof providerList !== "string" || !providerList.trim()) {
      continue;
    }

    const detections = parseDetectionData(
      typeof detectionData === "string" ? detectionData : ""
    );

    for (const provider of providerList.split(",")) {
      const name = provider.trim();
      if (!name) continue;

      const metadata = detections.get(normalizeName(name));

      technologies.push({
        id: `${key}-${normalizeName(name).replace(/[^a-z0-9]+/g, "-")}`,
        name,
        category,
        firstDetected: metadata?.firstDetected ?? null,
        evidence: metadata?.evidence ?? [],
      });
    }
  }

  return {
    name: "Databricks",
    domain: "databricks.com",
    technologies,
  };
}