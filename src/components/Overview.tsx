import { getCompanyProfile } from "@/lib/normalize";
import { integrations } from "@/data/integrations";
import { matchIntegrations } from "@/lib/matching";
import {
    Users,
    Headphones,
    Database,
    CreditCard,
    BriefcaseBusiness,
    ChevronRight,
    Sparkles,
    CheckCircle2,
    CircleHelp,
    ListTodo,
    ArrowRight,
} from "lucide-react";
import IntegrationLogo from "@/components/IntegrationLogo";

const categoryConfig = [
    {
        name: "CRM",
        label: "CRM",
        Icon: Users,
        color: "text-blue-600",
        background: "bg-blue-50",
    },
    {
        name: "Support",
        label: "Support",
        Icon: Headphones,
        color: "text-violet-600",
        background: "bg-violet-50",
    },
    {
        name: "ERP",
        label: "ERP",
        Icon: Database,
        color: "text-amber-600",
        background: "bg-amber-50",
    },
    {
        name: "Finance",
        label: "Finance",
        Icon: CreditCard,
        color: "text-emerald-600",
        background: "bg-emerald-50",
    },
    {
        name: "Human Resources",
        label: "HR",
        Icon: BriefcaseBusiness,
        color: "text-rose-600",
        background: "bg-rose-50",
    },
];

