import DashboardHeader from "@/components/DashboardHeader";
import DisclaimerFooter from "@/components/DisclaimerFooter";
import ReportTabs from "@/components/ReportTabs";
import Sidebar from "@/components/Sidebar";

export default function ReportPage() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col bg-white">
        <div className="mx-auto w-full max-w-7xl flex-1 px-5 py-5 md:px-8">
          <DashboardHeader />
          <ReportTabs />
        </div>

        <DisclaimerFooter />
      </main>
    </div>
  );
}
