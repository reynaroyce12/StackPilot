export interface TechnicalRequirement {
  label: string;
  detail: string;
}

export const technicalRequirements: Record<
  string,
  TechnicalRequirement[]
> = {
  aws: [
    {
      label: "AWS account",
      detail: "Account identifier and target AWS region",
    },
    {
      label: "IAM permissions",
      detail: "Approved access to the required AWS services",
    },
    {
      label: "Authentication",
      detail: "IAM role or another approved credential method",
    },
    {
      label: "Connectivity",
      detail: "Access to the intended AWS API endpoints",
    },
  ],

  azure: [
    {
      label: "Azure subscription",
      detail: "Tenant ID and target subscription",
    },
    {
      label: "Application identity",
      detail: "Registered application or managed identity",
    },
    {
      label: "Access control",
      detail: "Required Azure role assignments and permissions",
    },
    {
      label: "Connectivity",
      detail: "Access to the target Azure service",
    },
  ],

  salesforce: [
    {
      label: "Salesforce organization",
      detail: "Organization and edition information",
    },
    {
      label: "API access",
      detail: "API availability and appropriate user permissions",
    },
    {
      label: "OAuth configuration",
      detail: "Approved connected-app authentication setup",
    },
    {
      label: "CRM object access",
      detail: "Permissions for the required Salesforce objects",
    },
  ],

  hubspot: [
    {
      label: "HubSpot account",
      detail: "Target account and relevant product access",
    },
    {
      label: "Authentication",
      detail: "Approved OAuth or private-app authentication",
    },
    {
      label: "API scopes",
      detail: "Permissions appropriate for required CRM operations",
    },
    {
      label: "Property mapping",
      detail: "Required contact, company, or deal properties",
    },
  ],

  zendesk: [
    {
      label: "Zendesk account",
      detail: "Account subdomain and relevant product access",
    },
    {
      label: "API permissions",
      detail: "Required permissions for tickets and users",
    },
    {
      label: "Authentication",
      detail: "An approved Zendesk API authentication method",
    },
    {
      label: "Data access",
      detail: "Access to the necessary support records",
    },
  ],
};