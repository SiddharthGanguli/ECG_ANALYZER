import "./Sidebar.css";

import { NavLink } from "react-router-dom";

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

        <NavLink
          to="/doctor/dashboard"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FaThLarge />
          Dashboard
        </NavLink>

        <NavLink
          to="/doctor/upload-ecg"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FaUpload />
          Upload ECG
        </NavLink>

        {/* These pages will be created later */}

        <NavLink
          to="#"
          className="menu-item"
        >
          <FaWaveSquare />
          Signal Analysis
        </NavLink>

        <NavLink
          to="#"
          className="menu-item"
        >
          <FaRobot />
          AI Prediction
        </NavLink>

        <NavLink
  to="/doctor/patient-history"
  className={({ isActive }) =>
    isActive ? "menu-item active" : "menu-item"
  }
>
  <FaUserInjured />
  Patient History
</NavLink>

        <NavLink
          to="#"
          className="menu-item"
        >
          <FaFileMedical />
          Reports
        </NavLink>

        <NavLink
          to="#"
          className="menu-item"
        >
          <FaCog />
          Settings
        </NavLink>

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