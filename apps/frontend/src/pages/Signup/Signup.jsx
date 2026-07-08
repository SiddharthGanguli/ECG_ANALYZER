import "./Signup.css";

import LeftPanel from "../../components/auth/LeftPanel/LeftPanel";
import RightPanel from "../../components/auth/RightPanel/RightPanel";

const Signup = () => {
  return (
    <div className="signup-page">
      <LeftPanel />
      <RightPanel mode="signup" />
    </div>
  );
};

export default Signup;