import { Database } from "lucide-react";
import * as simpleIcons from "simple-icons";
import type { SimpleIcon } from "simple-icons";

import IntegrationLogo from "@/components/IntegrationLogo";

const integrationIds: Record<string, string> = {
  "Amazon Web Services": "aws",
  "Microsoft Azure": "azure",
  Salesforce: "salesforce",
  HubSpot: "hubspot",
  Zendesk: "zendesk",
};

const deviconLogos: Record<string, string> = {
  "Azure DevOps": "azuredevops",
  "Google Cloud Platform": "googlecloud",
  "Microsoft SQL Server": "microsoftsqlserver",
  "Argo CD": "argocd",
};

const aliases: Record<string, string> = {
  Slack: "slack",
  "Google Analytics 4": "googleanalytics",
  "Google Cloud Platform": "googlecloud",
  "Microsoft 365": "microsoft365",
  "Cisco Webex": "webex",
  "LinkedIn Recruiter": "linkedin",
  "Facebook Pixel": "facebook",
  "Reddit Ads": "reddit",
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

const iconList = Object.values(simpleIcons).filter(
  (icon): icon is SimpleIcon =>
    typeof icon === "object" &&
    icon !== null &&
    "title" in icon &&
    "path" in icon &&
    "hex" in icon
);

function findSimpleIcon(name: string): SimpleIcon | undefined {
  const lookup = aliases[name] ?? name;
  return iconList.find(
    (icon) => normalize(icon.title) === normalize(lookup)
  );
}

export default function TechnologyLogo({
  name,
}: {
  name: string;
}) {
  const integrationId = integrationIds[name];
  const devicon = deviconLogos[name];
  const icon = findSimpleIcon(name);

  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50">
      {integrationId ? (
        <IntegrationLogo id={integrationId} size={22} />
      ) : devicon ? (
        <img
          src={`/devicon/${devicon}.svg`}
          alt={`${name} logo`}
          width={22}
          height={22}
        />
      ) : icon ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill={`#${icon.hex}`}
          role="img"
          aria-label={`${icon.title} logo`}
        >
          <path d={icon.path} />
        </svg>
      ) : (
        <Database size={17} className="text-slate-400" />
      )}
    </div>
  );
}