import "./ForgotPassword.css";

import { useState } from "react";
import { Mail, X } from "lucide-react";
import { toast } from "sonner";

import { resetPassword } from "../../../services/authService";
import { getFirebaseError } from "../../../utils/firebaseErrors";

const ForgotPassword = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleReset = async () => {

    if (!email.trim()) {
      toast.error("Email Required", {
        description: "Please enter your registered email address.",
      });
      return;
    }

    try {

      setLoading(true);

      await resetPassword(email);

      toast.success("Password Reset Link Sent", {
        description:
          "Please check your email inbox for the password reset link.",
      });

      setEmail("");

      setTimeout(() => {
        onClose();
      }, 1000);

    } catch (error) {

      console.error(error);

      toast.error("Reset Failed", {
        description: getFirebaseError(error.code),
      });

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="forgot-overlay">

      <div className="forgot-modal">

        {/* Close Button */}

        <button
          className="close-btn"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        {/* Title */}

        <h2>Reset Password</h2>

        <p>
          Enter your registered email address.
          We'll send you a password reset link.
        </p>

        {/* Email */}

        <div className="forgot-input">

          <Mail size={20} />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>

        {/* Send Button */}

        <button
          className="send-btn"
          onClick={handleReset}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {/* Cancel */}

        <button
          className="cancel-btn"
          onClick={onClose}
        >
          Cancel
        </button>

      </div>

    </div>
  );
};

export default ForgotPassword;