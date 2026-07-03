import "./RoleSelector.css";
import { useState } from "react";
import { UserRound, Stethoscope } from "lucide-react";

const RoleSelector = () => {
  const [role, setRole] = useState("doctor");

  return (
    <div className="role-selector">

      <button
        className={`role-card ${role === "doctor" ? "active" : ""}`}
        onClick={() => setRole("doctor")}
      >
        <Stethoscope size={28} />

        <div>

          <h3>Doctor</h3>

          <p>Login as Doctor</p>

        </div>

      </button>

      <button
        className={`role-card ${role === "patient" ? "active" : ""}`}
        onClick={() => setRole("patient")}
      >
        <UserRound size={28} />

        <div>

          <h3>Patient</h3>

          <p>Login as Patient</p>

        </div>

      </button>

    </div>
  );
};

export default RoleSelector;