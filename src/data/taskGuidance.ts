export interface TaskGuidance {
  description: string;
  details: string;
}

export const taskGuidance: Record<string, TaskGuidance[]> = {
  aws: [
    {
      description: "Confirm the target AWS account and primary region.",
      details:
        "Identify the AWS account ID, intended region, and services involved in the integration.",
    },
    {
      description: "Verify access follows least-privilege principles.",
      details:
        "Determine which IAM policies and permissions are required. Avoid granting broader access than necessary.",
    },
    {
      description: "Use an approved authentication method.",
      details:
        "Prefer temporary credentials or IAM roles where appropriate. Never store credentials in application source code.",
    },
    {
      description: "Run a test request against the target AWS service.",
      details:
        "Verify that authentication, permissions, and network connectivity work for the intended API operation.",
    },
  ],

  azure: [
    {
      description: "Confirm the Azure tenant and subscription.",
      details:
        "Record the tenant ID, subscription ID, target resource group, and relevant service.",
    },
    {
      description: "Identify the application or managed identity.",
      details:
        "Determine whether an existing application registration or managed identity can be used.",
    },
    {
      description: "Review required roles and authentication settings.",
      details:
        "Verify the appropriate Azure RBAC assignments and credentials for the target service.",
    },
    {
      description: "Test access to the intended Azure resource.",
      details:
        "Perform an authorized test operation to validate authentication, permissions, and connectivity.",
    },
  ],

  salesforce: [
    {
      description: "Check organization settings and API access.",
      details:
        "Confirm the Salesforce edition, available API access, and the environment being integrated.",
    },
    {
      description: "Identify the integration user and access scope.",
      details:
        "Determine the required user permissions and object-level access.",
    },
    {
      description: "Configure the approved OAuth flow.",
      details:
        "Set up the appropriate connected app or external client application and authentication configuration.",
    },
    {
      description: "Verify access to the necessary CRM objects.",
      details:
        "Test authorized operations against the required Salesforce objects and fields.",
    },
  ],

  hubspot: [
    {
      description: "Identify the HubSpot account and required permissions.",
      details:
        "Confirm the target account and the OAuth scopes or private-app permissions required.",
    },
    {
      description: "Set up secure API authentication.",
      details:
        "Use an approved OAuth or private-app authentication method appropriate to the integration.",
    },
    {
      description: "Identify required CRM properties.",
      details:
        "Document relevant contact, company, deal, or custom properties and their expected mappings.",
    },
    {
      description: "Validate the integration with a test request.",
      details:
        "Test access to the intended CRM endpoint using authorized credentials.",
    },
  ],

  zendesk: [
    {
      description: "Identify the Zendesk account and subdomain.",
      details:
        "Confirm the target Zendesk instance and the relevant support products.",
    },
    {
      description: "Review API permissions.",
      details:
        "Determine the permissions required for the tickets, users, and other resources involved.",
    },
    {
      description: "Configure approved API authentication.",
      details:
        "Select an appropriate authentication method and avoid exposing credentials in client-side code.",
    },
    {
      description: "Validate access to support records.",
      details:
        "Perform an authorized test request against the relevant Zendesk API endpoints.",
    },
  ],
};