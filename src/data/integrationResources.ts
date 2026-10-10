export interface IntegrationResource {
  title: string;
  url: string;
}

export const integrationResources: Record<
  string,
  IntegrationResource[]
> = {
  aws: [
    {
      title: "AWS IAM Best Practices",
      url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html",
    },
    {
      title: "AWS IAM API Reference",
      url: "https://docs.aws.amazon.com/IAM/latest/APIReference/Welcome.html",
    },
  ],
  azure: [
    {
      title: "Azure Role-Based Access Control",
      url: "https://learn.microsoft.com/en-us/azure/role-based-access-control/overview",
    },
    {
      title: "Microsoft Entra Authentication",
      url: "https://learn.microsoft.com/en-us/entra/identity/authentication/overview-authentication",
    },
  ],
  salesforce: [
    {
      title: "Salesforce OAuth & API Access",
      url: "https://developer.salesforce.com/docs/platform/api-rest/guide/intro-oauth-and-connected-apps.html",
    },
  ],
  hubspot: [
    {
      title: "HubSpot API Reference",
      url: "https://developers.hubspot.com/docs/api-reference/latest/overview",
    },
  ],
  zendesk: [
    {
      title: "Zendesk API Reference",
      url: "https://developer.zendesk.com/api-reference/",
    },
  ],
};