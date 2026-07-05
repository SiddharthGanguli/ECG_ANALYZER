import api from "./api";

export const createUser = async (userData) => {
  const response = await api.post("/users/", userData);
  return response.data;
};
export const getUserByUid = async (uid) => {
  const response = await api.get(`/users/${uid}`);
  return response.data;
};