"use client";

import { Fragment, useMemo, useState } from "react";
import {
    Search,
    Filter,
    ChevronLeft,
    ChevronRight,
    Database,
    Download,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

import TechnologyLogo from "@/components/TechnologyLogo";
import type { Technology } from "@/types/technology";
import type { Integration } from "@/types/integration";
import { matchIntegrations } from "@/lib/matching";

interface Props {
    technologies: Technology[];
    integrations: Integration[];
}

const PAGE_SIZE = 10;

const categoryColors: Record<string, string> = {
    "Developer Tools": "bg-blue-50 text-blue-700",
    "Data Management": "bg-violet-50 text-violet-700",
    CRM: "bg-indigo-50 text-indigo-700",
    Support: "bg-pink-50 text-pink-700",
    Finance: "bg-amber-50 text-amber-700",
    Security: "bg-emerald-50 text-emerald-700",
    Marketing: "bg-rose-50 text-rose-700",
    ERP: "bg-orange-50 text-orange-700",
    Communication: "bg-cyan-50 text-cyan-700",
    "Human Resources": "bg-teal-50 text-teal-700",
};

function getCutoffDate(months: number): string {
    const date = new Date();
    date.setMonth(date.getMonth() - months);
    return date.toISOString().slice(0, 10);
}

export default function TechnologyInventory({
    technologies,
    integrations,
}: Props) {
    const [search, setSearch] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedSources, setSelectedSources] = useState<string[]>([]);
    const [matchFilter, setMatchFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("all");
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [page, setPage] = useState(1);

    const [expandedId, setExpandedId] = useState<string | null>(null);

    const matchedIds = useMemo(() => {
        return new Set(
            matchIntegrations(technologies, integrations)
                .map((match) => match.matchedTechnology?.id)
                .filter((id): id is string => Boolean(id))
        );
    }, [technologies, integrations]);

    const categories = useMemo(() => {
        const counts = new Map<string, number>();

        technologies.forEach((t) => {
            counts.set(t.category, (counts.get(t.category) ?? 0) + 1);
        });

        return [...counts.entries()].sort((a, b) => b[1] - a[1]);
    }, [technologies]);

    const sources = useMemo(() => {
        const counts = new Map<string, number>();

        technologies.forEach((t) => {
            t.evidence.forEach((source) => {
                counts.set(source, (counts.get(source) ?? 0) + 1);
            });
        });

        return [...counts.entries()].sort((a, b) => b[1] - a[1]);
    }, [technologies]);

    function toggle(
        value: string,
        selected: string[],
        setter: (values: string[]) => void
    ) {
        setter(
            selected.includes(value)
                ? selected.filter((item) => item !== value)
                : [...selected, value]
        );
        setPage(1);
    }

    function resetFilters() {
        setSearch("");
        setSelectedCategories([]);
        setSelectedSources([]);
        setMatchFilter("all");
        setDateFilter("all");
        setPage(1);
    }

    const filtered = useMemo(() => {
        return technologies.filter((t) => {
            if (!t.name.toLowerCase().includes(search.trim().toLowerCase())) {
                return false;
            }

            if (
                selectedCategories.length &&
                !selectedCategories.includes(t.category)
            ) {
                return false;
            }

            if (
                selectedSources.length &&
                !selectedSources.some((source) => t.evidence.includes(source))
            ) {
                return false;
            }

            const matched = matchedIds.has(t.id);

            if (matchFilter === "matched" && !matched) return false;
            if (matchFilter === "unmatched" && matched) return false;

            if (dateFilter !== "all") {
                if (!t.firstDetected) return false;

                const cutoff = getCutoffDate(Number(dateFilter));
                if (t.firstDetected < cutoff) return false;
            }

            return true;
        }).sort((a, b) =>
            a.name.localeCompare(b.name, undefined, {
                sensitivity: "base",
            })
        );
    }, [
        technologies,
        search,
        selectedCategories,
        selectedSources,
        matchFilter,
        dateFilter,
        matchedIds,
    ]);

    const totalPages = Math.max(
        1,
        Math.ceil(filtered.length / PAGE_SIZE)
    );

    const currentPage = Math.min(page, totalPages);

    const visible = filtered.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    const matchedCount = matchedIds.size;

    return (
        <div className="grid items-start gap-3 lg:grid-cols-[235px_minmax(0,1fr)]">

            {/* FILTER SIDEBAR */}
            <aside className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Filter size={17} className="text-blue-600" />
                        <h2 className="font-semibold text-slate-900">Filters</h2>
                    </div>

                    <button
                        onClick={resetFilters}
                        className="text-xs font-medium text-blue-600 hover:underline"
                    >
                        Reset
                    </button>
                </div>

                {/* Search */}
                <div className="mb-5">
                    <label
                        htmlFor="technology-search"
                        className="mb-2 block text-xs font-semibold text-slate-800"
                    >
                        Search technologies
                    </label>

                    <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3">
                        <Search size={15} className="text-slate-400" />

                        <input
                            id="technology-search"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            placeholder="Search technologies..."
                            className="w-full min-w-0 py-2.5 text-xs text-slate-800 outline-none"
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className="mb-5">
                    <h3 className="mb-2 text-xs font-semibold text-slate-900">
                        Category
                    </h3>

                    <div className="space-y-2">
                        {(showAllCategories ? categories : categories.slice(0, 5)).map(
                            ([name, count]) => (
                                <label
                                    key={name}
                                    className="flex cursor-pointer items-center justify-between gap-2 text-xs text-slate-600"
                                >
                                    <span className="flex min-w-0 items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(name)}
                                            onChange={() =>
                                                toggle(
                                                    name,
                                                    selectedCategories,
                                                    setSelectedCategories
                                                )
                                            }
                                            className="h-4 w-4 shrink-0 accent-blue-600"
                                        />
                                        <span className="truncate">{name}</span>
                                    </span>

                                    <span className="text-slate-400">{count}</span>
                                </label>
                            )
                        )}
                    </div>

                    {categories.length > 5 && (
                        <button
                            onClick={() => setShowAllCategories(!showAllCategories)}
                            className="mt-2 text-xs font-medium text-blue-600"
                        >
                            {showAllCategories ? "Show less" : "Show more"}
                        </button>
                    )}
                </div>

                {/* Catalog match */}
                <div className="mb-5">
                    <h3 className="mb-2 text-xs font-semibold text-slate-900">
                        Catalog match
                    </h3>

                    {[
                        ["all", "All technologies", technologies.length],
                        ["matched", "Catalog match", matchedCount],
                        [
                            "unmatched",
                            "No catalog match",
                            technologies.length - matchedCount,
                        ],
                    ].map(([value, label, count]) => (
                        <label
                            key={String(value)}
                            className="mb-2 flex cursor-pointer items-center justify-between gap-2 text-xs text-slate-600"
                        >
                            <span className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="catalog-match"
                                    value={String(value)}
                                    checked={matchFilter === value}
                                    onChange={() => {
                                        setMatchFilter(String(value));
                                        setPage(1);
                                    }}
                                    className="h-4 w-4 accent-blue-600"
                                />
                                {label}
                            </span>

                            <span className="text-slate-400">{count}</span>
                        </label>
                    ))}
                </div>

                {/* Detection sources */}
                <div className="mb-5">
                    <h3 className="mb-2 text-xs font-semibold text-slate-900">
                        Detection source
                    </h3>

                    <div className="space-y-2">
                        {sources.map(([source, count]) => (
                            <label
                                key={source}
                                className="flex cursor-pointer items-center justify-between gap-2 text-xs text-slate-600"
                            >
                                <span className="flex min-w-0 items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedSources.includes(source)}
                                        onChange={() =>
                                            toggle(source, selectedSources, setSelectedSources)
                                        }
                                        className="h-4 w-4 shrink-0 accent-blue-600"
                                    />
                                    <span className="truncate">{source}</span>
                                </span>

                                <span className="text-slate-400">{count}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Detection date */}
                <div className="border-t border-slate-100 pt-4">
                    <h3 className="mb-2 text-xs font-semibold text-slate-900">
                        First detected
                    </h3>

                    {[
                        ["all", "All time"],
                        ["6", "Last 6 months"],
                        ["12", "Last 12 months"],
                        ["24", "Last 24 months"],
                    ].map(([value, label]) => (
                        <label
                            key={value}
                            className="mb-2 flex cursor-pointer items-center gap-2 text-xs text-slate-600"
                        >
                            <input
                                type="radio"
                                name="detection-date"
                                checked={dateFilter === value}
                                onChange={() => {
                                    setDateFilter(value);
                                    setPage(1);
                                }}
                                className="h-4 w-4 accent-blue-600"
                            />
                            {label}
                        </label>
                    ))}
                </div>
            </aside>

            {/* TECHNOLOGY TABLE */}
            <section className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
                    <div>
                        <h2 className="text-base font-semibold text-slate-900">
                            Technologies ({filtered.length})
                        </h2>
                        <p className="mt-1 text-xs text-slate-500">
                            Technology signals identified through Clay enrichment.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={exportCSV}
                        disabled={filtered.length === 0}
                        className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <Download size={15} />
                        Export CSV
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-slate-500">
                            <tr className="border-b border-slate-200">
                                <th className="px-3 py-3 font-medium">Technology</th>
                                <th className="px-3 py-3 font-medium">Category</th>
                                <th className="px-3 py-3 font-medium">Catalog match</th>
                                <th className="px-3 py-3 font-medium">Evidence sources</th>
                                <th className="px-3 py-3 font-medium">First detected</th>
                            </tr>
                        </thead>

                        <tbody>
                            {visible.map((technology) => {
                                const matched = matchedIds.has(technology.id);
                                const expanded = expandedId === technology.id;

                                return (
                                    <Fragment key={technology.id}>
                                        <tr
                                            key={technology.id}
                                            className="border-b border-slate-100 last:border-0 hover:bg-blue-50/30"
                                        >
                                            <td className="px-3 py-3">
                                                <div className="flex min-w-40 items-center gap-2">
                                                    <TechnologyLogo name={technology.name} />

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setExpandedId(expanded ? null : technology.id)
                                                        }
                                                        aria-expanded={expanded}
                                                        className="flex items-center gap-2 text-left font-medium text-slate-900 hover:text-blue-600"
                                                    >
                                                        {technology.name}

                                                        {expanded ? (
                                                            <ChevronUp size={14} className="text-blue-600" />
                                                        ) : (
                                                            <ChevronDown size={14} className="text-slate-400" />
                                                        )}
                                                    </button>
                                                </div>
                                            </td>

                                            <td className="px-3 py-3">
                                                <span
                                                    className={`inline-flex whitespace-nowrap rounded-md px-2 py-1 ${categoryColors[technology.category] ??
                                                        "bg-slate-100 text-slate-600"
                                                        }`}
                                                >
                                                    {technology.category}
                                                </span>
                                            </td>

                                            <td className="px-3 py-3">
                                                <span
                                                    className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 ${matched
                                                        ? "bg-emerald-50 text-emerald-700"
                                                        : "bg-slate-100 text-slate-500"
                                                        }`}
                                                >
                                                    {matched ? "● Matched" : "No match"}
                                                </span>
                                            </td>

                                            <td className="px-3 py-3">
                                                <div className="flex max-w-48 flex-wrap gap-1">
                                                    {technology.evidence.length ? (
                                                        <>
                                                            {technology.evidence.slice(0, 2).map((source) => (
                                                                <span
                                                                    key={source}
                                                                    className="rounded bg-slate-100 px-1.5 py-1 text-[10px] text-slate-600"
                                                                >
                                                                    {source}
                                                                </span>
                                                            ))}

                                                            {technology.evidence.length > 2 && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        setExpandedId(expanded ? null : technology.id)
                                                                    }
                                                                    aria-label={`View all evidence sources for ${technology.name}`}
                                                                    aria-expanded={expanded}
                                                                    className="rounded bg-blue-50 px-1.5 py-1 text-[10px] font-medium text-blue-700 hover:bg-blue-100"
                                                                >
                                                                    +{technology.evidence.length - 2}
                                                                </button>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <span className="text-slate-400">
                                                            Not available
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            <td className="whitespace-nowrap px-3 py-3 text-slate-600">
                                                {technology.firstDetected ?? "Unknown"}
                                            </td>
                                        </tr>

                                        {expanded && (
                                            <tr className="bg-blue-50/40">
                                                <td colSpan={5} className="px-5 py-4">
                                                    <div className="grid gap-4 sm:grid-cols-3">
                                                        <div>
                                                            <p className="text-xs font-semibold text-slate-900">
                                                                Technology
                                                            </p>

                                                            <p className="mt-2 text-xs text-slate-600">
                                                                {technology.name}
                                                            </p>

                                                            <p className="mt-1 text-xs text-slate-500">
                                                                {technology.category}
                                                            </p>
                                                        </div>

                                                        <div>
                                                            <p className="text-xs font-semibold text-slate-900">
                                                                Clay detection evidence
                                                            </p>

                                                            <div className="mt-2 flex flex-wrap gap-1">
                                                                {technology.evidence.length ? (
                                                                    technology.evidence.map((source) => (
                                                                        <span
                                                                            key={source}
                                                                            className="rounded-md border border-blue-100 bg-white px-2 py-1 text-xs text-slate-600"
                                                                        >
                                                                            {source}
                                                                        </span>
                                                                    ))
                                                                ) : (
                                                                    <p className="text-xs text-slate-500">
                                                                        No evidence sources provided
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <p className="text-xs font-semibold text-slate-900">
                                                                Integration information
                                                            </p>

                                                            <p className="mt-2 text-xs text-slate-600">
                                                                Catalog:{" "}
                                                                {matched
                                                                    ? "Matching integration template found"
                                                                    : "No matching integration template"}
                                                            </p>

                                                            <p className="mt-1 text-xs text-slate-600">
                                                                First detected:{" "}
                                                                {technology.firstDetected ?? "Unknown"}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <p className="mt-4 border-t border-blue-100 pt-3 text-[11px] text-slate-500">
                                                        Source: Clay Full Tech Stack enrichment.
                                                        Detection does not verify integration readiness.
                                                    </p>
                                                </td>
                                            </tr>
                                        )}
                                    </Fragment>
                                );
                            })}
                        </tbody>
                    </table>

                    {filtered.length === 0 && (
                        <div className="px-5 py-10 text-center">
                            <Database size={24} className="mx-auto text-slate-300" />
                            <p className="mt-2 text-sm font-medium text-slate-700">
                                No matching technologies
                            </p>
                            <button
                                onClick={resetFilters}
                                className="mt-2 text-xs text-blue-600"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
                    <p className="text-xs text-slate-500">
                        {filtered.length
                            ? `Showing ${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(
                                currentPage * PAGE_SIZE,
                                filtered.length
                            )} of ${filtered.length}`
                            : "Showing 0 results"}
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setPage(currentPage - 1)}
                            aria-label="Previous page"
                            className="rounded-lg border border-slate-200 p-2 disabled:opacity-30"
                        >
                            <ChevronLeft size={15} />
                        </button>

                        <span className="text-xs text-slate-600">
                            {currentPage} / {totalPages}
                        </span>

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setPage(currentPage + 1)}
                            aria-label="Next page"
                            className="rounded-lg border border-slate-200 p-2 disabled:opacity-30"
                        >
                            <ChevronRight size={15} />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );

    function exportCSV() {
        const headers = [
            "Technology",
            "Category",
            "Catalog Match",
            "Evidence Sources",
            "First Detected",
        ];

        const rows = filtered.map((technology) => [
            technology.name,
            technology.category,
            matchedIds.has(technology.id) ? "Matched" : "No match",
            technology.evidence.join("; "),
            technology.firstDetected ?? "",
        ]);

        const escapeCSV = (value: string) => {
            const safeValue = /^[=+\-@\t\r\n]/.test(value)
                ? `'${value}`
                : value;

            return `"${safeValue.replace(/"/g, '""')}"`;
        };

        const csv = [headers, ...rows]
            .map((row) => row.map(escapeCSV).join(","))
            .join("\r\n");

        const blob = new Blob([csv], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "stackpilot-databricks-technologies.csv";

        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(url);
    }
}