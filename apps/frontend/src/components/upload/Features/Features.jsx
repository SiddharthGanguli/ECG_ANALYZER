import "./Features.css";

import {
  FaBolt,
  FaShieldAlt,
  FaBrain,
} from "react-icons/fa";

const Features = () => {
  return (
    <section className="features-section">

      {/* Card 1 */}

      <div className="feature-card">

        <div className="feature-icon blue">

          <FaBolt />

        </div>

        <h3>Fast Processing</h3>

        <p>
          Analyze ECG recordings within seconds using
          our optimized AI pipeline.
        </p>

      </div>

      {/* Card 2 */}

      <div className="feature-card">

        <div className="feature-icon green">

          <FaShieldAlt />

        </div>

        <h3>Clinical Grade</h3>

        <p>
          High accuracy AI models trained on
          standard ECG datasets for reliable results.
        </p>

      </div>

      {/* Card 3 */}

      <div className="feature-card">

        <div className="feature-icon purple">

          <FaBrain />

        </div>

        <h3>AI Powered Diagnosis</h3>

        <p>
          Detect cardiac abnormalities with deep learning
          models in real time.
        </p>

      </div>

    </section>
  );
};

export default Features;