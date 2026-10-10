const iconUrls: Record<string, string> = {
  aws: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
  azure: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  salesforce: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/salesforce/salesforce-original.svg",
  hubspot: "https://cdn.simpleicons.org/hubspot/FF7A59",
  zendesk: "https://cdn.simpleicons.org/zendesk/03363D",
};

export default function IntegrationLogo({
  id,
  size = 22,
}: {
  id: string;
  size?: number;
}) {
  const icon = iconUrls[id];

  if (!icon) return null;

  return (
    <img
      src={icon}
      alt={`${id} logo`}
      width={size}
      height={size}
      className="shrink-0 object-contain"
    />
  );
}