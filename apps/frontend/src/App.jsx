import { BrowserRouter, Routes, Route } from "react-router-dom";

// =========================
// Authentication Pages
// =========================

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

// =========================
// Doctor Pages
// =========================

import Dashboard from "./pages/Dashboard/Dashboard";
import UploadECG from "./pages/UploadECG/UploadECG";
import PatientHistory from "./pages/PatientHistory/PatientHistory";
import AIPrediction from "./pages/AIPrediction/AIPrediction";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Authentication */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        {/* Doctor */}

        <Route
          path="/doctor/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/doctor/upload-ecg"
          element={<UploadECG />}
        />

        <Route
          path="/doctor/ai-prediction"
          element={<AIPrediction />}
        />

        <Route
          path="/doctor/patient-history"
          element={<PatientHistory />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;