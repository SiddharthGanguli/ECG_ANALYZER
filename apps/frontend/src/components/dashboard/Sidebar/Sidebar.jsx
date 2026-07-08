import "./Sidebar.css";

import { NavLink } from "react-router-dom";

import {
  FaHeartbeat,
  FaThLarge,
  FaUpload,
  FaRobot,
  FaUserInjured,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
}) => {

  const closeSidebar = () => {

    if (window.innerWidth <= 992) {
      setSidebarOpen(false);
    }

  };

  return (
    <>

      {/* Overlay */}

      <div
        className={`sidebar-overlay ${
          sidebarOpen ? "show-overlay" : ""
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}

      <aside
        className={`sidebar ${
          sidebarOpen ? "sidebar-open" : ""
        }`}
      >

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

          {/* Dashboard */}

          <NavLink
            to="/doctor/dashboard"
            end
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <FaThLarge />
            Dashboard
          </NavLink>

          {/* Upload ECG */}

          <NavLink
            to="/doctor/upload-ecg"
            end
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <FaUpload />
            Upload ECG
          </NavLink>

          {/* AI Prediction */}

          <NavLink
            to="/doctor/ai-prediction"
            end
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <FaRobot />
            AI Prediction
          </NavLink>

          {/* Patient History */}

          <NavLink
            to="/doctor/patient-history"
            end
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <FaUserInjured />
            Patient History
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

    </>
  );

};

export default Sidebar;