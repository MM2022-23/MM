import axios from "axios";
import { BASE_URL } from "../Constants";
const DATACOLLECTION_BASE_REST_API_URL = `${BASE_URL}/dataCollection/`;

class DataCollectionAPI {
  
  add(url) {
    return axios.post(`${DATACOLLECTION_BASE_REST_API_URL}referral`, url);
  }


  storeUnprocessedMeals(selectionInfo) {
    return axios.post(`${DATACOLLECTION_BASE_REST_API_URL}unprocessedMeals`, selectionInfo);
  }

  addZipCode(zipcode){
    return axios.post(`${DATACOLLECTION_BASE_REST_API_URL}zipCodeTracker`, zipcode);
  }

}

export default new DataCollectionAPI();
