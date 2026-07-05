import "./Header.css";

import {
  FaSearch,
  FaBell,
} from "react-icons/fa";

const Header = () => {
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

          Dashboard

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
          />

        </div>

        {/* Notification */}

        <button className="notification-btn">

          <FaBell />

          <span className="notification-dot"></span>

        </button>

        {/* Doctor */}

        <div className="profile">

          <div className="profile-avatar">

            JB

          </div>

        </div>

      </div>

    </header>
  );
};

export default Header;