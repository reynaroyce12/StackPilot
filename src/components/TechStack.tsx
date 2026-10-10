import { getCompanyProfile } from "@/lib/normalize";
import { integrations } from "@/data/integrations";
import { matchIntegrations } from "@/lib/matching";
import { Layers3, Tags, Link2, BarChart3 } from "lucide-react";
import TechnologyInventory from "@/components/TechnologyInventory";

export default function TechStack() {
    const company = getCompanyProfile();
    const matches = matchIntegrations(company.technologies, integrations);

    const detected = matches.filter(
        (match) => match.status === "detected"
    ).length;

    const categoryCounts = Object.entries(
        company.technologies.reduce<Record<string, number>>(
            (counts, technology) => {
                counts[technology.category] =
                    (counts[technology.category] ?? 0) + 1;
                return counts;
            },
            {}
        )
    ).sort((a, b) => b[1] - a[1]);

    const maxCount = categoryCounts[0]?.[1] ?? 1;

    const stats = [
        {
            label: "Technologies detected",
            value: company.technologies.length,
            detail: "Identified through Clay enrichment",
            Icon: Layers3,
            color: "text-blue-600",
            background: "bg-blue-50",
        },
        {
            label: "Technology categories",
            value: categoryCounts.length,
            detail: "Across the detected tech stack",
            Icon: Tags,
            color: "text-violet-600",
            background: "bg-violet-50",
        },
        {
            label: "Catalog matches",
            value: `${detected}/${matches.length}`,
            detail: "Matched against 5 integration templates",
            Icon: Link2,
            color: "text-emerald-600",
            background: "bg-emerald-50",
        },
    ];

    return (
        <div className="space-y-4">
            <div className="grid gap-3 md:grid-cols-3">
                {stats.map((stat) => {
                    const Icon = stat.Icon;

                    return (
                        <div
                            key={stat.label}
                            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`rounded-lg p-3 ${stat.background}`}>
                                    <Icon size={20} className={stat.color} />
                                </div>

                                <div>
                                    <p className="text-xs font-medium text-slate-500">
                                        {stat.label}
                                    </p>
                                    <p className="mt-1 text-2xl font-bold text-slate-900">
                                        {stat.value}
                                    </p>
                                </div>
                            </div>

                            <p className="mt-3 text-[13px] font-medium text-[#686868]">
                                {stat.detail}
                            </p>
                        </div>
                    );
                })}
            </div>

            <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                    <BarChart3 size={18} className="text-blue-600" />
                    <h2 className="text-[19px] font-bold text-[#171717]">
                        Technology distribution
                    </h2>
                </div>

                <div className="grid gap-x-8 gap-y-3 md:grid-cols-2">
                    {categoryCounts.map(([category, count], index) => (
                        <div key={category} className="flex items-center gap-3">
                            <span className="w-32 shrink-0 truncate text-xs text-slate-600">
                                {category}
                            </span>

                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                                <div
                                    className={`h-full rounded-full ${index % 3 === 0
                                            ? "bg-blue-500"
                                            : index % 3 === 1
                                                ? "bg-violet-400"
                                                : "bg-emerald-400"
                                        }`}
                                    style={{
                                        width: `${(count / maxCount) * 100}%`,
                                    }}
                                />
                            </div>

                            <span className="w-6 text-right text-xs font-semibold text-slate-700">
                                {count}
                            </span>
                        </div>
                    ))}
                </div>
            </section>
            <TechnologyInventory
                technologies={company.technologies}
                integrations={integrations}
            />
        </div>
    );
}