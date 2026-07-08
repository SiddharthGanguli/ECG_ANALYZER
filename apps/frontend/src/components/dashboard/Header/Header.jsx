import "./Header.css";

import { useState, useEffect } from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  FaSearch,
  FaBell,
  FaBars,
} from "react-icons/fa";

import DoctorProfilePopup from "../../profile/DoctorProfilePopup";

const Header = ({ setSidebarOpen }) => {

  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  // Detect mobile screen
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 768
  );

  useEffect(() => {

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);

  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {

    if (e.key === "Enter" && search.trim() !== "") {

      navigate(
        `/doctor/patient-history?search=${encodeURIComponent(search)}`
      );

    }

  };

  const getPageName = () => {

    switch (location.pathname) {

      case "/doctor/dashboard":
        return "Dashboard";

      case "/doctor/upload-ecg":
        return "Upload ECG";

      case "/doctor/patient-history":
        return "Patient History";

      default:
        return "Dashboard";

    }

  };

  return (

    <>

      <header className="header">

        {/* Left */}

        <div className="header-left">

          <button
            className="menu-btn"
            onClick={() => setSidebarOpen(true)}
          >

            <FaBars />

          </button>

          {/* Mobile shows only page name */}

          {isMobile ? (

            <span className="current-page">

              {getPageName()}

            </span>

          ) : (

            <>

              <span className="breadcrumb">

                ECG AI

              </span>

              <span className="divider">

                /

              </span>

              <span className="current-page">

                {getPageName()}

              </span>

            </>

          )}

        </div>

        {/* Right */}

        <div className="header-right">

          {/* Desktop Search */}

          {!isMobile && (

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

          )}

          {/* Mobile Search Icon */}

          {isMobile && (

  <button
    className="mobile-search-btn"
    onClick={() => navigate("/doctor/patient-history")}
  >

    <FaSearch />

  </button>

)}

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

      </header>

      <DoctorProfilePopup
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
      />

    </>

  );

};

export default Header;