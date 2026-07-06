import "./UploadECG.css";

import { useState } from "react";

import Sidebar from "../../components/dashboard/Sidebar/Sidebar";
import Header from "../../components/dashboard/Header/Header";

import UploadHeader from "../../components/upload/UploadHeader/UploadHeader";
import PatientForm from "../../components/upload/PatientForm/PatientForm";
import UploadArea from "../../components/upload/UploadArea/UploadArea";
import Features from "../../components/upload/Features/Features";

import { createPatientProfile } from "../../services/patientService";

const UploadECG = () => {

  const [patientData, setPatientData] = useState({
    user_id: "",
    date_of_birth: "",
    gender: "",
    blood_group: "",
    height: "",
    weight: "",
    emergency_contact: "",
  });

  const handleAnalyze = async () => {

    try {

      const payload = {
        ...patientData,
        user_id: Number(patientData.user_id),
        height: Number(patientData.height),
        weight: Number(patientData.weight),
      };

      console.log("Sending Patient Data:", payload);

      const response = await createPatientProfile(payload);

      console.log("API Response:", response);

      alert("Patient information saved successfully!");

      // Clear form after successful save
      setPatientData({
        user_id: "",
        date_of_birth: "",
        gender: "",
        blood_group: "",
        height: "",
        weight: "",
        emergency_contact: "",
      });

    } catch (error) {

      console.error("API Error:", error);

      alert("Failed to save patient information.");

    }

  };

  return (

    <div className="upload-page">

      <Sidebar />

      <div className="upload-main">

        <Header />

        <div className="upload-content">

          <UploadHeader />

          <div className="upload-grid">

            <PatientForm
              patientData={patientData}
              setPatientData={setPatientData}
            />

            <UploadArea
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