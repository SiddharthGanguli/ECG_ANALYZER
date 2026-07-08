import "./RightPanel.css";
import { useState } from "react";

import RoleSelector from "../RoleSelector/RoleSelector";
import LoginForm from "../LoginForm/LoginForm";
import SignupForm from "../SignupForm/SignupForm";
import SocialLogin from "../SocialLogin/SocialLogin";

const RightPanel = ({ mode = "login" }) => {
  // Shared role state
  const [role, setRole] = useState("doctor");

  return (
    <section className="right-panel">
      <div className="login-card">

        {/* Header */}
        <div className="login-header">
          <h1>
            {mode === "login"
              ? "Welcome Back!"
              : "Create Account"}
          </h1>

          <p>
            {mode === "login"
              ? "Login to your account to continue"
              : "Join ECG AI Analyzer today"}
          </p>
        </div>

        {/* Role Selector */}
        <RoleSelector
          role={role}
          setRole={setRole}
        />

        {/* Forms */}
        {mode === "login" ? (
          <LoginForm role={role} />
        ) : (
          <SignupForm role={role} />
        )}

        {/* Social Login */}
        <SocialLogin mode={mode} />

      </div>
    </section>
  );
};

export default RightPanel;