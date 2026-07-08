import axios from "axios";

const API_URL = "http://localhost:8000";

export const createPatientProfile = async (patientData) => {

  const response = await axios.post(
    `${API_URL}/patients/profile`,
    patientData
  );

  return response.data;

};