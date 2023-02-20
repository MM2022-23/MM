import axios from "axios";
import { BASE_URL } from "./Constants";
const HOTE_BASE_API_URL = `${BASE_URL}/admin/`;

class AdminAPIService {
  //   password required
  getAllOrders() {
    return axios.post(`${HOTE_BASE_API_URL}getOrders`, {
      password: "MirchiMeals",
    });
  }
  getDeliveryOrders() {
    return axios.get(`${HOTE_BASE_API_URL}ordersDelivery`);
  }
  getOrderByNumber(orderNumber) {
    return axios.post(`${HOTE_BASE_API_URL}orderById`, {
      orderNumber: orderNumber,
    });
  }

  //   Delete order
  deleteOrder(OrderId) {
    return axios.post(`${HOTE_BASE_API_URL}deleteOrder`, {
      orderNumber: OrderId,
      password: "MirchiMeals",
    });
  }

  //   If delivery guy wants to report to Admin
  report(msg) {
    return axios.post(`${HOTE_BASE_API_URL}report`, msg);
  }
}

export default new AdminAPIService();
