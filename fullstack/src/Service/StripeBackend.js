import axios from "axios";
import { BASE_URL } from "./Constants";
const STRIPE_REST_API_URL = `${BASE_URL}/checkout/payment`;

class StripeBackend {
  // sends token id, amount, email, to backend, then backend will create charge on stripe
  requestToServer(token, amount, setSuccessBody, setSuccessPopUp) {
    setSuccessBody("Processing....");
    setSuccessPopUp(true);
    return axios.post(STRIPE_REST_API_URL, {
      tokenId: token.id,
      amount: Math.round(amount * 100)
    });
  }
}

export default new StripeBackend();
