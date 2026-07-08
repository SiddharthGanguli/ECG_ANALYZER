import "./LeftPanel.css";

import logo from "../../../assets/logo.png";
import heart from "../../../assets/heart.png";

import {
  ShieldCheck,
  Zap,
  Lock,
  Shield,
} from "lucide-react";

const LeftPanel = () => {
  return (
    <div className="left-panel">

      {/* Background Grid */}

      {/* Logo */}

      <div className="logo-section">

        <img
          src={logo}
          alt="Logo"
          className="logo"
        />

        <div className="brand-copy">

          <h3>ECG AI</h3>

          <span>Analyzer</span>

        </div>

      </div>

      {/* Hero */}

      <div className="hero-content">

        <h1>

          AI-Powered ECG
          <br />

          Analysis for Better

          <br />

          <span>Heart Health</span>

        </h1>

        <p>

          Advanced deep learning models to detect
          abnormalities in ECG signals with high
          accuracy and reliability.

        </p>

      </div>

      {/* Heart */}

      <div className="hero-image">

        <img
          src={heart}
          alt="Heart"
        />

        <div className="ecg-line"></div>

      </div>

      {/* Features */}

      <div className="features">

        <div className="feature">

          <div className="icon blue">

            <ShieldCheck size={24} />

          </div>

          <div>

            <h4>Accurate Analysis</h4>

            <p>
              High accuracy AI models for reliable results.
            </p>

          </div>

        </div>

        <div className="feature">

          <div className="icon purple">

            <Zap size={24} />

          </div>

          <div>

            <h4>Fast Results</h4>

            <p>
              Get your ECG analysis in seconds.
            </p>

          </div>

        </div>

        <div className="feature">

          <div className="icon green">

            <Lock size={24} />

          </div>

          <div>

            <h4>Secure & Private</h4>

            <p>

              Your data is encrypted and always protected.

            </p>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="footer">

        <Shield size={18} />

        <span>HIPAA Compliant</span>

        <span>•</span>

        <span>Secure</span>

        <span>•</span>

        <span>Confidential</span>

      </div>

    </div>
  );
};

export default LeftPanel;