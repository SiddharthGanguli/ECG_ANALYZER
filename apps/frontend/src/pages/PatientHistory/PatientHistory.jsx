import "./PatientHistory.css";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar/Sidebar";
import Header from "../../components/dashboard/Header/Header";

import HistoryHeader from "../../components/patientHistory/HistoryHeader";
import HistoryStats from "../../components/patientHistory/HistoryStats";
import SearchFilter from "../../components/patientHistory/SearchFilter";
import HistoryTable from "../../components/patientHistory/HistoryTable";

const PatientHistory = () => {

  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");

  // Responsive Sidebar

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {

    const search = searchParams.get("search");

    if (search) {

      setSearchTerm(search);

    }

  }, [searchParams]);

  return (

    <div className="history-page">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="history-main">

        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="history-content">

          <HistoryHeader />

          <HistoryStats />

          <SearchFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <HistoryTable
            searchTerm={searchTerm}
          />

        </div>

      </div>

    </div>

  );

};

export default PatientHistory;