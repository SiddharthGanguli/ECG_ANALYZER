import "./UploadArea.css";

import { useRef, useState } from "react";

import {
  FaCloudUploadAlt,
  FaFileMedical,
  FaCheckCircle,
} from "react-icons/fa";

const UploadArea = () => {

  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleBrowse = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {

    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
    }

  };

  return (

    <div className="upload-card">

      <h2>ECG File Upload</h2>

      <p className="upload-subtitle">

        Upload ECG recording for AI analysis

      </p>

      {/* Upload Area */}

      <div
        className="upload-dropzone"
        onClick={handleBrowse}
      >

        <FaCloudUploadAlt className="upload-icon" />

        <h3>Drag & Drop ECG File</h3>

        <p>
          or click to browse files
        </p>

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
          accept=".csv,.mat,.dat,.hea"
          onChange={handleFileChange}
        />

      </div>

      {/* Selected File */}

      {selectedFile && (

        <div className="selected-file">

          <FaCheckCircle />

          <div>

            <h4>{selectedFile.name}</h4>

            <span>

              {(selectedFile.size / 1024).toFixed(1)} KB

            </span>

          </div>

        </div>

      )}

      {/* Supported */}

      <div className="supported-formats">

        <h4>Supported Formats</h4>

        <div className="format-list">

          <span>CSV</span>

          <span>MAT</span>

          <span>DAT</span>

          <span>HEA</span>

        </div>

      </div>

      {/* Analyze */}

      <button className="analyze-btn">

        <FaFileMedical />

        Analyze ECG Signal

      </button>

    </div>

  );

};

export default UploadArea;