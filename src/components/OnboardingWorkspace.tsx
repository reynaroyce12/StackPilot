"use client";

import { useState, useEffect } from "react";
import {
    Link2,
    ListTodo,
    CheckCircle2,
    Clock3,
    ChevronRight,
    Search,
    RotateCcw,
    Check,
    Download
} from "lucide-react";


import IntegrationLogo from "@/components/IntegrationLogo";
import { getCompanyProfile } from "@/lib/normalize";
import { integrations } from "@/data/integrations";
import { matchIntegrations } from "@/lib/matching";
import IntegrationIntelligence from "@/components/IntegrationIntelligence";

export default function OnboardingWorkspace() {
    const company = getCompanyProfile();
    const matches = matchIntegrations(company.technologies, integrations);

    const [selectedId, setSelectedId] = useState("aws");
    const [search, setSearch] = useState("");

    const [completedTasks, setCompletedTasks] = useState<
        Record<string, number[]>
    >({});

    const [progressLoaded, setProgressLoaded] = useState(false);

    useEffect(() => {
        const restoreTimer = window.setTimeout(() => {
            try {
                const saved = localStorage.getItem(
                    "stackpilot-databricks-onboarding-v1"
                );

                if (saved) {
                    const parsed = JSON.parse(saved);

                    if (
                        parsed &&
                        typeof parsed === "object" &&
                        !Array.isArray(parsed)
                    ) {
                        const restored: Record<string, number[]> = {};

                        for (const integration of integrations) {
                            const values = parsed[integration.id];

                            if (Array.isArray(values)) {
                                restored[integration.id] = values.filter(
                                    (value): value is number =>
                                        Number.isInteger(value) &&
                                        value >= 0 &&
                                        value < integration.checklist.length
                                );
                            }
                        }

                        setCompletedTasks(restored);
                    }
                }
            } catch {
                console.warn("Could not restore onboarding progress.");
            } finally {
                setProgressLoaded(true);
            }
        }, 0);

        return () => window.clearTimeout(restoreTimer);
    }, []);

    useEffect(() => {
        if (!progressLoaded) return;

        try {
            localStorage.setItem(
                "stackpilot-databricks-onboarding-v1",
                JSON.stringify(completedTasks)
            );
        } catch {
            console.warn("Could not save onboarding progress.");
        }
    }, [completedTasks, progressLoaded]);

    const selected = matches.find(
        (match) => match.integration.id === selectedId
    ) ?? matches[0];

    const detected = matches.filter(
        (match) => match.status === "detected"
    ).length;

    const totalTasks = matches.reduce(
        (total, match) => total + match.checklist.length,
        0
    );

    const completedCount = matches.reduce(
        (total, match) => {
            const completed = completedTasks[match.integration.id] ?? [];

            return total + completed.filter(
                (index) => index < match.checklist.length
            ).length;
        },
        0
    );

    const remainingCount = totalTasks - completedCount;

    const selectedCompleted =
        completedTasks[selected.integration.id] ?? [];

    const selectedCompletedCount = selectedCompleted.length;

    const selectedTotal = selected.checklist.length;

    const selectedPercentage = selectedTotal
        ? Math.round((selectedCompletedCount / selectedTotal) * 100)
        : 0;

    function toggleTask(integrationId: string, taskIndex: number) {
        setCompletedTasks((previous) => {
            const current = previous[integrationId] ?? [];

            return {
                ...previous,
                [integrationId]: current.includes(taskIndex)
                    ? current.filter((index) => index !== taskIndex)
                    : [...current, taskIndex],
            };
        });
    }

    function resetIntegration(integrationId: string) {
        setCompletedTasks((previous) => ({
            ...previous,
            [integrationId]: [],
        }));
    }

    function exportChecklist() {
        const headers = [
            "Integration",
            "Category",
            "Technology Detected",
            "First Detected",
            "Evidence Sources",
            "Step",
            "Task",
            "Status",
        ];

        const rows = selected.checklist.map((task, index) => [
            selected.integration.name,
            selected.integration.category,
            selected.status === "detected" ? "Yes" : "No",
            selected.matchedTechnology?.firstDetected ?? "",
            selected.matchedTechnology?.evidence.join("; ") ?? "",
            String(index + 1),
            task,
            selectedCompleted.includes(index)
                ? "Completed by user"
                : "Pending",
        ]);

        // Escape CSV values and prevent spreadsheet formula execution.
        function escapeCSV(value: string) {
            const safe = /^[\s]*[=+\-@]/.test(value)
                ? `'${value}`
                : value;

            return `"${safe.replace(/"/g, '""')}"`;
        }

        const csv = [headers, ...rows]
            .map((row) => row.map(escapeCSV).join(","))
            .join("\r\n");

        const blob = new Blob(["\uFEFF", csv], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");

        anchor.href = url;
        anchor.download =
            `stackpilot-${selected.integration.id}-onboarding.csv`;

        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();

        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    const filteredMatches = matches.filter((match) =>
        match.integration.name
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const stats = [
        {
            label: "Detected integrations",
            value: detected,
            detail: "Matched to our integration catalog",
            Icon: Link2,
            color: "text-blue-600",
            background: "bg-blue-50",
        },
        {
            label: "Total setup tasks",
            value: remainingCount,
            detail: `Across ${matches.length} integration templates`,
            Icon: ListTodo,
            color: "text-violet-600",
            background: "bg-violet-50",
        },
        {
            label: "Completed tasks",
            value: 0,
            detail: `${totalTasks ? Math.round((completedCount / totalTasks) * 100) : 0}% of setup tasks completed`,
            Icon: CheckCircle2,
            color: "text-emerald-600",
            background: "bg-emerald-50",
        },
        {
            label: "Remaining tasks",
            value: remainingCount,
            detail: "Illustrative onboarding requirements",
            Icon: Clock3,
            color: "text-amber-600",
            background: "bg-amber-50",
        },
    ];

    return (
        <div className="space-y-4">
            {/* PAGE HEADING */}
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                        Onboarding Workspace
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-slate-950">
                        Turn detected technologies into setup plans
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Review Clay detection evidence and prepare technical
                        onboarding for existing technologies.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={exportChecklist}
                    disabled={!progressLoaded}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:opacity-50"
                >
                    <Download size={16} />
                    Export Checklist
                </button>
            </div>

            {/* SUMMARY CARDS */}
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.Icon;

                    return (
                        <div
                            key={stat.label}
                            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`rounded-xl p-3 ${stat.background}`}>
                                    <Icon size={20} className={stat.color} />
                                </div>

                                <div>
                                    <p className="text-2xl font-bold text-slate-900">
                                        {stat.value}
                                    </p>
                                    <p className="text-xs font-medium text-slate-700">
                                        {stat.label}
                                    </p>
                                </div>
                            </div>

                            <p className="mt-3 text-xs text-slate-500">
                                {stat.detail}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* WORKSPACE */}
            <div className="grid items-start gap-4 lg:grid-cols-[330px_minmax(0,1fr)]">

                {/* INTEGRATION SELECTOR */}
                <aside className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-100 p-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-slate-900">
                                Integrations
                            </h3>

                            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                                {matches.length}
                            </span>
                        </div>

                        <div className="mt-3 flex items-center gap-2 rounded-lg border border-slate-200 px-3">
                            <Search size={16} className="text-slate-400" />

                            <input
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search integrations..."
                                aria-label="Search integrations"
                                className="w-full bg-transparent py-2.5 text-sm outline-none"
                            />
                        </div>
                    </div>

                    <div className="divide-y divide-slate-100">
                        {filteredMatches.map((match) => {
                            const active = selectedId === match.integration.id;

                            return (
                                <button
                                    key={match.integration.id}
                                    type="button"
                                    onClick={() => setSelectedId(match.integration.id)}
                                    className={`flex w-full items-center gap-3 border-l-[3px] px-4 py-2.5 text-left transition-colors ${active
                                        ? "border-blue-600 bg-blue-50/70"
                                        : "border-transparent hover:bg-slate-50"
                                        }`}
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                                        <IntegrationLogo
                                            id={match.integration.id}
                                            size={30}
                                        />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-semibold text-slate-900">
                                            {match.integration.name}
                                        </p>

                                        <div className="mt-1 flex flex-wrap items-center gap-2">
                                            <span
                                                className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${match.status === "detected"
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : "bg-slate-100 text-slate-500"
                                                    }`}
                                            >
                                                {match.status === "detected"
                                                    ? "● Detected"
                                                    : "Not detected"}
                                            </span>
                                        </div>

                                        <p className="mt-1.5 text-xs text-slate-500">
                                            First detected:{" "}
                                            {match.matchedTechnology?.firstDetected ??
                                                "Unknown"}
                                        </p>
                                        <div className="mt-2 flex items-center gap-2">
                                            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
                                                <div
                                                    className="h-full rounded-full bg-blue-600 transition-all duration-300"
                                                    style={{
                                                        width: `${match.checklist.length
                                                            ? ((completedTasks[match.integration.id]?.length ?? 0) /
                                                                match.checklist.length) *
                                                            100
                                                            : 0
                                                            }%`,
                                                    }}
                                                />
                                            </div>

                                            <span className="text-[11px] text-slate-500">
                                                {completedTasks[match.integration.id]?.length ?? 0}/
                                                {match.checklist.length}
                                            </span>
                                        </div>
                                    </div>

                                    <ChevronRight
                                        size={16}
                                        className="shrink-0 text-slate-400"
                                    />
                                </button>
                            );
                        })}

                        {filteredMatches.length === 0 && (
                            <p className="p-6 text-center text-sm text-slate-500">
                                No integrations found.
                            </p>
                        )}
                    </div>
                </aside>

                {/* SELECTED INTEGRATION */}
                <section className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-100 bg-gradient-to-r from-white to-blue-50/60 p-5">
                        <div className="flex flex-wrap items-start gap-4">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                                <IntegrationLogo
                                    id={selected.integration.id}
                                    size={26}
                                />
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h3 className="text-xl font-bold text-slate-900">
                                        {selected.integration.name}
                                    </h3>

                                    <span
                                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${selected.status === "detected"
                                            ? "bg-emerald-100 text-emerald-700"
                                            : "bg-slate-100 text-slate-600"
                                            }`}
                                    >
                                        {selected.status === "detected"
                                            ? "● Detected in Clay data"
                                            : "Not detected"}
                                    </span>
                                </div>

                                <p className="mt-2 text-sm text-slate-500">
                                    {selected.integration.description}
                                </p>

                                <p className="mt-2 text-xs text-blue-600">
                                    {selected.integration.category}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Placeholder for Step 8B */}
                    {/* WORKSPACE CONTENT */}
                    <div className="grid items-start gap-4 p-4 xl:grid-cols-[1.4fr_1fr]">

                        {/* LEFT: INTERACTIVE CHECKLIST */}
                        <div className="min-w-0">
                            <div className="p-4">
                                {/* Checklist heading */}
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        <ListTodo size={18} className="text-blue-600" />

                                        <h4 className="font-semibold text-slate-900">
                                            Setup Checklist
                                        </h4>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => resetIntegration(selected.integration.id)}
                                        disabled={!progressLoaded || selectedCompletedCount === 0}
                                        className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <RotateCcw size={13} />
                                        Reset progress
                                    </button>
                                </div>

                                {/* Progress indicator */}
                                <div className="mt-4 rounded-lg bg-slate-50 p-3">
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-xs font-medium text-slate-700">
                                            {selectedCompletedCount} of {selectedTotal} tasks completed
                                        </span>

                                        <span className="text-xs font-semibold text-blue-600">
                                            {selectedPercentage}%
                                        </span>
                                    </div>

                                    <div
                                        role="progressbar"
                                        aria-label={`${selected.integration.name} onboarding progress`}
                                        aria-valuenow={selectedPercentage}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                        className="h-2 overflow-hidden rounded-full bg-slate-200"
                                    >
                                        <div
                                            className="h-full rounded-full bg-blue-600 transition-all duration-300"
                                            style={{ width: `${selectedPercentage}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Task rows */}
                                <div className="mt-3 space-y-2">
                                    {selected.checklist.map((task, index) => {
                                        const completed = selectedCompleted.includes(index);

                                        return (
                                            <label
                                                key={`${selected.integration.id}-${index}`}
                                                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-3 transition-colors ${completed
                                                    ? "border-emerald-200 bg-emerald-50/60"
                                                    : "border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50/30"
                                                    }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={completed}
                                                    disabled={!progressLoaded}
                                                    onChange={() =>
                                                        toggleTask(selected.integration.id, index)
                                                    }
                                                    className="sr-only"
                                                />

                                                {/* Checkbox */}
                                                <span
                                                    aria-hidden="true"
                                                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${completed
                                                        ? "border-emerald-500 bg-emerald-500 text-white"
                                                        : "border-slate-300 bg-white"
                                                        }`}
                                                >
                                                    {completed && <Check size={13} strokeWidth={3} />}
                                                </span>

                                                {/* Task information */}
                                                <div className="min-w-0 flex-1">
                                                    <p
                                                        className={`text-sm font-medium ${completed
                                                            ? "text-slate-600 line-through decoration-slate-400"
                                                            : "text-slate-800"
                                                            }`}
                                                    >
                                                        {task}
                                                    </p>
                                                </div>

                                                {/* Step number */}
                                                <span className="shrink-0 rounded-md bg-slate-100 px-2 py-1 text-[11px] text-slate-500">
                                                    {index + 1}
                                                </span>
                                            </label>
                                        );
                                    })}
                                </div>

                                {/* Completion message */}
                                {selectedTotal > 0 &&
                                    selectedCompletedCount === selectedTotal && (
                                        <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-sm font-medium text-emerald-700">
                                            <CheckCircle2 size={18} />
                                            All checklist tasks marked complete!
                                        </div>
                                    )}

                                {/* Disclaimer */}
                                <p className="mt-4 text-xs leading-5 text-slate-400">
                                    These are illustrative onboarding tasks. Marking a task
                                    complete tracks user progress and does not independently
                                    verify integration readiness.
                                </p>

                            </div>
                        </div>

                        {/* RIGHT: DETECTION & REQUIREMENTS */}
                        <div className="min-w-0">
                            <IntegrationIntelligence match={selected} />
                        </div>

                    </div>
                </section>
            </div>
        </div>
    );
}
