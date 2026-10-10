"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Star,
  Database,
  Link2,
  CheckCircle2,
  Users,
  Sparkles,
} from "lucide-react";

export default function LandingPage() {
  const router = useRouter();

  const [domain, setDomain] = useState("");
  const [error, setError] = useState("");

  const searchRef = useRef<HTMLInputElement>(null);

  function normalizeDomain(value: string) {
    const input = value.trim().toLowerCase();

    if (!input) return "";

    try {
      const url = new URL(
        input.includes("://") ? input : `https://${input}`
      );

      return url.hostname.replace(/^www\./, "");
    } catch {
      return "";
    }
  }

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalized = normalizeDomain(domain);

    if (!normalized) {
      setError("Please enter a valid company domain.");
      return;
    }

    if (normalized !== "databricks.com") {
      setError(
        "Our demo currently includes Databricks. Try databricks.com to explore a real Clay-enriched report."
      );
      return;
    }

    setError("");
    router.push("/report");
  }

  function focusSearch() {
    searchRef.current?.focus();

    searchRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  const features = [
    {
      title: "Detect tech stack",
      description:
        "Using Clay's multi-source enrichment to identify the tools a company uses.",
      Icon: Database,
      background: "bg-[#FFE0EE]",
      color: "text-[#D42D85]",
    },
    {
      title: "Match integrations",
      description:
        "Find relevant tools and technical requirements for integration.",
      Icon: Link2,
      background: "bg-[#E1ECFF]",
      color: "text-[#1673FF]",
    },
    {
      title: "Get a readiness report",
      description:
        "Actionable next steps for your team with technical details.",
      Icon: CheckCircle2,
      background: "bg-[#DDF6EE]",
      color: "text-[#07966C]",
    },
    {
      title: "Built for engineering teams",
      description:
        "Help onboarding and integration engineers move faster with clear context.",
      Icon: Users,
      background: "bg-[#F0E9FF]",
      color: "text-[#7855E8]",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-[#171717]">

      {/* ========================================
          NAVIGATION
      ======================================== */}

      <header className="sticky top-0 z-50 border-b border-[#EEEAE4] bg-white/95 backdrop-blur-md">
        <nav className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-5 px-5 md:px-10 lg:px-14">

          {/* Brand */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
          >
            <div className="relative flex h-10 w-10 items-center justify-center">
              <div className="absolute left-[3px] top-[5px] h-7 w-7 rotate-[-9deg] rounded-[7px] bg-[#F5A4DC]" />
              <div className="absolute left-[6px] top-[4px] h-7 w-7 rotate-[8deg] rounded-[7px] bg-[#9B8AFF]" />
              <div className="absolute left-[6px] top-[8px] h-7 w-7 rounded-[7px] bg-[#1673FF]" />

              <Database
                size={20}
                strokeWidth={2.3}
                className="relative text-white"
              />
            </div>

            <span className="flex flex-col">
              <span className="text-[23px] font-bold leading-none tracking-[-0.055em]">
                StackPilot
              </span>
              <span className="mt-1 hidden whitespace-nowrap text-[12px] font-medium tracking-[-0.01em] text-[#777777] sm:block">
                Developer productivity, powered by Clay enrichment.
              </span>
            </span>
          </Link>

          {/* Center navigation */}
          <div className="hidden items-center gap-9 md:flex">
            <a
              href="#how-it-works"
              className="text-[14px] font-semibold text-[#545454] transition-colors hover:text-black"
            >
              How it works
            </a>

            <a
              href="#use-cases"
              className="text-[14px] font-semibold text-[#545454] transition-colors hover:text-black"
            >
              Use cases
            </a>

          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">

            {/* GitHub link will be activated after publishing */}
            <button
              type="button"
              disabled
              title="GitHub repository coming soon"
              className="hidden items-center gap-2 rounded-xl border border-[#E8E5DF] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#333333] opacity-60 sm:flex"
            >
              <Star size={17} />
              Star on GitHub
            </button>

            <button
              type="button"
              onClick={focusSearch}
              className="rounded-xl bg-[#111827] px-5 py-3 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-black hover:shadow-md"
            >
              Get started
            </button>
          </div>
        </nav>
      </header>

      {/* ========================================
          HERO
      ======================================== */}

      <main>
        <section className="relative mx-auto max-w-[1200px] px-5 pb-12 pt-16 text-center md:px-8 md:pt-20 lg:pt-24">

          {/* Clay badge */}
          <div className="mb-8 inline-flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full border border-[#E8E5DF] bg-[#FAF9F7] px-4 py-2 shadow-sm">
            <span className="flex items-center gap-1.5 text-[12px] font-semibold text-[#292929]">
              <span aria-hidden="true">🌈</span>
              Powered by Clay
            </span>

            <span className="hidden h-4 w-px bg-[#DEDAD3] sm:block" />

            <span className="text-[12px] font-medium text-[#777777]">
              Turn company data into integration readiness
            </span>
          </div>

          {/* Hero headline */}
          <div className="relative mx-auto max-w-[900px]">

            {/* Decorative lines */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-1 top-12 hidden rotate-[-22deg] text-[40px] font-bold text-[#456CFF] lg:block"
            >
              ✳
            </div>

            <h1 className="text-[36px] font-bold leading-[1.13] tracking-[-0.055em] text-[#111827] sm:text-[44px] md:text-[54px] lg:text-[60px]">
              Understand any customer&apos;s
              <br className="hidden md:block" />
              {" "}tech stack and get integration
              <br className="hidden md:block" />
              {" "}ready, faster.
            </h1>
          </div>

          {/* Supporting description */}
          <p className="mx-auto mt-7 max-w-[760px] text-[16px] font-medium leading-[1.7] text-[#666666] md:text-[18px]">
            StackPilot uses Clay&apos;s enrichment infrastructure to
            identify a company&apos;s technology stack and turns it into
            an actionable integration-readiness report for engineering
            and customer onboarding teams.
          </p>

          {/* ========================================
              COMPANY SEARCH
          ======================================== */}

          <div
            id="search"
            className="mx-auto mt-9 max-w-[800px] scroll-mt-32"
          >
            <form
              onSubmit={handleSearch}
              className="flex items-center gap-3 rounded-2xl border border-[#E5E1DA] bg-white p-2.5 shadow-[0_3px_14px_rgba(0,0,0,0.035)] transition-all focus-within:border-[#B7C9FF] focus-within:ring-4 focus-within:ring-blue-50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FAF9F7]">
                <Building2
                  size={21}
                  className="text-[#64748B]"
                />
              </div>

              <input
                ref={searchRef}
                type="text"
                value={domain}
                onChange={(event) => {
                  setDomain(event.target.value);
                  setError("");
                }}
                placeholder="Enter a company domain (e.g. databricks.com)"
                aria-label="Company domain"
                className="min-w-0 flex-1 bg-transparent py-2 text-[15px] font-medium text-[#171717] outline-none placeholder:font-normal placeholder:text-[#94A3B8]"
              />

              <button
                type="submit"
                aria-label="Generate report"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#111827] text-white transition-all hover:bg-black"
              >
                <ArrowRight size={21} />
              </button>
            </form>

            {/* Search errors */}
            {error && (
              <p
                role="alert"
                className="mt-3 text-left text-[13px] font-medium text-[#B45309]"
              >
                {error}
              </p>
            )}

            {/* Example domain */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <span className="text-[13px] font-medium text-[#777777]">
                Try an example:
              </span>

              <button
                type="button"
                onClick={() => {
                  setDomain("databricks.com");
                  setError("");
                  router.push("/report");
                }}
                className="rounded-xl border border-[#E5E1DA] bg-white px-4 py-2 text-[13px] font-semibold text-[#1673FF] transition-colors hover:border-blue-300 hover:bg-blue-50"
              >
                databricks.com
              </button>
            </div>

            <p className="mt-3 text-[12px] text-[#929292]">
              Demo currently available for Databricks using real Clay
              enrichment data.
            </p>
          </div>
        </section>

        {/* ========================================
            FEATURES
        ======================================== */}

        <section
          id="how-it-works"
          className="mx-auto max-w-[1160px] scroll-mt-28 px-5 pb-16 pt-4 md:px-8"
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.Icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-[#EBE7E0] bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#DAD5CC] hover:shadow-[0_10px_30px_rgba(0,0,0,0.045)]"
                >
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${feature.background}`}
                  >
                    <Icon
                      size={23}
                      strokeWidth={2.5}
                      className={feature.color}
                    />
                  </div>

                  <h3 className="text-[16px] font-bold tracking-[-0.025em] text-[#171717]">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-[14px] font-medium leading-[1.6] text-[#686868]">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================
            DEMO SECTION
        ======================================== */}

        <section
          id="use-cases"
          className="scroll-mt-28 border-t border-[#EEEAE4] bg-[#FAF9F7] py-16"
        >
          <div className="mx-auto max-w-[1100px] px-5 md:px-8">
            <div className="grid items-center gap-10 md:grid-cols-2">

              {/* Text */}
              <div>
                <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#1673FF]">
                  Explore StackPilot
                </span>

                <h2 className="mt-3 text-[30px] font-bold leading-[1.2] tracking-[-0.045em] text-[#171717] md:text-[36px]">
                  From Clay enrichment to engineering action.
                </h2>

                <p className="mt-4 text-[15px] leading-7 text-[#686868]">
                  StackPilot transforms Clay&apos;s powerful multi-source
                  enrichment into actionable engineering workflows. Instead
                  of spending hours manually researching customer tech
                  stacks, identifying integrations, and figuring out setup
                  requirements, teams get{" "}
                  <strong className="font-semibold text-[#3F3F3F]">
                    instant technology insights, automated matching, and
                    tailored onboarding plans
                  </strong>
                  , so engineers can focus on building rather than
                  investigating.
                </p>

                <button
                  type="button"
                  onClick={() => router.push("/report")}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#111827] px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-black"
                >
                  Explore demo report
                  <ArrowUpRight size={17} />
                </button>
              </div>

              {/* Company preview */}
              <div className="rounded-2xl border border-[#E5E1DA] bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF5F2] text-[27px] font-bold text-[#FF3621]">
                      ◈
                    </div>

                    <div>
                      <h3 className="text-[17px] font-bold text-[#171717]">
                        Databricks
                      </h3>

                      <p className="text-[13px] text-[#686868]">
                        databricks.com
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-[#E3F8EC] px-3 py-1 text-[12px] font-semibold text-[#087B4B]">
                    Clay enriched
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3 border-y border-[#F0EDE8] py-5">
                  {[
                    { value: "91", label: "Tech entries" },
                    { value: "10", label: "Categories" },
                    { value: "5/5", label: "Catalog matches" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-[25px] font-bold tracking-tight text-[#171717]">
                        {stat.value}
                      </p>

                      <p className="mt-1 text-[12px] font-medium text-[#777777]">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-2 text-[13px] font-medium text-[#686868]">
                  <Sparkles size={16} className="text-[#1673FF]" />
                  Technology intelligence and onboarding preparation
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
