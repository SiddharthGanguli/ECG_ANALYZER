import "./PatientForm.css";

import {
  FaIdCard,
  FaUser,
  FaCalendarAlt,
  FaVenusMars,
  FaTint,
  FaRulerVertical,
  FaWeight,
  FaPhoneAlt,
} from "react-icons/fa";

const PatientForm = ({ patientData, setPatientData }) => {

  const handleChange = (e) => {
    setPatientData({
      ...patientData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="patient-card">

      <h2>Patient Information</h2>

      <p className="patient-subtitle">
        Verify patient information before ECG analysis.
      </p>

      {/* User ID */}

      <label>User ID</label>

      <div className="input-box">

        <FaIdCard />

        <input
          type="number"
          name="user_id"
          placeholder="Enter User ID"
          value={patientData.user_id}
          onChange={handleChange}
        />

      </div>

      {/* Patient Name */}

      <label>Patient Name</label>

      <div className="input-box">

        <FaUser />

        <input
          type="text"
          name="patient_name"
          placeholder="Enter Patient Name"
          value={patientData.patient_name}
          onChange={handleChange}
        />

      </div>

      {/* Date of Birth */}

      <label>Date of Birth</label>

      <div className="input-box">

        <FaCalendarAlt />

        <input
          type="date"
          name="date_of_birth"
          value={patientData.date_of_birth}
          onChange={handleChange}
        />

      </div>

      {/* Gender */}

      <label>Gender</label>

      <div className="input-box">

        <FaVenusMars />

        <select
          name="gender"
          value={patientData.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

      </div>

      {/* Blood Group */}

      <label>Blood Group</label>

      <div className="input-box">

        <FaTint />

        <select
          name="blood_group"
          value={patientData.blood_group}
          onChange={handleChange}
        >
          <option value="">Select Blood Group</option>

          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>AB+</option>
          <option>AB-</option>
          <option>O+</option>
          <option>O-</option>

        </select>

      </div>

      {/* Height */}

      <label>Height (cm)</label>

      <div className="input-box">

        <FaRulerVertical />

        <input
          type="number"
          name="height"
          placeholder="Enter Height"
          value={patientData.height}
          onChange={handleChange}
        />

      </div>

      {/* Weight */}

      <label>Weight (kg)</label>

      <div className="input-box">

        <FaWeight />

        <input
          type="number"
          name="weight"
          placeholder="Enter Weight"
          value={patientData.weight}
          onChange={handleChange}
        />

      </div>

      {/* Emergency Contact */}

      <label>Emergency Contact</label>

      <div className="input-box">

        <FaPhoneAlt />

        <input
          type="text"
          name="emergency_contact"
          placeholder="Enter Emergency Contact"
          value={patientData.emergency_contact}
          onChange={handleChange}
        />

      </div>

    </div>
  );
};

export default PatientForm;