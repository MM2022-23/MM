import axios from "axios";
import { BASE_URL } from "../Constants";
const SHOWDB_BASE_API_URL = `${BASE_URL}/showDB/`;

class ShowDBAPIService {
  //   Get userEntered data
  getUserEntered() {
    return axios.post(`${SHOWDB_BASE_API_URL}getUserEntered`, {
      password: "MirchiMeals",
    });
  }


  getCustomers() {
    return axios.post(`${SHOWDB_BASE_API_URL}getCustomers`, {
      password: "MirchiMeals",
    });
  }



  getOrderPageCollection() {
    return axios.post(`${SHOWDB_BASE_API_URL}getOrderPageCollection`, {
      password: "MirchiMeals",
    });
  }

  getPickMealsPageCollection() {
    return axios.post(`${SHOWDB_BASE_API_URL}getPickMealsPageCollection`, {
      password: "MirchiMeals",
    });
  }

  getPageActivity(){
    return axios.post(`${SHOWDB_BASE_API_URL}getPageActivity`, {
      password: "MirchiMeals",
    });
  }


}

export default new ShowDBAPIService();
