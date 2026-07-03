import "./RoleSelector.css";

import { Stethoscope, User } from "lucide-react";

const RoleSelector = ({ role, setRole }) => {
  return (
    <div className="role-selector">

      {/* Doctor */}

      <button
        type="button"
        className={`role-card ${role === "doctor" ? "active" : ""}`}
        onClick={() => setRole("doctor")}
      >
        <div className="role-icon">
          <Stethoscope size={28} />
        </div>

        <div className="role-content">
          <h3>Doctor</h3>
          <p>Login as Doctor</p>
        </div>
      </button>

      {/* Patient */}

      <button
        type="button"
        className={`role-card ${role === "patient" ? "active" : ""}`}
        onClick={() => setRole("patient")}
      >
        <div className="role-icon">
          <User size={28} />
        </div>

        <div className="role-content">
          <h3>Patient</h3>
          <p>Login as Patient</p>
        </div>
      </button>

    </div>
  );
};

export default RoleSelector;