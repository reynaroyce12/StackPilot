"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  Check,
  Download,
  Layers3,
} from "lucide-react";

import IntegrationLogo from "@/components/IntegrationLogo";

const cards = [
  {
    eyebrow: "Powered by Clay 🌈",
    title: "From a domain to technology intelligence.",
    highlight: "91 technologies · 10 categories",
    description:
      "Clay's Full Tech Stack enrichment brings multi-source company technology signals into one structured dataset.",
    accent: "coral",
  },
  {
    eyebrow: "Evidence, Not Guesswork",
    title: "Know what was detected. Know why.",
    highlight: "Multi-source enrichment evidence",
    description:
      "Inspect detection signals from BuiltWith, PredictLeads, BuyerCaddy, and Clay Job Posting.",
    accent: "violet",
  },
  {
    eyebrow: "Intelligence → Integration",
    title: "Turn technology signals into technical context.",
    highlight: "5/5 catalog matches in the demo",
    description:
      "Deterministic TypeScript matching connects Clay-detected technologies with an illustrative integration catalog.",
    accent: "blue",
  },
  {
    eyebrow: "Less Investigation. More Building.",
    title: "From discovery to an onboarding plan.",
    highlight: "20 guided setup tasks",
    description:
      "Generate integration-specific setup checklists, track progress, and export actionable plans.",
    accent: "mint",
  },
] as const;

const accentStyles = {
  coral: {
    bar: "bg-[#FF8FA3]",
    surface: "bg-[#FFFEFD]",
    badge: "bg-[#FFE8ED] text-[#A93754]",
    metric: "bg-[#FFF3F0] text-[#B4483A]",
  },
  violet: {
    bar: "bg-[#9B8AFF]",
    surface: "bg-[#FEFDFF]",
    badge: "bg-[#EEE9FF] text-[#6149BD]",
    metric: "bg-[#F3F0FF] text-[#5C47B0]",
  },
  blue: {
    bar: "bg-[#4D8DFF]",
    surface: "bg-[#FDFEFF]",
    badge: "bg-[#E6EFFF] text-[#165BC0]",
    metric: "bg-[#EDF4FF] text-[#155CB8]",
  },
  mint: {
    bar: "bg-[#54CFA2]",
    surface: "bg-[#FDFFFE]",
    badge: "bg-[#DFF8EF] text-[#087A58]",
    metric: "bg-[#E8FAF3] text-[#087454]",
  },
} as const;

const integrationIds = ["aws", "azure", "salesforce", "hubspot", "zendesk"];

function subscribeToReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);

  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function CardVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="mt-5 rounded-2xl border border-[#EEEAE4] bg-[#FAF9F7] p-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 text-[11px] font-semibold text-[#444] shadow-sm">
            <Building2 size={13} className="text-[#1673FF]" />
            databricks.com
          </span>
          <span className="rounded-full bg-[#FFE6F2] px-2.5 py-1.5 text-[10px] font-bold text-[#B52D70]">
            🌈 Clay enriched
          </span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          {integrationIds.map((id) => (
            <span
              key={id}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#ECE8E1] bg-white shadow-sm"
            >
              <IntegrationLogo id={id} size={19} />
            </span>
          ))}
          <span className="ml-auto text-[10px] font-semibold text-[#777]">
            +86 more
          </span>
        </div>
      </div>
    );
  }

  if (index === 1) {
    const sources = [
      ["BuiltWith", "bg-[#E5EFFF] text-[#255DA8]"],
      ["PredictLeads", "bg-[#F0E9FF] text-[#684CB4]"],
      ["BuyerCaddy", "bg-[#FFE8ED] text-[#9E3C55]"],
      ["Clay Job Posting", "bg-[#E2F8EF] text-[#147257]"],
    ];

    return (
      <div className="mt-5 rounded-2xl border border-[#EAE6F4] bg-[#FBFAFF] p-3.5">
        <div className="flex flex-wrap gap-1.5">
          {sources.map(([source, className]) => (
            <span
              key={source}
              className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${className}`}
            >
              {source}
            </span>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between rounded-xl border border-[#ECE8F3] bg-white px-3 py-2.5">
          <span className="flex items-center gap-1.5 text-[11px] font-medium text-[#666]">
            <CalendarDays size={14} className="text-[#745FD0]" />
            Detection date attached
          </span>
          <span className="flex items-center gap-1 text-[10px] font-semibold text-[#087A58]">
            <BadgeCheck size={14} /> Evidence present
          </span>
        </div>
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="mt-5 rounded-2xl border border-[#E4EAF4] bg-[#F7FAFF] p-3.5">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1.5">
            {integrationIds.map((id) => (
              <span
                key={id}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-white shadow-sm"
              >
                <IntegrationLogo id={id} size={17} />
              </span>
            ))}
          </div>
          <ArrowRight size={16} className="shrink-0 text-[#8DA1BE]" />
          <div className="min-w-0 flex-1 rounded-lg border border-[#D9E5F8] bg-white px-2.5 py-2 text-left">
            <p className="truncate text-[10px] font-bold text-[#1D4F91]">
              TypeScript matcher
            </p>
            <p className="text-[9px] text-[#71839B]">normalized IDs + aliases</p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 text-[10px] font-semibold text-[#315C91]">
          <Layers3 size={14} /> Clay signals become integration context
        </div>
      </div>
    );
  }

  const tasks = [
    ["Confirm target account", true],
    ["Review least-privilege access", true],
    ["Run an authorized test request", false],
  ] as const;

  return (
    <div className="mt-5 rounded-2xl border border-[#E2EEE9] bg-[#F6FCF9] p-3.5">
      <div className="space-y-2">
        {tasks.map(([task, complete]) => (
          <div key={task} className="flex items-center gap-2 text-[10px] font-medium text-[#4B5F58]">
            <span
              className={`flex h-4 w-4 items-center justify-center rounded ${
                complete ? "bg-[#1673FF] text-white" : "border border-[#B9C9C2] bg-white"
              }`}
            >
              {complete && <Check size={10} strokeWidth={3} />}
            </span>
            <span className={complete ? "text-[#78857F] line-through" : ""}>{task}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#DCEAE4]">
          <div className="h-full w-2/3 rounded-full bg-[#54CFA2]" />
        </div>
        <Download size={14} className="text-[#168363]" />
      </div>
    </div>
  );
}

export default function FeatureStack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    if (hovered || focused || reducedMotion) return;

    const rotationTimer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % cards.length);
    }, 2500);

    return () => window.clearInterval(rotationTimer);
  }, [focused, hovered, reducedMotion]);

  return (
    <div
      className="-mb-[80px] mx-auto w-full min-w-0 origin-top scale-[0.84] sm:-mb-[65px] sm:scale-[0.87]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocused(false);
        }
      }}
    >
      <div className="feature-stack-stage relative h-[462px] w-full [perspective:1400px] sm:h-[482px]">
        {cards.map((card, index) => {
          const position = (index - activeIndex + cards.length) % cards.length;
          const accent = accentStyles[card.accent];

          return (
            <button
              key={card.title}
              type="button"
              data-position={position}
              onClick={() => setActiveIndex(index)}
              tabIndex={position === 0 ? 0 : -1}
              aria-label={`Show card ${index + 1}: ${card.eyebrow}`}
              aria-current={position === 0 ? "step" : undefined}
              aria-hidden={position !== 0}
              className={`feature-stack-card absolute left-0 top-0 h-[382px] w-[calc(100%-3rem)] overflow-hidden rounded-[24px] border border-[#D8D3CA] text-left shadow-[0_24px_60px_rgba(41,36,28,0.14),0_4px_14px_rgba(41,36,28,0.07)] outline-none transition-[transform,opacity,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-4 focus-visible:ring-[#B9D2FF] motion-reduce:transition-none sm:h-[372px] sm:w-[calc(100%-6rem)] ${accent.surface}`}
              style={{ zIndex: cards.length - position }}
            >
              <span className={`block h-1.5 w-full ${accent.bar}`} />
              <span className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full border-[18px] border-[#F4F1EC] opacity-80" />

              <span className="relative block p-5 sm:p-6">
                <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] ${accent.badge}`}>
                  {card.eyebrow}
                </span>

                <span className="mt-3 block text-[22px] font-bold leading-[1.08] tracking-[-0.045em] text-[#171717] sm:text-[25px]">
                  {card.title}
                </span>

                <span className={`mt-3 inline-flex rounded-lg px-2.5 py-1.5 text-[11px] font-bold ${accent.metric}`}>
                  {card.highlight}
                </span>

                <span className="mt-3 block text-[12px] font-medium leading-[1.55] text-[#666] sm:text-[13px]">
                  {card.description}
                </span>

                <CardVisual index={index} />
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-1 flex items-center justify-between gap-4 pl-1 sm:pr-12">
        <div className="flex items-center gap-2" aria-label="Feature cards">
          {cards.map((card, index) => (
            <button
              key={card.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show card ${index + 1}: ${card.eyebrow}`}
              aria-current={activeIndex === index ? "step" : undefined}
              className={`h-2.5 rounded-full transition-[width,background-color] duration-300 motion-reduce:transition-none ${
                activeIndex === index
                  ? "w-7 bg-[#1673FF]"
                  : "w-2.5 bg-[#CFCAC1] hover:bg-[#A9A39A]"
              }`}
            />
          ))}
        </div>

        <p className="text-[11px] font-bold tabular-nums tracking-[0.08em] text-[#777]" aria-live="polite">
          {String(activeIndex + 1).padStart(2, "0")} / {String(cards.length).padStart(2, "0")}
        </p>
      </div>

      <p className="mt-3 pl-1 text-[10px] leading-4 text-[#8A867F] sm:pr-12">
        Demo figures reflect the current Databricks dataset and illustrative integration catalog.
      </p>
    </div>
  );
}
