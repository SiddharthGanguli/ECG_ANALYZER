import "./LoginForm.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import { login } from "../../../services/authService";
import { getFirebaseError } from "../../../utils/firebaseErrors";
import { getUserByUid } from "../../../services/userService";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

const LoginForm = ({ role }) => {

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
    // Login with Firebase
    const firebaseUser = await login(
      formData.email,
      formData.password
    );

    console.log("Firebase User:", firebaseUser);

    // Get user from PostgreSQL
    const dbUser = await getUserByUid(firebaseUser.uid);

    console.log("Database User:", dbUser);

    // Check selected role
    if (dbUser.role !== role) {
      toast.error("Wrong Account Type", {
        description: `This account is registered as a ${dbUser.role}.`,
      });

      return;
    }

    console.log("Logged In User:", dbUser);

    toast.success("Login Successful!");

    if (dbUser.role === "doctor") {
      navigate("/doctor/dashboard");
    } else {
      navigate("/patient/dashboard");
    }

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