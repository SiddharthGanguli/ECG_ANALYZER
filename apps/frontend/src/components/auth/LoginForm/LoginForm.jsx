import "./LoginForm.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { login } from "../../../services/authService";
import { getFirebaseError } from "../../../utils/firebaseErrors";

import ForgotPassword from "../ForgotPassword/ForgotPassword";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

const LoginForm = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  // NEW STATE
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {

      const user = await login(
        formData.email,
        formData.password
      );

      console.log("Logged In User:", user);

      toast.success("Login Successful", {
        description: `Welcome back ${
          user.displayName || "Doctor"
        }. Redirecting to dashboard...`,
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (error) {

      console.error(error);

      toast.error("Login Failed", {
        description: getFirebaseError(error.code),
      });

    } finally {

      setLoading(false);

    }
  };

  return (
    <>

      <form
        className="login-form"
        onSubmit={handleSubmit}
      >

        {/* Email */}

        <div className="form-group">

          <label>Email Address</label>

          <div className="input-box">

            <Mail size={20} />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
            />

          </div>

        </div>

        {/* Password */}

        <div className="form-group">

          <label>Password</label>

          <div className="input-box">

            <Lock size={20} />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>

        </div>

        {/* Remember */}

        <div className="form-options">

          <label className="remember">

            <input type="checkbox" />

            Remember me

          </label>

          <button
            type="button"
            className="forgot-btn"
            onClick={() => setShowForgotPassword(true)}
          >
            Forgot Password?
          </button>

        </div>

        {/* Login */}

        <button
          type="submit"
          className="login-btn"
          disabled={loading}
        >
          {loading ? (
            "Signing In..."
          ) : (
            <>
              Login
              <ArrowRight size={18} />
            </>
          )}
        </button>

      </form>

      {/* Forgot Password Popup */}

      <ForgotPassword
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />

    </>
  );
};

export default LoginForm;