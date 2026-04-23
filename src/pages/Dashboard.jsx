import Sidebar from "../components/DashboardPage/sidebar";
import Header from "../components/DashboardPage/header";
import ReportButton from "../components/DashboardPage/reportbutton";
import ReportHistory from "../components/DashboardPage/reporthistory";
export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 p-8">
        <Header />
        <ReportButton />
        <ReportHistory />
      </div>

    </div>
  )
}