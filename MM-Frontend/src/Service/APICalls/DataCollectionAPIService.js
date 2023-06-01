import axios from "axios";
import { BASE_URL } from "../Constants";
const DATACOLLECTION_BASE_REST_API_URL = `${BASE_URL}/dataCollection/`;

class DataCollectionAPI {
  // CREATE USER SESSION

  // {time}
  createSession(dataToSend) {
    return axios.post(
      `${DATACOLLECTION_BASE_REST_API_URL}userSession`,
      dataToSend
    );
  }

  // ORDERPAGE DATA COLLECT
  // { sessionID,timeOfRecord,userInfo,zipCode,mealSize,deliveryDateSelected,activity }
  orderPageDataCollect(dataToSend) {
    return axios.post(
      `${DATACOLLECTION_BASE_REST_API_URL}orderPageDataCollect`,
      dataToSend
    );
  }

  // PICK MEALS DATA COLLECT
  // { sessionID,timeOfRecord,userInfo,zipCode,specificMeals,deliveryDateSelected,activity }
  pickMealsPageDataCollection(dataToSend) {
    return axios.post(
      `${DATACOLLECTION_BASE_REST_API_URL}pickMealsPageDataCollection`,
      dataToSend
    );
  }

  // UPDATE FBINFO
  // { sessionID, fbInfo }
  updatefbInfo(dataToSend) {
    return axios.post(
      `${DATACOLLECTION_BASE_REST_API_URL}updatefbInfo`,
      dataToSend
    );
  }

  // { sessionID, timeOfRecord, pageView, activity }
  pageViewCollect(dataToSend) {
    return axios.post(
      `${DATACOLLECTION_BASE_REST_API_URL}insertPageActivity`,
      dataToSend
    );
  }

  add(url) {
    return axios.post(`${DATACOLLECTION_BASE_REST_API_URL}referral`, url);
  }

  storeUnprocessedMeals(selectionInfo) {
    return axios.post(
      `${DATACOLLECTION_BASE_REST_API_URL}unprocessedMeals`,
      selectionInfo
    );
  }

  addZipCode(zipcode) {
    return axios.post(
      `${DATACOLLECTION_BASE_REST_API_URL}zipCodeTracker`,
      zipcode
    );
  }
}

export default new DataCollectionAPI();
