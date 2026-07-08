import "./StatsCards.css";

import { useEffect, useState } from "react";

import {
  FaUserInjured,
  FaHeartbeat,
  FaExclamationTriangle,
  FaBrain,
} from "react-icons/fa";

import { getDashboard } from "../../../services/dashboardService";

const StatsCards = () => {

  const [stats, setStats] = useState({

    patients: 0,
    ecgs: 0,
    critical_cases: 0,
    ai_accuracy: 0,

  });

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {

      const data = await getDashboard();

      setStats(data.stats);

    } catch (error) {

      console.error(error);

    }

  };

  const cards = [

    {
      title: "Patients",
      value: stats.patients,
      icon: <FaUserInjured />,
      color: "#2563eb",
      bg: "#eff6ff",
    },

    {
      title: "ECGs Analysed",
      value: stats.ecgs,
      icon: <FaHeartbeat />,
      color: "#10b981",
      bg: "#ecfdf5",
    },

    {
      title: "Critical Cases",
      value: stats.critical_cases,
      icon: <FaExclamationTriangle />,
      color: "#ef4444",
      bg: "#fef2f2",
    },

    {
      title: "AI Accuracy",
      value: `${stats.ai_accuracy}%`,
      icon: <FaBrain />,
      color: "#7c3aed",
      bg: "#f5f3ff",
    },

  ];

  return (

    <section className="stats-grid">

      {cards.map((item, index) => (

        <div
          key={index}
          className="stat-card"
        >

          <div
            className="icon-box"
            style={{
              background: item.bg,
              color: item.color,
            }}
          >

            {item.icon}

          </div>

          <div>

            <p>{item.title}</p>

            <h2>{item.value}</h2>

          </div>

        </div>

      ))}

    </section>

  );

};

export default StatsCards;