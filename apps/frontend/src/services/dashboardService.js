import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

// ===============================
// Dashboard
// ===============================

export const getDashboard = async () => {

  const response = await axios.get(
    `${API_URL}/dashboard`
  );

  return response.data;

};

// ===============================
// Patient History
// ===============================

export const getPatientHistory = async () => {

  const response = await axios.get(
    `${API_URL}/patients/recent`
  );

  return response.data;

};