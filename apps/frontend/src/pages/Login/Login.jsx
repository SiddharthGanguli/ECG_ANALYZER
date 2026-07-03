import LeftPanel from "../../components/auth/LeftPanel/LeftPanel";
import RightPanel from "../../components/auth/RightPanel/RightPanel";
import "./Login.css";
const Login = () => {
  return (
    <div className="login-page">
      <LeftPanel />
      <RightPanel />
    </div>
  );
};

export default Login;