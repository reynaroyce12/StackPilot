import {
    CalendarDays,
    Database,
    ShieldCheck,
    Lightbulb,
    BookOpen,
    ExternalLink,
} from "lucide-react";

import type { IntegrationMatch } from "@/lib/matching";
import { technicalRequirements } from "@/data/requirements";
import { integrationResources } from "@/data/integrationResources";

interface Props {
    match: IntegrationMatch;
}

const integrationContext: Record<string, string> = {
    aws: "AWS infrastructure may require account access, service permissions, and secure authentication. This plan helps engineers prepare those requirements before implementation.",

    azure: "Azure integrations depend on the correct tenant, application identity, and resource permissions. Reviewing these early can reduce setup friction.",

    salesforce: "Salesforce integrations require API access, authentication, and appropriate CRM permissions. Preparing these details helps streamline technical onboarding.",

    hubspot: "HubSpot integrations often involve authentication scopes and CRM property mapping. Reviewing these requirements helps engineers plan data access.",

    zendesk: "Zendesk integrations typically require authorized API access to support resources. This checklist helps organize the necessary configuration steps.",
};

export default function IntegrationIntelligence({ match }: Props) {
    const technology = match.matchedTechnology;
    const evidence = technology?.evidence ?? [];

    const requirements =
        technicalRequirements[match.integration.id] ?? [];

    const resources =
        integrationResources[match.integration.id] ?? [];

    return (
        <div className="space-y-3">

            {/* DETECTION SUMMARY */}
            <section className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-2">
                    <Database size={17} className="text-blue-600" />
                    <h3 className="text-sm font-semibold text-slate-900">
                        Detection Summary
                    </h3>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="flex items-start gap-2">
                        <CalendarDays
                            size={17}
                            className="mt-0.5 shrink-0 text-slate-400"
                        />

                        <div>
                            <p className="text-xs text-slate-500">
                                First detected
                            </p>
                            <p className="mt-1 text-sm font-semibold text-slate-900">
                                {technology?.firstDetected ?? "Unknown"}
                            </p>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs text-slate-500">
                            Evidence sources
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">
                            {evidence.length}
                        </p>
                    </div>
                </div>

                <div className="mt-4 border-t border-slate-100 pt-3">
                    <p className="mb-2 text-xs font-medium text-slate-700">
                        Clay detection sources
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                        {evidence.length > 0 ? (
                            evidence.map((source, index) => {
                                const colors = [
                                    "bg-blue-50 text-blue-700",
                                    "bg-violet-50 text-violet-700",
                                    "bg-amber-50 text-amber-700",
                                    "bg-rose-50 text-rose-700",
                                ];

                                return (
                                    <span
                                        key={source}
                                        className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${colors[index % colors.length]
                                            }`}
                                    >
                                        {source}
                                    </span>
                                );
                            })
                        ) : (
                            <span className="text-xs text-slate-400">
                                No evidence provided
                            </span>
                        )}
                    </div>
                </div>
            </section>

            {/* WHY THIS MATTERS */}
            <section className="rounded-xl border border-blue-100 bg-blue-50/70 p-4">
                <div className="flex items-center gap-2">
                    <Lightbulb size={17} className="text-blue-600" />
                    <h3 className="text-sm font-semibold text-blue-900">
                        Why this matters
                    </h3>
                </div>

                <p className="mt-2 text-xs leading-5 text-slate-600">
                    {integrationContext[match.integration.id] ??
                        "Review technical prerequisites before starting integration work."}
                </p>
            </section>

            {/* REQUIREMENTS + RESOURCES */}
            <div className="grid grid-cols-1 items-stretch gap-3 @[520px]:grid-cols-[1.2fr_1fr]">

                <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-3">
                    <div className="flex items-center gap-2">
                        <ShieldCheck size={16} className="text-violet-600" />
                        <h3 className="text-xs font-semibold text-slate-900">
                            Technical Requirements
                        </h3>
                    </div>

                    <p className="mt-2 text-[11px] text-slate-500">
                        Illustrative prerequisites
                    </p>

                    <ul className="mt-2 space-y-1.5">
                        {requirements.map((requirement) => (
                            <li
                                key={requirement.label}
                                className="text-xs text-slate-700"
                                title={requirement.detail}
                            >
                                <span className="font-medium">
                                    • {requirement.label}
                                </span>

                                <p className="mt-0.5 text-[11px] leading-4 text-slate-500">
                                    {requirement.detail}
                                </p>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-3">
                    <div className="flex items-center gap-2">
                        <BookOpen size={16} className="text-blue-600" />
                        <h3 className="text-xs font-semibold text-slate-900">
                            Resources
                        </h3>
                    </div>

                    <p className="mt-2 text-[11px] text-slate-500">
                        Official technical documentation
                    </p>

                    <div className="mt-3 space-y-2">
                        {resources.map((resource) => (
                            <a
                                key={resource.url}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between gap-2 rounded-lg border border-slate-100 px-2 py-1.5 text-[11px] leading-4 text-blue-600 transition-colors hover:bg-blue-50"
                            >
                                <span>{resource.title}</span>
                                <ExternalLink
                                    size={13}
                                    className="shrink-0"
                                />
                            </a>
                        ))}
                    </div>
                </section>
            </div>

            <p className="px-1 text-[11px] leading-4 text-slate-400">
                Source: Clay Full Tech Stack enrichment. Detection does
                not verify integration compatibility or completion.
            </p>
        </div>
    );
}