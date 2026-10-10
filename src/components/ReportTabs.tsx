"use client";

import { useState } from "react";
import Overview from "@/components/Overview";
import TechStack from "@/components/TechStack";
import OnboardingWorkspace from "@/components/OnboardingWorkspace";

const tabs = [
  "Overview",
  "Tech Stack",
  "Onboarding Workspace",
] as const;

export default function ReportTabs() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <>
      <nav
        aria-label="Report sections"
        className="mb-5 mt-6 flex gap-8 overflow-x-auto border-b border-slate-200"
      >
        {tabs.map((tab) => {
        //   const available = tab === "Overview" || tab === "Tech Stack";
        const available = true;

          return (
            <button
              key={tab}
              type="button"
              disabled={!available}
              onClick={() => setActiveTab(tab)}
              aria-current={activeTab === tab ? "page" : undefined}
              className={`shrink-0 border-b-2 px-2 pb-4 text-sm font-medium ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : available
                    ? "border-transparent text-slate-600 hover:text-blue-600"
                    : "cursor-not-allowed border-transparent text-slate-400"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </nav>

      {activeTab === "Overview" && <Overview />}
      {activeTab === "Tech Stack" && <TechStack />}
      {activeTab === "Onboarding Workspace" && <OnboardingWorkspace />}
    </>
  );
}