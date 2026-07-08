import "./StatsCards.css";

import {
  FaUserInjured,
  FaHeartbeat,
  FaExclamationTriangle,
  FaBrain,
} from "react-icons/fa";

const StatsCards = () => {

  const stats = [

    {
      title: "Patients",
      value: "245",
      icon: <FaUserInjured />,
      color: "#2563eb",
      bg: "#eff6ff",
    },

    {
      title: "ECGs Analysed",
      value: "530",
      icon: <FaHeartbeat />,
      color: "#10b981",
      bg: "#ecfdf5",
    },

    {
      title: "Critical Cases",
      value: "12",
      icon: <FaExclamationTriangle />,
      color: "#ef4444",
      bg: "#fef2f2",
    },

    {
      title: "AI Accuracy",
      value: "98.7%",
      icon: <FaBrain />,
      color: "#7c3aed",
      bg: "#f5f3ff",
    },

  ];

  return (

    <section className="stats-grid">

      {stats.map((item, index) => (

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