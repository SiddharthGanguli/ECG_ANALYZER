import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import UploadECG from "./pages/UploadECG/UploadECG";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* Signup */}
        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Reset Password */}
        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        {/* Doctor Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Upload ECG */}
        <Route
          path="/upload-ecg"
          element={<UploadECG />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;