export default function Overview() {
    const company = getCompanyProfile();

    const matches = matchIntegrations(
        company.technologies,
        integrations
    );

    const detected = matches.filter(
        (match) => match.status === "detected"
    ).length;

    const notDetected = matches.length - detected;

    const percentage = matches.length
        ? (detected / matches.length) * 100
        : 0;

    const categoryCount = new Set(
        company.technologies.map((t) => t.category)
    ).size;

    // Suggested tasks come directly from our integration catalog.
    const nextActions = matches
        .filter((match) => match.status === "detected")
        .slice(0, 3)
        .map((match) => ({
            id: match.integration.id,
            name: match.integration.name,
            task: match.checklist[0],
        }))
        .filter((action) => Boolean(action.task));

    return (
        <div className="space-y-5">

            {/* ───── INTEGRATION SUMMARY ───── */}

            <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <h2 className="text-[19px] font-bold text-[#171717]">
                    Integration readiness summary
                </h2>

                <div className="mt-3 grid items-center gap-5 lg:grid-cols-[1.3fr_1fr]">

                    {/* Left: progress and status */}
                    <div className="flex flex-wrap items-center gap-6">

                        <div
                            className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full p-[8px]"
                            style={{
                                background: `conic-gradient(#22c55e ${percentage}%, #e2e8f0 ${percentage}% 100%)`,
                            }}
                        >
                            <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-white">
                                <span className="text-2xl font-bold text-slate-900">
                                    {detected}/{matches.length}
                                </span>
                                <span className="text-[13px] font-medium text-[#686868]">
                                    Detected
                                </span>
                            </div>
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="max-w-sm text-[15px] font-medium leading-6 text-[#484848]">
                                Technology matches identified using Clay enrichment
                                and our illustrative integration catalog.
                            </p>

                            <div className="mt-4 flex gap-8">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2
                                            size={17}
                                            className="text-emerald-500"
                                        />
                                        <span className="text-lg font-semibold text-slate-900">
                                            {detected}
                                        </span>
                                    </div>
                                    <p className="mt-0.5 text-[13px] font-medium text-[#686868]">
                                        Detected
                                    </p>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2">
                                        <CircleHelp
                                            size={17}
                                            className="text-slate-400"
                                        />
                                        <span className="text-lg font-semibold text-slate-900">
                                            {notDetected}
                                        </span>
                                    </div>
                                    <p className="mt-0.5 text-[13px] font-medium text-[#686868]">
                                        Not detected
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: key takeaways */}
                    <div className="self-center rounded-xl bg-blue-50/70 px-5 py-4">
                        <div className="flex items-center gap-2">
                            <Sparkles size={16} className="text-blue-600" />
                            <h3 className="text-md font-semibold text-slate-900">
                                Key takeaways
                            </h3>
                        </div>

                        <ul className="mt-3 list-disc space-y-2 pl-4 text-[14px] font-medium leading-6 text-[#484848]">
                            <li>
                                {detected} of {matches.length} catalog technologies
                                were detected.
                            </li>

                            <li>
                                Clay identified technologies across{" "}
                                {categoryCount} categories.
                            </li>

                            <li>
                                Review access, authentication, and API requirements
                                before onboarding.
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ───── DETECTED TECHNOLOGIES ───── */}

            <section>
                <h2 className="mb-3 text-[19px] font-bold tracking-tight text-[#171717]">
                    Detected technologies
                </h2>

                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {categoryConfig.map((category) => {
                        const technologies = company.technologies.filter(
                            (technology) =>
                                technology.category === category.name
                        );

                        const Icon = category.Icon;

                        return (
                            <div
                                key={category.name}
                                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`rounded-xl p-2.5 ${category.background}`}
                                        >
                                            <Icon
                                                size={19}
                                                className={category.color}
                                            />
                                        </div>

                                        <div>
                                            <h3 className="text-[15px] font-bold tracking-tight text-[#171717]">
                                                {category.label}
                                            </h3>
                                            <p className="mt-0.5 text-[13px] font-medium text-[#686868]">
                                                {technologies.length} detected
                                            </p>
                                        </div>
                                    </div>

                                    <ChevronRight
                                        size={16}
                                        className="text-slate-400"
                                    />
                                </div>

                                <p className="mt-3 line-clamp-2 text-[14px] font-medium leading-[22px] text-[#525252]">
                                    {technologies.map((t) => t.name).join(", ") ||
                                        "No technologies detected"}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ───── DETAILS + NEXT ACTIONS ───── */}

            <div className="grid items-start gap-4 xl:grid-cols-[1.85fr_1fr]">

                {/* Integration details */}
                <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <h2 className="mb-4 text-[19px] font-bold text-[#171717]">
                        Integration details
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-[14px]">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
                                    <th className="px-3 py-3.5 font-medium">
                                        Integration
                                    </th>
                                    <th className="px-3 py-3.5 font-medium">
                                        Status
                                    </th>
                                    <th className="px-3 py-3.5 font-medium">
                                        Evidence
                                    </th>
                                    <th className="px-3 py-3.5 font-medium">
                                        First detected
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {matches.map((match) => {
                                    //   const Icon =
                                    //     integrationIcons[
                                    //       match.integration.id as keyof typeof integrationIcons
                                    //     ] ?? Database;

                                    return (
                                        <tr
                                            key={match.integration.id}
                                            className="border-b border-slate-100 last:border-0"
                                        >
                                            <td className="px-3 py-3.5">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50">
                                                        <IntegrationLogo id={match.integration.id} size={22} />
                                                    </div>

                                                    <span className="text-[14px] font-semibold text-[#171717]">
                                                        {match.integration.name}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-3 py-3.5">
                                                <span
                                                    className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 font-medium ${match.status === "detected"
                                                        ? "bg-emerald-50 text-emerald-700"
                                                        : "bg-slate-100 text-slate-600"
                                                        }`}
                                                >
                                                    {match.status === "detected"
                                                        ? "● Detected"
                                                        : "Not detected"}
                                                </span>
                                            </td>

                                            <td className="px-3 py-3.5">
                                                <div className="flex max-w-[280px] flex-wrap gap-1.5">
                                                    {match.matchedTechnology?.evidence.length ? (
                                                        match.matchedTechnology.evidence.map((source) => {
                                                            const sourceColors: Record<string, string> = {
                                                                BuyerCaddy: "bg-blue-50 text-blue-700",
                                                                PredictLeads: "bg-violet-50 text-violet-700",
                                                                BuiltWith: "bg-amber-50 text-amber-700",
                                                                "Clay Job Posting": "bg-rose-50 text-rose-700",
                                                            };

                                                            return (
                                                                <span
                                                                    key={source}
                                                                    className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[12px] font-semibold ${sourceColors[source] ??
                                                                        "bg-slate-100 text-slate-700"
                                                                        }`}
                                                                >
                                                                    {source}
                                                                </span>
                                                            );
                                                        })
                                                    ) : (
                                                        <span className="text-[13px] text-slate-400">
                                                            Not available
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            <td className="whitespace-nowrap px-3 py-3.5 text-slate-600">
                                                {match.matchedTechnology?.firstDetected ??
                                                    "Unknown"}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <p className="mt-3 text-xs leading-5 text-slate-400">
                        Source: Clay Full Tech Stack enrichment. Technology
                        detection does not verify integration compatibility.
                    </p>
                </section>

                {/* Recommended next actions */}
                <section className="rounded-xl border border-[#E5E1DA] bg-white px-4 py-4 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex items-center gap-2">
                        <ListTodo size={18} className="text-blue-600" />

                        <h2 className="text-[19px] font-bold text-[#171717]">
                            Recommended next actions
                        </h2>
                    </div>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                        Illustrative onboarding steps for detected
                        technologies.
                    </p>

                    <div className="mt-4 space-y-3">
                        {nextActions.map((action, index) => (
                            <div
                                key={action.id}
                                className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50/70 p-3"
                            >
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                                    {index + 1}
                                </span>

                                <div>
                                    <div className="flex items-center gap-2">
                                        <IntegrationLogo id={action.id} size={18} />

                                        <p className="text-xs font-semibold text-slate-900">
                                            {action.name}
                                        </p>
                                    </div>

                                    <p className="mt-1 text-[14px] font-medium leading-6 text-[#484848]">
                                        {action.task}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3 text-[13px] font-medium text-[#686868]">
                        <ArrowRight size={14} />
                        Full onboarding checklist available in the
                        Readiness Checklist tab.
                    </div> */}
                </section>
            </div>
        </div>
    );
}
