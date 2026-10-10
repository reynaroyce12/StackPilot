import {
    CalendarDays,
    ShieldCheck,
    Info,
    Database,
} from "lucide-react";

import type { IntegrationMatch } from "@/lib/matching";
import { technicalRequirements } from "@/data/requirements";

interface Props {
    match: IntegrationMatch;
}

export default function IntegrationIntelligence({ match }: Props) {
    const technology = match.matchedTechnology;

    const evidence = technology?.evidence ?? [];
    const requirements =
        technicalRequirements[match.integration.id] ?? [];

    return (
        <div className="space-y-3">
            {/* CLAY DETECTION INTELLIGENCE */}
            <section className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-2">
                    <Database size={17} className="text-blue-600" />

                    <h3 className="text-sm font-semibold text-slate-900">
                        Detection Intelligence
                    </h3>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                    <div>
                        <p className="text-xs text-slate-500">
                            First detected
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-900">
                            {technology?.firstDetected ?? "Unknown"}
                        </p>
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
                        Clay enrichment evidence
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                        {evidence.length ? (
                            evidence.map((source) => (
                                <span
                                    key={source}
                                    className="rounded-md bg-blue-50 px-2 py-1 text-[11px] font-medium text-blue-700"
                                >
                                    {source}
                                </span>
                            ))
                        ) : (
                            <p className="text-xs text-slate-400">
                                No evidence sources available.
                            </p>
                        )}
                    </div>
                </div>

                <p className="mt-3 text-[11px] leading-4 text-slate-400">
                    Technology signals provided by Clay Full Tech Stack
                    enrichment.
                </p>
            </section>

            {/* TECHNICAL REQUIREMENTS */}
            <section className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-2">
                    <ShieldCheck size={17} className="text-violet-600" />

                    <h3 className="text-sm font-semibold text-slate-900">
                        Technical Requirements
                    </h3>
                </div>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                    Illustrative prerequisites for preparing this integration.
                </p>

                <ul className="mt-3 space-y-3">
                    {requirements.map((requirement, index) => (
                        <li
                            key={`${match.integration.id}-${index}`}
                            className="flex items-start gap-2"
                        >
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-50 text-[10px] font-semibold text-violet-700">
                                {index + 1}
                            </span>

                            <div>
                                <p className="text-xs font-semibold text-slate-800">
                                    {requirement.label}
                                </p>

                                <p className="mt-0.5 text-xs leading-5 text-slate-500">
                                    {requirement.detail}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            {/* CONTEXTUAL GUIDANCE */}
            <section className="rounded-xl border border-blue-100 bg-blue-50/70 p-4">
                <div className="flex items-center gap-2">
                    <Info size={17} className="text-blue-600" />

                    <h3 className="text-sm font-semibold text-slate-900">
                        Why this matters
                    </h3>
                </div>

                <p className="mt-2 text-xs leading-5 text-slate-600">
                    StackPilot connects Clays detected technology signals
                    to a structured onboarding plan, helping engineers
                    identify setup requirements before beginning integration.
                </p>

                <p className="mt-2 text-[11px] text-slate-500">
                    Detection does not verify integration compatibility.
                </p>
            </section>
        </div>
    );
}