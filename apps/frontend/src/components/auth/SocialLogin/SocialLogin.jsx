import "./SocialLogin.css";
import google from "../../../assets/google.svg";
import microsoft from "../../../assets/microsoft.svg";

const SocialLogin = () => {
  return (
    <div className="social-login">

      {/* Divider */}

      <div className="divider">

        <span></span>

        <p>or continue with</p>

        <span></span>

      </div>

      {/* Buttons */}

      <div className="social-buttons">

        <button className="social-btn">

          <img src={google} alt="Google" />

          <span>Continue with Google</span>

        </button>

        <button className="social-btn">

          <img src={microsoft} alt="Microsoft" />

          <span>Continue with Microsoft</span>

        </button>

      </div>

      {/* Signup */}

      <p className="signup-text">

        Don't have an account?

        <a href="/signup">

          Sign up here

        </a>

      </p>

    </div>
  );
};

export default SocialLogin;