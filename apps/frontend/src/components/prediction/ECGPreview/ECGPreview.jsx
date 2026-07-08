import "./ECGPreview.css";

import {
  FaWaveSquare,
  FaDownload,
  FaRedo,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const ECGPreview = ({ ecg }) => {

  const navigate = useNavigate();

  const firstBeat = ecg?.results?.[0];

  const prediction =
    firstBeat?.prediction || "No Prediction";

  const confidence =
    firstBeat?.confidence || 0;

  const recommendation =
    prediction === "Normal Beat (N)"
      ? "The uploaded ECG appears normal. No significant abnormality was detected by the AI model."
      : "The uploaded ECG contains abnormal heart rhythm patterns. Please consult a cardiologist for further evaluation.";

  return (

    <>

      {/* ECG Graph */}

      <div className="ecg-card">

        <div className="card-header">

          <FaWaveSquare />

          <h2>ECG Signal Visualization</h2>

        </div>

        <div className="ecg-placeholder">

          <svg
            viewBox="0 0 1000 220"
            preserveAspectRatio="none"
          >

            <polyline
              fill="none"
              stroke="#2563eb"
              strokeWidth="4"
              points="
              0,120
              40,120
              80,120
              120,118
              150,120
              180,125
              205,30
              215,180
              240,120
              320,120
              360,118
              390,120
              420,125
              445,30
              455,180
              480,120
              620,120
              660,118
              690,120
              720,125
              745,30
              755,180
              780,120
              1000,120
              "
            />

          </svg>

        </div>

      </div>

      {/* ECG Summary */}

      <div className="recommendation-card">

        <h2>ECG Analysis Summary</h2>

        <p>

          <strong>Prediction:</strong> {prediction}

          <br /><br />

          <strong>Confidence:</strong> {confidence}%

          <br /><br />

          <strong>Total Beats:</strong> {ecg?.beats || 0}

          <br /><br />

          <strong>Processing Time:</strong>{" "}
          {ecg?.processing_time_ms
            ? `${ecg.processing_time_ms.toFixed(2)} ms`
            : "--"}

          <br /><br />

          {recommendation}

        </p>

      </div>

      {/* Buttons */}

      <div className="prediction-buttons">

        <button className="download-btn">

          <FaDownload />

          Download Report

        </button>

        <button
          className="again-btn"
          onClick={() => navigate("/doctor/upload-ecg")}
        >

          <FaRedo />

          Analyze Another ECG

        </button>

      </div>

    </>

  );

};

export default ECGPreview;