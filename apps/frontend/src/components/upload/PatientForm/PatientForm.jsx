import "./PatientForm.css";

import { useState } from "react";

import {
  FaUser,
  FaIdCard,
  FaBirthdayCake,
  FaNotesMedical,
} from "react-icons/fa";

const PatientForm = () => {

  const [patient, setPatient] = useState({
    name: "",
    patientId: "",
    age: "",
    lead: "",
    notes: "",
  });

  const handleChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="patient-card">

      <h2>Patient Information</h2>

      <p className="patient-subtitle">
        Enter patient details before ECG analysis.
      </p>

      {/* Full Name */}

      <label>Full Name</label>

      <div className="input-box">

        <FaUser />

        <input
          type="text"
          name="name"
          placeholder="Enter patient name"
          value={patient.name}
          onChange={handleChange}
        />

      </div>

      {/* Patient ID */}

      <label>Patient ID</label>

      <div className="input-box">

        <FaIdCard />

        <input
          type="text"
          name="patientId"
          placeholder="Enter patient ID"
          value={patient.patientId}
          onChange={handleChange}
        />

      </div>

      {/* Age */}

      <label>Age</label>

      <div className="input-box">

        <FaBirthdayCake />

        <input
          type="number"
          name="age"
          placeholder="Enter age"
          value={patient.age}
          onChange={handleChange}
        />

      </div>

      {/* Lead */}

      <label>Lead Configuration</label>

      <select
        name="lead"
        value={patient.lead}
        onChange={handleChange}
      >
        <option value="">
          Select Lead
        </option>

        <option>Lead I</option>

        <option>Lead II</option>

        <option>Lead III</option>

        <option>12 Lead ECG</option>

      </select>

      {/* Notes */}

      <label>Clinical Notes</label>

      <div className="textarea-box">

        <FaNotesMedical />

        <textarea
          name="notes"
          rows="5"
          placeholder="Add clinical notes..."
          value={patient.notes}
          onChange={handleChange}
        ></textarea>

      </div>

    </div>
  );
};

export default PatientForm;