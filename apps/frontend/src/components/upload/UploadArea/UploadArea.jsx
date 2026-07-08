import "./UploadArea.css";

import { useRef } from "react";

import {
  FaCloudUploadAlt,
  FaFileMedical,
  FaCheckCircle,
} from "react-icons/fa";

const UploadArea = ({
  selectedFile,
  setSelectedFile,
  onAnalyze,
}) => {

  const fileInputRef = useRef(null);

  const handleBrowse = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    // Only CSV allowed
    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      alert("Only CSV files are supported.");
      return;
    }

    setSelectedFile(file);
  };

  return (

    <div className="upload-card">

      <h2>ECG File Upload</h2>

      <p className="upload-subtitle">
        Upload ECG recording for AI analysis
      </p>

      <div
        className="upload-dropzone"
        onClick={handleBrowse}
      >

        <FaCloudUploadAlt className="upload-icon" />

        <h3>Drag & Drop ECG File</h3>

        <p>or click to browse files</p>

        <button
          type="button"
          className="browse-file-btn"
        >
          Browse Files
        </button>

        <input
          type="file"
          hidden
          ref={fileInputRef}
          accept=".csv"
          onChange={handleFileChange}
        />

      </div>

      {selectedFile && (

        <div className="selected-file">

          <FaCheckCircle />

          <div>

            <h4>{selectedFile.name}</h4>

            <span>
              {(selectedFile.size / 1024).toFixed(2)} KB
            </span>

          </div>

        </div>

      )}

      <div className="supported-formats">

        <h4>Supported Formats</h4>

        <div className="format-list">

          <span>CSV</span>

        </div>

      </div>

      <button
        className="analyze-btn"
        onClick={onAnalyze}
      >

        <FaFileMedical />

        Analyze ECG Signal

      </button>

    </div>

  );

};

export default UploadArea;