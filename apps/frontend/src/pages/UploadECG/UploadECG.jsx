import "./UploadECG.css";

import Sidebar from "../../components/dashboard/Sidebar/Sidebar";
import Header from "../../components/dashboard/Header/Header";

import UploadHeader from "../../components/upload/UploadHeader/UploadHeader";
import PatientForm from "../../components/upload/PatientForm/PatientForm";
import UploadArea from "../../components/upload/UploadArea/UploadArea";
import Features from "../../components/upload/Features/Features";

const UploadECG = () => {
  return (
    <div className="upload-page">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="upload-main">

        {/* Header */}
        <Header />

        {/* Page Content */}
        <div className="upload-content">

          {/* Upload Page Header */}
          <UploadHeader />

          {/* Patient Form + Upload Area */}
          <div className="upload-grid">

            <PatientForm />

            <UploadArea />

          </div>

          {/* Feature Cards */}
          <Features />

        </div>

      </div>

    </div>
  );
};

export default UploadECG;