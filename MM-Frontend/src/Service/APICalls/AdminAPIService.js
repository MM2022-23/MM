import axios from "axios";
import { BASE_URL } from "../Constants";
const ADMIN_BASE_API_URL = `${BASE_URL}/admin/`;

class AdminAPIService {
  //   password required
  getAllOrders() {
    return axios.post(`${ADMIN_BASE_API_URL}getOrders`, {
      password: "MirchiMeals",
    });
  }


  getAllOrdersNoSignUp() {
    return axios.post(`${ADMIN_BASE_API_URL}getOrdersNoSignUps`, {
      password: "MirchiMeals",
    });
  }

  getDeliveryOrders() {
    return axios.get(`${ADMIN_BASE_API_URL}ordersDelivery`);
  }
  getOrderByNumber(orderNumber) {
    return axios.post(`${ADMIN_BASE_API_URL}orderById`, {
      orderNumber: orderNumber,
    });
  }

  //   Delete order
  deleteOrder(OrderId,passwd) {
    return axios.post(`${ADMIN_BASE_API_URL}deleteOrder`, {
      orderNumber: OrderId,
      password: passwd
    });
  }

  //   If delivery guy wants to report to Admin
  report(msg) {
    return axios.post(`${ADMIN_BASE_API_URL}report`, msg);
  }
}

export default new AdminAPIService();
