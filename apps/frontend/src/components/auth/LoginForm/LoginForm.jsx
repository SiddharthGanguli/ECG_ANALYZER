import "./LoginForm.css";
import { useState } from "react";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="login-form">

      {/* Email */}

      <div className="form-group">

        <label>Email Address</label>

        <div className="input-box">

          <Mail size={20} />

          <input
            type="email"
            placeholder="Enter your email address"
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
            placeholder="Enter your password"
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
        >
          Forgot Password?
        </button>

      </div>

      {/* Login */}

      <button className="login-btn">

        Login

        <ArrowRight size={18} />

      </button>

    </form>
  );
};

export default LoginForm;