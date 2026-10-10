// import { getCompanyProfile } from "@/lib/normalize";
// import { integrations } from "@/data/integrations";
// import { matchIntegrations } from "@/lib/matching";

// export default function Home() {
//   const company = getCompanyProfile();

//   const matches = matchIntegrations(
//     company.technologies,
//     integrations
//   );

//   return (
//     <main className="p-10">
//       <h1 className="text-3xl font-bold">StackPilot</h1>

//       <p className="mt-4">Company: {company.name}</p>
//       <p>Domain: {company.domain}</p>
//       <p>Technologies detected: {company.technologies.length}</p>

//       <pre className="mt-6 overflow-auto rounded-lg bg-gray-100 p-4 text-sm text-black">
//         {JSON.stringify(company.technologies.slice(0, 3), null, 2)}
//       </pre>

//       <section className="mt-10">
//         <h2 className="text-xl font-semibold">
//           Integration Readiness
//         </h2>

//         <div className="mt-4 space-y-4">
//           {matches.map((match) => (
//             <div
//               key={match.integration.id}
//               className="rounded-lg border border-gray-700 p-4"
//             >
//               <h3 className="font-semibold">
//                 {match.integration.name}
//               </h3>

//               <p className="mt-2">
//                 Status:{" "}
//                 {match.status === "detected"
//                   ? "✅ Technology Detected"
//                   : "⚪ Not Detected"}
//               </p>

//               {match.matchedTechnology && (
//                 <>
//                   <p>
//                     First detected:{" "}
//                     {match.matchedTechnology.firstDetected ?? "Unknown"}
//                   </p>

//                   <p>
//                     Evidence:{" "}
//                     {match.matchedTechnology.evidence.join(", ") ||
//                       "Not available"}
//                   </p>
//                 </>
//               )}

//               <h4 className="mt-4 font-medium">
//                 Suggested Onboarding Checklist
//               </h4>

//               <ul className="mt-2 list-disc pl-5">
//                 {match.checklist.map((item) => (
//                   <li key={item}>{item}</li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// }

import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import ReportTabs from "@/components/ReportTabs";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#ffffff]">
      <Sidebar />

      <main className="min-w-0 flex-1 bg-white px-5 py-5 md:px-8">
        <div className="mx-auto max-w-7xl">
          <DashboardHeader />
          <ReportTabs />
        </div>
      </main>
    </div>
  );
}