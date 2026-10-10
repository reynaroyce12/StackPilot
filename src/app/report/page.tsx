import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import ReportTabs from "@/components/ReportTabs";

export default function ReportPage() {
  return (
    <div className="flex min-h-screen bg-white">
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