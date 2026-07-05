import "./Sidebar.css";

import {
  FaHeartbeat,
  FaThLarge,
  FaUpload,
  FaWaveSquare,
  FaRobot,
  FaUserInjured,
  FaFileMedical,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="sidebar">

      {/* Logo */}

      <div className="sidebar-logo">

        <div className="logo-icon">
          <FaHeartbeat />
        </div>

        <div>

          <h2>ECG AI</h2>

          <p>Analyzer</p>

        </div>

      </div>

      {/* Menu */}

      <div className="menu-title">
        MAIN MENU
      </div>

      <nav className="sidebar-menu">

        <button className="menu-item active">

          <FaThLarge />

          Dashboard

        </button>

        <button className="menu-item">

          <FaUpload />

          Upload ECG

        </button>

        <button className="menu-item">

          <FaWaveSquare />

          Signal Analysis

        </button>

        <button className="menu-item">

          <FaRobot />

          AI Prediction

        </button>

        <button className="menu-item">

          <FaUserInjured />

          Patient History

        </button>

        <button className="menu-item">

          <FaFileMedical />

          Reports

        </button>

        <button className="menu-item">

          <FaCog />

          Settings

        </button>

      </nav>

      {/* Doctor */}

      <div className="doctor-card">

        <div className="avatar">

          JB

        </div>

        <div>

          <h4>Dr. Jeet Biswas</h4>

          <p>Cardiologist</p>

        </div>

      </div>

      {/* Logout */}

      <button className="logout-btn">

        <FaSignOutAlt />

        Logout

      </button>

    </aside>
  );
};

export default Sidebar;