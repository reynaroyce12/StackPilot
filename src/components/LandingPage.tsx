"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Database,
  Link2,
  CheckCircle2,
  Layers3,
  Users,
} from "lucide-react";

import FeatureStack from "@/components/FeatureStack";
import DisclaimerFooter from "@/components/DisclaimerFooter";

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
            <div className="rounded-lg bg-blue-600 p-2">
              <Layers3 className="h-5 w-5 text-white" />
            </div>

            <span className="flex flex-col gap-1">
              {/* StackPilot Branding */}
              <span className="text-[22px] font-bold leading-none tracking-[-0.04em] text-[#171717]">
                StackPilot
              </span>

              {/* Clay Attribution */}
              <span className="hidden items-center gap-1.5 sm:flex">
                <span className="text-[12px] font-medium tracking-[-0.015em] text-[#777777]">
                  Engineering productivity, powered by
                </span>

                <img
                  src="/logos/clay-logo.svg"
                  alt="Clay"
                  width={16}
                  height={16}
                  className="h-4 w-4 shrink-0 object-contain"
                />

                <span className="text-[12px] font-semibold tracking-[-0.015em] text-[#343434]">
                  Clay
                </span>
              </span>
            </span>
          </Link>

          {/* Center navigation */}
          <div className="hidden -translate-x-12 items-center gap-9 md:flex">
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

            {/* GitHub link will be activated after publishing
            <button
              type="button"
              disabled
              title="GitHub repository coming soon"
              className="hidden items-center gap-2 rounded-xl border border-[#E8E5DF] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#333333] opacity-60 sm:flex"
            >
              <Star size={17} />
              Star on GitHub
            </button> */}

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
          <div className="mb-8 inline-flex max-w-full flex-wrap items-center justify-center gap-x-4 gap-y-1.5 rounded-full border border-[#E2DDD5] bg-[#FAF9F7] px-5 py-2.5 shadow-sm">
            <span className="flex items-center gap-2.5 text-[14px] font-semibold text-[#292929]">
              Powered by Clay
              <img
                src="/logos/clay-logo.svg"
                alt=""
                width={25}
                height={25}
                className="h-[25px] w-auto object-contain"
              />

            </span>

            <span className="hidden h-5 w-px bg-[#D8D3CB] sm:block" />

            <span className="text-[13px] font-medium text-[#686868]">
              Built for engineering productivity
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
            StackPilot uses Clay&apos;s enrichment feature
            to uncover company technology stacks and transform those insights
            into actionable integration-readiness reports, helping B2B SaaS
            engineering teams reduce manual research and streamline customer
            onboarding.
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

                <h2 className="mt-3 text-[30px] font-medium leading-[1.2] tracking-[-0.045em] text-[#171717] md:text-[36px]">
                  Less research. More engineering.
                </h2>

                <p className="mt-3 text-[15px] font-semibold text-[#3F3F3F]">
                  From Clay enrichment to engineering action.
                </p>

                <p className="mt-4 text-[15px] leading-7 text-[#686868]">
                  StackPilot transforms Clay&apos;s multi-source technology
                  intelligence into actionable integration-readiness plans,
                  helping B2B engineering teams identify potential
                  integrations, verify technical requirements, and streamline
                  customer onboarding with less manual research and clearer
                  next steps.
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

              <FeatureStack />
            </div>
          </div>
        </section>

      </main>

      <DisclaimerFooter />
    </div>
  );
}
