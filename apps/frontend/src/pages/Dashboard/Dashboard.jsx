import "./Dashboard.css";

import { useState } from "react";

import Sidebar from "../../components/dashboard/Sidebar/Sidebar";
import Header from "../../components/dashboard/Header/Header";
import WelcomeSection from "../../components/dashboard/WelcomeSection/WelcomeSection";
import StatsCards from "../../components/dashboard/StatsCards/StatsCards";
import AnalyticsSection from "../../components/dashboard/AnalyticsSection/AnalyticsSection";
import RecentPatients from "../../components/dashboard/RecentPatients/RecentPatients";

const Dashboard = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (

    <div className="dashboard">

      {/* Sidebar */}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}

      <div className="dashboard-main">

        {/* Header */}

        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Dashboard Content */}

        <div className="dashboard-content">

          <WelcomeSection />

          <StatsCards />

          <AnalyticsSection />

          <RecentPatients />

        </div>

      </div>

    </div>

  );

};

export default Dashboard;