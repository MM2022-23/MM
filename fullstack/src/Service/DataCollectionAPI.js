import axios from "axios";
const DATACOLLECTION_BASE_REST_API_URL = "https://mm-pure-backend-production.up.railway.app/api/dataCollection/";

class DataCollectionAPI {
  
  add(url) {
    return axios.post(`${DATACOLLECTION_BASE_REST_API_URL}referral`, url);
  }


  storeUnprocessedMeals(selectionInfo) {
    return axios.post(`${DATACOLLECTION_BASE_REST_API_URL}unprocessedMeals`, selectionInfo);
  }

}

export default new DataCollectionAPI();
