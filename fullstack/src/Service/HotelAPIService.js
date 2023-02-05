import axios from "axios";
const HOTE_BASE_API_URL = "https://mm-pure-backend-production.up.railway.app/api/hotel/";

class HotelAPIService {
  
  getMealQuantityTable(date){
    return axios.post(`${HOTE_BASE_API_URL}mealQuantityTable`, date);
  }
  getOrderTables(date){
    return axios.post(`${HOTE_BASE_API_URL}ordersTable`, date);
  }
  report(msg){
    return axios.post(`${HOTE_BASE_API_URL}report`, msg);
  }

}

export default new HotelAPIService();
