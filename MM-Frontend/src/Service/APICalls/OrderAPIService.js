import axios from "axios";
import { BASE_URL } from "../Constants";
const ORDER_BASE_REST_API_URL = `${BASE_URL}/checkout/`;

class OrderAPIService {
  addOrder(orderInfo,setSuccessBody) {
    setSuccessBody("Processing....");
    return axios.post(`${ORDER_BASE_REST_API_URL}addOrder`, orderInfo);
  }

  addOrderNoSignUps(orderInfo,setSuccessBody) {
    setSuccessBody("Processing....");
    return axios.post(`${ORDER_BASE_REST_API_URL}addOrderNoSignUps`, orderInfo);
  }
  orderHistory(customerId){
    return axios.post(`${ORDER_BASE_REST_API_URL}getOrderHistory`, customerId);
  }
}

export default new OrderAPIService();
