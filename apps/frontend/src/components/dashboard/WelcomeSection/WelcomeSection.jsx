import "./WelcomeSection.css";

import { FaUpload } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";

const WelcomeSection = () => {
  const { user } = useAuth();

  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="welcome-section">

      {/* Left */}

      <div className="welcome-text">

        <h1>
          Welcome back,
          {" "}
          Dr. {user?.displayName || "Doctor"} 
        </h1>

        <p>

          {formattedDate}

          <span> • Cardiology Department</span>

        </p>

      </div>

      {/* Right */}

      <button className="upload-btn">

        <FaUpload />

        Upload New ECG

      </button>

    </section>
  );
};

export default WelcomeSection;