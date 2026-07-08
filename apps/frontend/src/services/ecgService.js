import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const uploadECG = async (formData) => {
  const response = await axios.post(
    `${API_URL}/ecg/ecg/analyze`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};