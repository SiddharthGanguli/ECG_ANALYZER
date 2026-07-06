import axios from "axios";

const API_URL = "http://localhost:8000";

/* =========================================
   Recent Patients (Dashboard)
========================================= */

export const getRecentPatients = async () => {
  const response = await axios.get(
    `${API_URL}/patients/recent`
  );

  return response.data;
};

/* =========================================
   Patient History
========================================= */

export const getPatientHistory = async () => {
  const response = await axios.get(
    `${API_URL}/patients/recent`
  );

  return response.data;
};