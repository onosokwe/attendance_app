import axios from "axios";
import instance from "./instance";

const baseURL = "";


const getLoggedInUser = async (token) => {
  const response = await axios.get(
    `${baseURL}/user/mine`,
    { headers: { Authorization: `Bearer ${token}`, }, }
  );
  return response;
};

const logoutUser = async (TOKEN) => {
  console.log(TOKEN)
  const response = await instance.post("/user/logout", TOKEN);
  console.log(response)
  return response;
};

const getUserRadius = async (lat, lon, opts, token) => {
  const { data } = await axios.post(
    `${baseURL}/attendance/address`,
    { lat, lon },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      opts,
    }
  );
  return data;
};

// manage employees
const getOneAdmin = async (id) => {
  const response = await instance.get(`/user/one/${id}`);
  return response;
};
const updateAdmin = async (data, id) => {
  const response = await instance.put(`/user/one/${id}`, data);
  return response;
};
const updatePassword = async (data) => {
  const response = await instance.post(`/user/password`, data);
  return response;
};
const forgotPassword = async (data) => {
  const response = await instance.post(`/user/forgotpass`, data);
  return response;
};
const getResetUserDataByToken = async (id) => {
  const response = await instance.post(`/user/resetuser/${id}`);
  return response;
};
const resetPassword = async (id) => {
  const response = await instance.post(`/user/resetpassword/${id}`);
  return response;
};
const uploadPhoto = async (data) => {
  const formData = new FormData();
  for (const property in data) {
    formData.append(property, data[property]);
  }
  const response = await instance.post("/user/photo", formData);
  return response;
};

// attendance
const getMyAddress = async (data) => {
  const response = await instance.post("/attendance/address", data);
  return response;
};
const clockStaffIn = async (data) => {
  const response = await instance.post("/attendance/clockin", data);
  return response;
};
const getMyLastClockin = async () => {
  const response = await instance.get(`/attendance/last`);
  return response;
};
const getTodaysAttendances = async () => {
  const response = await instance.get(`/attendance/today`);
  return response;
};

const clockStaffOut = async (data) => {
  const response = await instance.put(`/attendance/clockout/${data.id}`, data);
  return response;
};

export {
  getLoggedInUser,
  logoutUser,
  clockStaffIn,
  getUserRadius,
  getMyLastClockin,
  clockStaffOut,
  getOneAdmin,
  updateAdmin,
  getTodaysAttendances,
  getMyAddress,
  updatePassword,
  forgotPassword,
  getResetUserDataByToken,
  resetPassword,
  uploadPhoto,
};