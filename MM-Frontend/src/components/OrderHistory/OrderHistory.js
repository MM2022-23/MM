import DataCollectionAPIService from "../../Service/APICalls/DataCollectionAPIService";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import React from "react";
import Table from "react-bootstrap/Table";
import userSession from "../../Service/Data/userSession";
import OrderAPIService from "../../Service/APICalls/OrderAPIService";
import ReactGA from "react-ga4";
const OrderHistory = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(null);

  const useLoc = useLocation();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    } else {
      const activity = userSession.isLoggedIn()
        ? `Viewed OrderHistory: ${userSession.getUser().emailAddress}`
        : "Viewed OrderHistory: Anon";
      const dataToSend = {
        sessionID: userSession.getSessionID(),
        pageView: "OrderHistory",
        activity: activity,
      };
      DataCollectionAPIService.pageViewCollect(dataToSend)
        .then((r) => {})
        .catch((err) => {});
      const fetchHistory = () => {
        // console.log("SERVICE CALLED....");
        OrderAPIService.orderHistory({ id: userSession.getUser().id })
          .then((response) => {
            if (response.status == 200) {
              setOrders(response.data);
            } else {
              setOrders(null);
            }
          })
          .catch((err) => {
            // console.log(err);
            setOrders(null);
          });
      };
      !orders && fetchHistory();
    }
  }, []);

  const toHomePage = () => {
    navigate("/");
  };
  const noHistory = () => {
    return (
      <section
        className="md-primary"
        style={{ fontFamily: "Signika", padding: "64px 32px" }}
      >
        <div
          className="container text-center"
          style={{
            marginRight: "auto",
            marginBottom: "340px",
            marginLeft: "auto",
          }}
        >
          <div style={{ marginTop: "40px" }}>
            {/* Image */}
            <img
              className="img-fluid"
              src={require("../../Resources/Vector/noHistory.png")}
              style={{ height: "60%", width: "50%" }}
            />
            {/* Help Text */}
            <div style={{ marginTop: "" }}>
              <p
                className=""
                style={{
                  fontSize: "2.5vw",
                  marginTop: "8.5vh",
                  marginBottom: "6.5vh",
                }}
              >
                Uh-Oh! Looks like you don't have any orders yet! Try our meals
                now!
              </p>

              {/* Order Button */}
              <div className="h-100 d-flex align-items-center justify-content-center">
                <Link to="/order">
                  <Button
                    variant="secondary"
                    className="text-primary"
                    style={{
                      height: "50px",
                      width: "150px",
                      borderRadius: "25px",
                      fontSize: "25px",
                    }}
                  >
                    Order
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const history = () => {
    return (
      <section
        className="bg-primary"
        style={{ fontFamily: "Signika", padding: "20% 32px" }}
      >
        <Table striped bordered hover style={{ fontSize: "2vw" }}>
          <thead>
            <tr>
              <th>Order#</th>
              <th>Meal Size</th>
              <th>Types of Meals</th>
              <th>Price</th>
              <th>Date Ordered</th>
              <th>Delivery Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const {
                OrderId,
                deliveryDate,
                totalPrice,
                mealSize,
                orderDate,
                meals,
              } = order;
              return (
                <tr>
                  <td>{OrderId}</td>
                  <td>{mealSize}</td>
                  <td>
                    {meals.map((meal) => {
                      return (
                        <span>
                          {`${meal.name} x${meal.Quantity}`}
                          <br></br>
                        </span>
                      );
                    })}
                  </td>
                  <td>{totalPrice}</td>
                  <td>{orderDate}</td>
                  <td>{deliveryDate}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <div className="mt-4">
          If you would like to cancel your order, please email
          support@mirchimeals.com before 3pm the prior day of delivery.
        </div>
      </section>
    );
  };

  const viewOrderHistoryPage = () => {
    // fetchOrders();
    if (orders) {
      if (orders.length === 0) {
        return noHistory();
      } else {
        return history();
      }
    } else {
      return <div>Loading... </div>;
    }
  };
  return <>{isLoggedIn ? viewOrderHistoryPage() : toHomePage()}</>;
};

export default OrderHistory;
