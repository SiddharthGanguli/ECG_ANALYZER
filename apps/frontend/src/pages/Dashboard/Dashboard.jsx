import "./Dashboard.css";

import Sidebar from "../../components/dashboard/Sidebar/Sidebar";
import Header from "../../components/dashboard/Header/Header";
import WelcomeSection from "../../components/dashboard/WelcomeSection/WelcomeSection";
import StatsCards from "../../components/dashboard/StatsCards/StatsCards";
import AnalyticsSection from "../../components/dashboard/AnalyticsSection/AnalyticsSection";
import RecentPatients from "../../components/dashboard/RecentPatients/RecentPatients";
const Dashboard = () => {
  return (
    <div className="dashboard">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="dashboard-main">

        {/* Header */}
        <Header />

        {/* Dashboard Content */}
        <div className="dashboard-content">

          {/* Welcome */}
          <WelcomeSection />

          {/* Statistics */}
          <StatsCards />

          {/* Weekly Analysis + Condition Distribution */}
          <AnalyticsSection />

          <RecentPatients />

        </div>

      </div>

    </div>
  );
};

export default Dashboard;