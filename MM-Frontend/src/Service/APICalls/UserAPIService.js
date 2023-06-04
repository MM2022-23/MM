import axios from "axios";
import { BASE_URL } from "../Constants";
const USER_BASE_REST_API_URL = `${BASE_URL}/auth/`;

class UserApiServer {
  // Create; REGISTER
  registerUser(user) {
    localStorage.setItem("Loading", 6);
    return axios.post(`${USER_BASE_REST_API_URL}register`, user);
  }

  registerNoSignUps(user) {
    return axios.post(`${USER_BASE_REST_API_URL}registerNoSignUps`, user);
  }

  // HOTEL LOG IN
  hotelLogIn(password) {
    return axios.post(`${USER_BASE_REST_API_URL}hotelLogin`, {pass: password});
  }

  // ADMIN LOG IN
  adminLogIn(password) {
    return axios.post(`${USER_BASE_REST_API_URL}adminLogin`, {pass: password});
  }

  // LOG IN
  logUserIn(user) {
    localStorage.setItem("Loading", 6);
    return axios.post(`${USER_BASE_REST_API_URL}login`, user);
  }
  // UPDATE
  updateUser(user) {
    localStorage.setItem("Loading", 6);
    return axios.put(`${USER_BASE_REST_API_URL}update`, user);
  }

  forgotPassword(email) {
    return axios.post(`${USER_BASE_REST_API_URL}forgotPassword`, {
      email: email,
    });
  }
}

export default new UserApiServer();
