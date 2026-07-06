import "./Header.css";

import { useState } from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  FaSearch,
  FaBell,
} from "react-icons/fa";

import DoctorProfilePopup from "../../profile/DoctorProfilePopup";

const Header = () => {

  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {

    if (e.key === "Enter" && search.trim() !== "") {

      navigate(
        `/doctor/patient-history?search=${encodeURIComponent(search)}`
      );

    }

  };

  // Dynamic Page Name
  const getPageName = () => {

    switch (location.pathname) {

      case "/doctor/dashboard":
        return "Dashboard";

      case "/doctor/upload-ecg":
        return "Upload ECG";

      case "/doctor/patient-history":
        return "Patient History";

      case "/doctor/signal-analysis":
        return "Signal Analysis";

      case "/doctor/ai-prediction":
        return "AI Prediction";

      case "/doctor/reports":
        return "Reports";

      case "/doctor/settings":
        return "Settings";

      default:
        return "Dashboard";

    }

  };

  return (

    <header className="header">

      {/* Left */}

      <div className="header-left">

        <span className="breadcrumb">
          ECG AI
        </span>

        <span className="divider">
          /
        </span>

        <span className="current-page">
          {getPageName()}
        </span>

      </div>

      {/* Right */}

      <div className="header-right">

        {/* Search */}

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search patients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
          />

        </div>

        {/* Notification */}

        <button className="notification-btn">

          <FaBell />

          <span className="notification-dot"></span>

        </button>

        {/* Profile */}

        <div
          className="profile"
          onClick={() => setShowProfile(true)}
        >

          <div className="profile-avatar">

            JB

          </div>

        </div>

      </div>

      {/* Doctor Profile Popup */}

      <DoctorProfilePopup
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
      />

    </header>

  );

};

export default Header;