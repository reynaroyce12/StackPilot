import type { Integration } from "@/types/integration";

export const integrations: Integration[] = [
  {
    id: "aws",
    name: "Amazon Web Services",
    category: "Cloud Infrastructure",
    description: "Connect cloud infrastructure and services.",
    technologies: ["Amazon Web Services", "AWS"],
    checklist: [
      "Identify the AWS account and target region",
      "Confirm IAM permissions and access requirements",
      "Configure authentication using approved credentials",
      "Validate connectivity with a test request",
    ],
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    category: "Cloud Infrastructure",
    description: "Connect Microsoft cloud services.",
    technologies: ["Microsoft Azure", "Azure"],
    checklist: [
      "Identify the Azure tenant and subscription",
      "Register or identify the required application",
      "Configure access permissions and authentication",
      "Validate connectivity to the target service",
    ],
  },
  {
    id: "salesforce",
    name: "Salesforce",
    category: "CRM",
    description: "Connect Salesforce CRM workflows.",
    technologies: ["Salesforce"],
    checklist: [
      "Confirm Salesforce edition and API availability",
      "Identify the integration user and required permissions",
      "Configure OAuth authentication",
      "Test access to the required CRM objects",
    ],
  },
  {
    id: "hubspot",
    name: "HubSpot",
    category: "CRM",
    description: "Connect HubSpot CRM data.",
    technologies: ["HubSpot"],
    checklist: [
      "Confirm HubSpot account and required scopes",
      "Configure an approved authentication method",
      "Map required CRM properties",
      "Validate access using a test API request",
    ],
  },
  {
    id: "zendesk",
    name: "Zendesk",
    category: "Customer Support",
    description: "Connect customer support workflows.",
    technologies: ["Zendesk"],
    checklist: [
      "Confirm Zendesk account and subdomain",
      "Identify required API permissions",
      "Configure authentication securely",
      "Test access to tickets and user records",
    ],
  },
];