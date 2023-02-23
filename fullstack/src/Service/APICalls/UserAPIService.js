import axios from "axios";
import { BASE_URL } from "../Constants";
const USER_BASE_REST_API_URL = `${BASE_URL}/auth/`;

class UserApiServer {
  // Create; REGISTER
  registerUser(user) {
    localStorage.setItem("Loading", 6);
    return axios.post(`${USER_BASE_REST_API_URL}register`, user);
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
