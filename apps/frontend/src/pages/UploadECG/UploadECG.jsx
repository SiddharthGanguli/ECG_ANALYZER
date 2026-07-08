import "./UploadECG.css";

import { useState } from "react";

import Sidebar from "../../components/dashboard/Sidebar/Sidebar";
import Header from "../../components/dashboard/Header/Header";

import UploadHeader from "../../components/upload/UploadHeader/UploadHeader";
import PatientForm from "../../components/upload/PatientForm/PatientForm";
import UploadArea from "../../components/upload/UploadArea/UploadArea";
import Features from "../../components/upload/Features/Features";

import { createPatientProfile } from "../../services/patientService";
import { uploadECG } from "../../services/ecgService";

const UploadECG = () => {

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
        alert("Please select a CSV file.");
        return;
      }

      console.log("========== START ==========");
      console.log("Patient Data:", patientData);
      console.log("Selected File:", selectedFile);

      // ==========================
      // Save Patient Profile
      // ==========================

      const payload = {
        ...patientData,
        user_id: Number(patientData.user_id),
        height: Number(patientData.height),
        weight: Number(patientData.weight),
      };

      console.log("Sending Patient Profile...");
      console.log(payload);

      const patientResponse = await createPatientProfile(payload);

      console.log("Patient Saved Successfully");
      console.log(patientResponse);

      // ==========================
      // Upload ECG
      // ==========================

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

      console.log("Uploading ECG...");

      const uploadResponse = await uploadECG(formData);

      console.log("ECG Uploaded Successfully");
      console.log(uploadResponse);

      alert("ECG uploaded successfully!");

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

    } catch (error) {

      console.log("========== ERROR ==========");

      console.error(error);

      if (error.response) {

        console.log("Status Code:");
        console.log(error.response.status);

        console.log("Response Data:");
        console.log(error.response.data);

        console.log("Response Headers:");
        console.log(error.response.headers);

        alert(
          `Backend Error (${error.response.status})\n\n${JSON.stringify(error.response.data, null, 2)}`
        );

      } else if (error.request) {

        console.log("No response received from backend.");
        console.log(error.request);

        alert(
          "No response received from backend.\n\nCheck the FastAPI terminal."
        );

      } else {

        console.log("Request Error:");
        console.log(error.message);

        alert(error.message);

      }

      console.log("========== END ERROR ==========");

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