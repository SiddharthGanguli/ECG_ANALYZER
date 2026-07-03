import "./RightPanel.css";

import RoleSelector from "../RoleSelector/RoleSelector";
import LoginForm from "../LoginForm/LoginForm";
import SocialLogin from "../SocialLogin/SocialLogin";

const RightPanel = () => {
  return (
    <section className="right-panel">

      <div className="login-card">

        <div className="login-header">

          <h1>Welcome Back!</h1>

          <p>
            Login to your account to continue
          </p>

        </div>

        <RoleSelector />

        <LoginForm />

        <SocialLogin />

      </div>

    </section>
  );
};

export default RightPanel;