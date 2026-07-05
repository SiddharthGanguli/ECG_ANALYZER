import "./ResetPassword.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Password Strength
  const getStrength = () => {
    const password = formData.password;

    if (password.length < 6)
      return {
        text: "Weak",
        width: "30%",
        color: "#ef4444",
      };

    if (password.length < 10)
      return {
        text: "Medium",
        width: "65%",
        color: "#f59e0b",
      };

    return {
      text: "Strong",
      width: "100%",
      color: "#22c55e",
    };
  };

  const strength = getStrength();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // Firebase logic will be added later
  };

  return (
    <div className="reset-page">

      <div className="reset-card">

        <div className="reset-logo">

          <ShieldCheck size={45} />

          <h1>ECG AI Analyzer</h1>

          <p>
            AI Powered ECG Diagnosis System
          </p>

        </div>

        <h2>Create New Password</h2>

        <p className="subtitle">
          Your new password must be different
          from your previous password.
        </p>

        <form onSubmit={handleSubmit}>

          {/* Password */}

          <div className="reset-group">

            <label>New Password</label>

            <div className="reset-input">

              <Lock size={20} />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Enter new password"
                value={formData.password}
                onChange={handleChange}
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>

          {/* Confirm */}

          <div className="reset-group">

            <label>
              Confirm Password
            </label>

            <div className="reset-input">

              <Lock size={20} />

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                placeholder="Confirm password"
                value={
                  formData.confirmPassword
                }
                onChange={handleChange}
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>

          {/* Strength */}

          <div className="strength">

            <div className="strength-bar">

              <div
                className="strength-fill"
                style={{
                  width: strength.width,
                  background: strength.color,
                }}
              ></div>

            </div>

            <span
              style={{
                color: strength.color,
              }}
            >
              {strength.text}
            </span>

          </div>

          {/* Button */}

          <button
            className="update-btn"
            type="submit"
          >
            Update Password
          </button>

        </form>

        <Link
          to="/"
          className="back-login"
        >
          <ArrowLeft size={18} />

          Back to Login

        </Link>

      </div>

    </div>
  );
};

export default ResetPassword;