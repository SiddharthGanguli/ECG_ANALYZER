import "./UploadECG.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar/Sidebar";
import Header from "../../components/dashboard/Header/Header";

import UploadHeader from "../../components/upload/UploadHeader/UploadHeader";
import PatientForm from "../../components/upload/PatientForm/PatientForm";
import UploadArea from "../../components/upload/UploadArea/UploadArea";
import Features from "../../components/upload/Features/Features";

import { createPatientProfile } from "../../services/patientService";
import { uploadECG } from "../../services/ecgService";

const UploadECG = () => {

  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const [patientData, setPatientData] = useState({
    user_id: "",
    patient_name: "",
    date_of_birth: "",
    gender: "",
    blood_group: "",
    height: "",
    weight: "",
    emergency_contact: "",
  });

  const handleAnalyze = async () => {

    try {

      if (!selectedFile) {

        alert("Please upload an ECG CSV file.");

        return;

      }

      // ===========================
      // Save Patient Information
      // ===========================

      const payload = {

        ...patientData,

        user_id: Number(patientData.user_id),
        height: Number(patientData.height),
        weight: Number(patientData.weight),

      };

      await createPatientProfile(payload);

      // ===========================
      // Upload ECG CSV
      // ===========================

      const formData = new FormData();

      formData.append(
        "patient_id",
        patientData.user_id
      );

      formData.append(
        "uploaded_by",
        patientData.user_id
      );

      formData.append(
        "file",
        selectedFile
      );

      const uploadResponse = await uploadECG(formData);

      console.log("Backend Response:");
      console.log(uploadResponse);

      // ===========================
      // Navigate to AI Prediction
      // ===========================

      navigate("/doctor/ai-prediction", {

        state: {

          patient: patientData,

          ecg: uploadResponse.ecg,

        },

      });

      // ===========================
      // Reset Form
      // ===========================

      setPatientData({

        user_id: "",
        patient_name: "",
        date_of_birth: "",
        gender: "",
        blood_group: "",
        height: "",
        weight: "",
        emergency_contact: "",

      });

      setSelectedFile(null);

    }

    catch (error) {

      console.error(error);

      if (error.response) {

        alert(
          `Backend Error (${error.response.status})\n\n${JSON.stringify(error.response.data, null, 2)}`
        );

      }

      else if (error.request) {

        alert(
          "No response received from backend."
        );

      }

      else {

        alert(error.message);

      }

    }

  };

  return (

    <div className="upload-page">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="upload-main">

        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="upload-content">

          <UploadHeader />

          <div className="upload-grid">

            <PatientForm
              patientData={patientData}
              setPatientData={setPatientData}
            />

            <UploadArea
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              onAnalyze={handleAnalyze}
            />

          </div>

          <Features />

        </div>

      </div>

    </div>

  );

};

export default UploadECG;