import "./AIPrediction.css";

import { useState } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar/Sidebar";
import Header from "../../components/dashboard/Header/Header";

import PredictionCard from "../../components/prediction/PredictionCard/PredictionCard";
import ECGPreview from "../../components/prediction/ECGPreview/ECGPreview";

const AIPrediction = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { state } = useLocation();

  const patient = state?.patient;
  const ecg = state?.ecg;

  // ===============================
  // Default Values
  // ===============================

  let prediction = "No Prediction";
  let confidence = 0;
  let risk = "Unknown";
  let recommendation =
    "No ECG analysis is available.";

  // ===============================
  // Get First Beat Prediction
  // ===============================

  if (ecg?.results?.length > 0) {

    const firstBeat = ecg.results[0];

    prediction = firstBeat.prediction;

    confidence = firstBeat.confidence;

    if (prediction === "Normal Beat (N)") {

      risk = "Low Risk";

      recommendation =
        "Normal heart rhythm detected. No significant abnormality was found in the uploaded ECG signal.";

    }

    else {

      risk = "High Risk";

      recommendation =
        "Abnormal ECG rhythm detected. Please consult a cardiologist for further medical evaluation.";

    }

  }

  return (

    <div className="prediction-page">

      {/* Sidebar */}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main */}

      <div className="prediction-main">

        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="prediction-content">

          {/* Title */}

          <div className="prediction-title">

            <h1>

              AI Prediction Results

            </h1>

            <p>

              Deep Learning Based ECG Arrhythmia Classification

            </p>

          </div>

          {/* Main Container */}

          <div className="prediction-container">

            {/* ========================= */}
            {/* Patient Summary */}
            {/* ========================= */}

            <div className="patient-summary">

              <div>

                <span className="label">

                  Patient Name

                </span>

                <h3>

                  {patient?.patient_name || "Unknown"}

                </h3>

              </div>

              <div>

                <span className="label">

                  User ID

                </span>

                <h3>

                  #{patient?.user_id || "--"}

                </h3>

              </div>

              <div>

                <span className="label">

                  Gender

                </span>

                <h3>

                  {patient?.gender || "--"}

                </h3>

              </div>

              <div>

                <span className="label">

                  Blood Group

                </span>

                <h3>

                  {patient?.blood_group || "--"}

                </h3>

              </div>

              <div>

                <span className="label">

                  Total Beats

                </span>

                <h3>

                  {ecg?.beats || "--"}

                </h3>

              </div>

              <div>

                <span className="label">

                  Processing Time

                </span>

                <h3>

                  {ecg?.processing_time_ms
                    ? `${ecg.processing_time_ms.toFixed(2)} ms`
                    : "--"}

                </h3>

              </div>

            </div>

            {/* ========================= */}
            {/* AI Prediction */}
            {/* ========================= */}

            <PredictionCard

              prediction={prediction}

              confidence={confidence}

              risk={risk}

              recommendation={recommendation}

            />

            {/* ========================= */}
            {/* ECG Preview */}
            {/* ========================= */}

            <ECGPreview

              ecg={ecg}

            />

          </div>

        </div>

      </div>

    </div>

  );

};

export default AIPrediction;