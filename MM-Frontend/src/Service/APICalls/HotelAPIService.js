import axios from "axios";
import { BASE_URL } from "../Constants";
const HOTE_BASE_API_URL = `${BASE_URL}/hotel/`;

class HotelAPIService {

  
  
  getMealQuantityTable(date){
    return axios.post(`${HOTE_BASE_API_URL}mealQuantityTable`, date);
  }
  getOrderTables(date){
    return axios.post(`${HOTE_BASE_API_URL}ordersTable`, date);
  }

  getMealQuantityTableForNoSignUps(date){
    return axios.post(`${HOTE_BASE_API_URL}mealQuantityTableNoSignUps`, date);
  }
  getOrderTablesForNoSignUps(date){
    return axios.post(`${HOTE_BASE_API_URL}ordersTableNoSignUps`, date);
  }
  report(msg){
    return axios.post(`${HOTE_BASE_API_URL}report`, msg);
  }

}

export default new HotelAPIService();
