import "./SignupForm.css";
import { getFirebaseError } from "../../../utils/firebaseErrors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../../services/authService";
import {
  User,
  Mail,
  Phone,
  Lock,
} from "lucide-react";

const SignupForm = ({ role }) => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    registrationNumber: "",
    hospital: "",
    specialization: "",
    dob: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  // Password Validation
  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  setLoading(true);

  try {
    // Create Firebase User
    const user = await signup(
      formData.email,
      formData.password,
      formData.fullName
    );

    console.log("Firebase User:", user);

    <Alert
    type="success"
    message="Account created successfully!"
/>

    // Go back to Login page
    navigate("/");

  } catch (error) {
    console.error(error);

    alert(getFirebaseError(error.code));

  } finally {
    setLoading(false);
  }
};

return (

  
  <form
  className="signup-form"
  onSubmit={handleSubmit}
>

    <div className="form-group">

      <label>Full Name</label>

      <div className="input-box">

        <User size={20} />

        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />

      </div>

    </div>
  <div className="form-group">

  <label>Email Address</label>

  <div className="input-box">

    <Mail size={20} />

    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="Enter your email address"
      required
    />

  </div>

</div>

    <div className="form-group">
  <label>Phone Number</label>

  <div className="input-box">
    <Phone size={20} />

    <input
      type="tel"
      name="phone"
      value={formData.phone}
      onChange={handleChange}
      placeholder="Enter your phone number"
      required
    />
  </div>
</div>

<div className="form-group">
  <label>Password</label>

  <div className="input-box">
    <Lock size={20} />

    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      placeholder="Enter password"
      required
    />
  </div>
</div>

<div className="form-group">
  <label>Confirm Password</label>

  <div className="input-box">
    <Lock size={20} />

    <input
      type="password"
      name="confirmPassword"
      value={formData.confirmPassword}
      onChange={handleChange}
      placeholder="Confirm Password"
      required
    />
  </div>
</div>
<button
  type="submit"
  className="signup-btn"
  disabled={loading}
>
  {loading ? "Creating Account..." : "Create Account"}
</button>
  </form>
  
);
};

export default SignupForm;