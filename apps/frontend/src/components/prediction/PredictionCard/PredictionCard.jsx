import "./PredictionCard.css";

import {
  FaHeartbeat,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";

const PredictionCard = ({
  prediction,
  confidence,
  risk,
  recommendation,
}) => {

  const isHighRisk = risk === "High Risk";

  return (

    <div className="prediction-card">

      <div className="prediction-left">

        <div
          className={
            isHighRisk
              ? "risk-icon high"
              : "risk-icon low"
          }
        >

          {isHighRisk
            ? <FaExclamationTriangle />
            : <FaCheckCircle />
          }

        </div>

      </div>

      <div className="prediction-center">

        <span
          className={
            isHighRisk
              ? "risk-badge high"
              : "risk-badge low"
          }
        >

          {risk}

        </span>

        <h2>

          {prediction}

        </h2>

        <div className="confidence">

          Confidence

          <strong>

            {confidence}%

          </strong>

        </div>

        <p>

          {recommendation}

        </p>

      </div>

      <div className="prediction-right">

        <div className="heart-circle">

          <FaHeartbeat />

        </div>

      </div>

    </div>

  );

};

export default PredictionCard;