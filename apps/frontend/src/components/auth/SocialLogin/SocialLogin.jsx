import "./SocialLogin.css";
import { Link } from "react-router-dom";

import googleIcon from "../../../assets/google.svg";
import microsoftIcon from "../../../assets/microsoft.svg";

const SocialLogin = ({ mode }) => {
  return (
    <div className="social-login">

      {/* Divider */}
      <div className="divider">
        <span></span>
        <p>or continue with</p>
        <span></span>
      </div>

      {/* Social Buttons */}
      <div className="social-buttons">

        <button className="social-btn">
          <img src={googleIcon} alt="Google" />
          <span>Continue with Google</span>
        </button>

        <button className="social-btn">
          <img src={microsoftIcon} alt="Microsoft" />
          <span>Continue with Microsoft</span>
        </button>

      </div>

      {/* Bottom Link */}
      <p className="signup-text">
        {mode === "login" ? (
          <>
            Don't have an account?
            <Link to="/signup"> Sign up here</Link>
          </>
        ) : (
          <>
            Already have an account?
            <Link to="/"> Login here</Link>
          </>
        )}
      </p>

    </div>
  );
};

export default SocialLogin;