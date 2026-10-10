import { Search, ExternalLink, Bookmark } from "lucide-react";
import { getCompanyProfile } from "@/lib/normalize";
import { integrations } from "@/data/integrations";
import { matchIntegrations } from "@/lib/matching";

export default function DashboardHeader() {
  const company = getCompanyProfile();
  const matches = matchIntegrations(company.technologies, integrations);

  const detected = matches.filter(
    (match) => match.status === "detected"
  ).length;

  const categories = new Set(
    company.technologies.map((technology) => technology.category)
  ).size;

  return (
    <>
      {/* Search */}
      <div className="flex items-center gap-3 rounded-xl bg-slate-100 px-4 py-2.5">
        <Search size={18} className="text-slate-400" />

        <input
          type="text"
          placeholder="Enter a company domain (e.g. databricks.com)"
          aria-label="Company domain"
          disabled
          className="w-full bg-transparent text-[15px] font-semibold tracking-[-0.035em] text-[#171717] outline-none placeholder:text-slate-400"
        />

        <button
          disabled
          className="rounded-lg bg-slate-900 px-6 py-2 text-sm font-medium text-white opacity-70"
        >
          Search
        </button>
      </div>

      {/* Company header */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-slate-100 bg-white text-3xl text-red-500 shadow-sm">
            ◈
          </div>

          <div>
            <h1 className="text-[28px] font-bold tracking-[-0.04em] text-[#171717]">
              {company.name}
            </h1>

            <a
              href={`https://${company.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 flex items-center gap-2 text-[15px] font-medium text-[#686868] hover:text-blue-600"
            >
              {company.domain}
              <ExternalLink size={13} />
            </a>

            {/* Compact company statistics */}
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] font-medium text-[#686868]">
              <span>
                <strong className="text-slate-800">
                  {company.technologies.length}
                </strong>{" "}
                technologies
              </span>

              <span className="text-slate-300">•</span>

              <span>
                <strong className="text-slate-800">{categories}</strong>{" "}
                categories
              </span>

              <span className="text-slate-300">•</span>

              <span>
                <strong className="text-emerald-600">
                  {detected}/{matches.length}
                </strong>{" "}
                catalog matches
              </span>
            </div>
          </div>
        </div>

        <button
          disabled
          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-400"
        >
          <Bookmark size={16} />
          Save report
        </button>
      </div>
    </>
  );
}