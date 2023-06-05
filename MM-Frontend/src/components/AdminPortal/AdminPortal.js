/**
 * API call required
 */
import { Form } from "react-bootstrap";

import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import React from "react";
import HotelAPIService from "../../Service/APICalls/HotelAPIService";
import AdminAPIService from "../../Service/APICalls/AdminAPIService";
import PopUp from "../../SharedComponents/PopUp/PopUp";
import DateService from "../../Service/Algorithms/DateService";
import UserAPIService from "../../Service/APICalls/UserAPIService";
const AdminPortal = () => {
  const [pinLabel, setPinLabel] = useState(
    <label for="exampleInputEmail1" className="mb-2">
      PIN
    </label>
  );
  const [loading, setLoading] = useState("Log In");
  const [pinValue, setPinValue] = useState("");
  const [ordersTable, setOrdersTable] = useState(null);

  const [ordersNoSignUps, setOrdersNoSignUps] = useState(null);
  useEffect(() => {
    getAllOrders();
    getAllOrdersNoSignUp();
  }, []);
  const [orderNumber, setOrderNumber] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayReport, setDisplayReport] = useState(false);
  const [status, setStatus] = useState("Submit");
  const handleCloseReport = () => {
    setReport("");
    setReportLabel(<span>Report</span>);
    setStatus("Submit");
    setDisplayReport(false);
  };

  // report states
  const [report, setReport] = useState("");
  const [reportLabel, setReportLabel] = useState(<span>Report</span>);

  // password for delete
  const [statusPopUp, setStatusPopUp] = useState(false);
  const [statusTitle, setStatusTitle] = useState("");
  const [statusBody, setStatusBody] = useState("");

  /**
   * API call to send notifcation to admin
   */
  const handleSubmitReport = () => {
    // console.log("clicked:  " + report);
    if (report.length === 0) {
      setReportLabel(<span style={{ color: "red" }}>Report **</span>);
    } else {
      setStatus("Loading...");
      HotelAPIService.report({ msg: report })
        .then((response) => {
          // console.log(response);
          setStatus("Submit");
          setReportLabel(
            <span style={{ color: "green" }}>
              Admin was notified successfully
            </span>
          );
          setTimeout(() => {
            handleCloseReport();
          }, 3000);
        })
        .catch((err) => {
          setStatus("Submit");
          setReportLabel(
            <span style={{ color: "red" }}>
              Could'nt notify Admin, please call them
            </span>
          );
        });
    }
  };

  // do validation of pin after than let user in
  const handleSubmit = () => {
    setLoading("Loading ...");
    if (pinValue.length > 0) {
      UserAPIService.adminLogIn(pinValue)
        .then((response) => {
          setLoading("Log In");
          if (response.status === 200) {
            setIsLoggedIn(true);
            setPinLabel(
              <label for="exampleInputEmail1" className="mb-2">
                PIN
              </label>
            );
            setPinValue("");
          } else {
            setLoading("Log In");
            setPinLabel(
              <label
                for="exampleInputEmail1"
                className="mb-2"
                style={{ color: "red" }}
              >
                Incorrect PIN
              </label>
            );
          }
        })
        .catch((err) => {
          setLoading("Log In");
          setPinLabel(
            <label
              for="exampleInputEmail1"
              className="mb-2"
              style={{ color: "red" }}
            >
              Incorrect PIN
            </label>
          );
        });
    } else {
      setLoading("Log In");
      setPinLabel(
        <label
          for="exampleInputEmail1"
          className="mb-2"
          style={{ color: "red" }}
        >
          Enter Valid PIN
        </label>
      );
    }

    // if (pinValue === "123") {
    //   setIsLoggedIn(true);
    //   setPinLabel(
    //     <label for="exampleInputEmail1" className="mb-2">
    //       PIN
    //     </label>
    //   );
    // } else {
    //   setPinLabel(
    //     <label
    //       for="exampleInputEmail1"
    //       className="mb-2"
    //       style={{ color: "red" }}
    //     >
    //       Incorrect PIN
    //     </label>
    //   );
    // }
  };
  const logInBox = () => {
    return (
      <div
        className="container min-vh-100 align-items-center d-flex justify-content-center"
        style={{ fontFamily: "Signika" }}
      >
        <form
          style={{ backgroundColor: "rgb(247, 193, 68)", padding: "20px" }}
          className="rounded"
        >
          <Row className="mb-4">
            <div className="form-group">
              {pinLabel}
              <input
                type="number"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter PIN"
                onChange={(e) => setPinValue(e.target.value)}
                value={pinValue}
              />
            </div>
          </Row>

          <div className="container text-center">
            <Button variant="dark" onClick={handleSubmit} className="">
              Log In
            </Button>
          </div>
        </form>
      </div>
    );
  };

  /**
   * API calls will be made by following functions
   */
  const getAllOrders = () => {
    // console.log("Get all orders");
    AdminAPIService.getAllOrders()
      .then((res) => {
        setOrdersTable(res.data);
      })
      .catch((err) => {
        // console.log("Erro while fetching Orders Table::: " + err);
      });
  };

  /**
   * Get orders of people who did'nt sign up
   */
  const getAllOrdersNoSignUp = () => {
    // console.log("Get all orders");
    AdminAPIService.getAllOrdersNoSignUp()
      .then((res) => {
        setOrdersNoSignUps(res.data);
      })
      .catch((err) => {
        // console.log("Erro while fetching Orders Table::: " + err);
      });
  };

  const getDeliveryOrders = () => {
    // console.log("Inside of delivery function");
    AdminAPIService.getDeliveryOrders()
      .then((res) => {
        // console.log("From deliv orders backend");
        setOrdersTable(res.data);
      })
      .catch((err) => {
        // console.log("Erro while fetching Orders Table::: " + err);
      });
  };

  const getOrderByNumber = () => {
    AdminAPIService.getOrderByNumber(orderNumber)
      .then((res) => {
        setOrdersTable(res.data);
      })
      .catch((err) => {
        // console.log("Erro while fetching Orders Table::: " + err);
      });
  };

  const deleteAPICall = (orderNumber, password) => {
    AdminAPIService.deleteOrder(orderNumber, password)
      .then((res) => {
        setStatusTitle("Loading...");
        // successful
        if (res.status === 200) {
          setStatusTitle("Deleted Successfully");
          setStatusBody("Deleted Successfully");
          setTimeout(() => {
            setStatusTitle("Admin Delete Credentials");
            setStatusBody(
              <>
                <input
                  placeholder="password"
                  className="text-center"
                  id="deleteCredPassword"
                />
                <Button
                  className="mx-2"
                  variant="light"
                  onClick={() =>
                    deleteAPICall(
                      orderNumber,
                      document.getElementById("deleteCredPassword").value
                    )
                  }
                >
                  Submit
                </Button>
              </>
            );
            setStatusPopUp(false);
          }, 2000);
          getAllOrders();
          // console.log("Success delete");
        } else {
          setStatusTitle(
            <p className="lead" style={{ color: "red" }}>
              Incorrect password! Try Again
            </p>
          );
        }
      })
      .catch((err) => {
        getAllOrders();
        // console.log("Erro while fetching Orders Table::: " + err);
      });
  };

  const deleteAPICallNoSignUps = (orderNumber, password) => {
    AdminAPIService.deleteOrderNoSignUps(orderNumber, password)
      .then((res) => {
        setStatusTitle("Loading...");
        // successful
        if (res.status === 200) {
          setStatusTitle("Deleted Successfully");
          setStatusBody("Deleted Successfully");
          setTimeout(() => {
            setStatusTitle("Admin Delete Credentials");
            setStatusBody(
              <>
                <input
                  placeholder="password"
                  className="text-center"
                  id="deleteCredPassword"
                />
                <Button
                  className="mx-2"
                  variant="light"
                  onClick={() =>
                    deleteAPICall(
                      orderNumber,
                      document.getElementById("deleteCredPassword").value
                    )
                  }
                >
                  Submit
                </Button>
              </>
            );
            setStatusPopUp(false);
          }, 2000);
          getAllOrdersNoSignUp();
          // console.log("Success delete");
        } else {
          setStatusTitle(
            <p className="lead" style={{ color: "red" }}>
              Incorrect password! Try Again
            </p>
          );
        }
      })
      .catch((err) => {
        getAllOrdersNoSignUp();
        // console.log("Erro while fetching Orders Table::: " + err);
      });
  };

  /**
   * IF deletable, ask for password, hit backend
   * ELSE let admin know in Pop Up
   */
  const deleteOrder = (orderNumber, shippingDate) => {
    // if shipping date is upcoming sunday and today is
    setStatusTitle("Admin Delete Credentials");
    if (
      shippingDate === DateService.closestUpcomingSunday() &&
      (DateService.isSunday() ||
        (DateService.isSaturday() &&
          new Date().getHours() % 12 >= 3 &&
          new Date().getHours() >= 12))
    ) {
      setStatusBody("Can't delete this order");
    } else {
      let passew = "";
      setStatusBody(
        <>
          <input
            placeholder="password"
            className="text-center"
            onChange={(e) => {
              passew = e.target.value;
            }}
          />
          <Button
            className="mx-2"
            variant="light"
            onClick={() => deleteAPICall(orderNumber, passew)}
          >
            Submit
          </Button>
        </>
      );
    }
    setStatusPopUp(true);
  };

  const deleteOrderNoSignUps = (orderNumber, shippingDate) => {
    // if shipping date is upcoming sunday and today is
    setStatusTitle("Admin Delete Credentials");
    if (
      shippingDate === DateService.closestUpcomingSunday() &&
      (DateService.isSunday() ||
        (DateService.isSaturday() &&
          new Date().getHours() % 12 >= 3 &&
          new Date().getHours() >= 12))
    ) {
      setStatusBody("Can't delete this order");
    } else {
      let passew = "";
      setStatusBody(
        <>
          <input
            placeholder="password"
            className="text-center"
            onChange={(e) => {
              passew = e.target.value;
            }}
          />
          <Button
            className="mx-2"
            variant="light"
            onClick={() => deleteAPICallNoSignUps(orderNumber, passew)}
          >
            Submit
          </Button>
        </>
      );
    }
    setStatusPopUp(true);
  };

  const showTableForRegularCustomers = () => {
    if (ordersTable === null) {
      return <p className="text-center">Loading...</p>;
    } else if (ordersTable.length === 0) {
      return <p className="text-center">No Orders Yet For Regular Customers</p>;
    } else {
      return (
        <>
          <section style={{ fontFamily: "Signika", padding: "64px 32px" }}>
            <h1
              style={{ fontFamily: "Signika", fontSize: "5vw" }}
              className="text-center mb-4"
            >
              Orders
            </h1>

            <Table
              striped
              bordered
              hover
              style={{ fontSize: "2.2vw", fontFamily: "Signika" }}
            >
              <thead>
                <tr>
                  <th>Order#</th>
                  <th>Meals</th>
                  <th>Due Date</th>
                  <th>Address</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {ordersTable.map((order) => {
                  const { orderNumber, meals, dueDate, address } = order;
                  return (
                    <tr>
                      <td>{orderNumber}</td>

                      <td>
                        {meals.map((meal) => {
                          return (
                            <span>
                              {`${meal[0]} : ${meal[1]}`}
                              <br></br>
                            </span>
                          );
                        })}
                      </td>
                      <td>{dueDate}</td>
                      <td>{address}</td>
                      <td>
                        <Button
                          variant="light"
                          style={{
                            width: "9vw",
                            fontSize: "2vw",
                            padding: "1px",
                          }}
                          className="text-center"
                          onClick={(e) => {
                            e.preventDefault();
                            // setOrdersTable(null);
                            deleteOrder(orderNumber, dueDate);
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </section>
        </>
      );
    }
  };

  const showTableForNoSignUpsCustomers = () => {
    if (ordersNoSignUps === null) {
      return <p className="text-center">Loading...</p>;
    } else if (ordersNoSignUps.length === 0) {
      return <p className="text-center">No Orders Yet For Customers without Sign Ups</p>;
    } else {
      return (
        <>
          <section style={{ fontFamily: "Signika", padding: "64px 32px" }}>
            <h1
              style={{ fontFamily: "Signika", fontSize: "5vw" }}
              className="text-center mb-4"
            >
              Orders For No Sign Ups
            </h1>

            <Table
              striped
              bordered
              hover
              style={{ fontSize: "2.2vw", fontFamily: "Signika" }}
            >
              <thead>
                <tr>
                  <th>Order#</th>
                  <th>Meals</th>
                  <th>Due Date</th>
                  <th>Address</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {ordersNoSignUps.map((order) => {
                  const { orderNumber, meals, dueDate, address } = order;
                  return (
                    <tr>
                      <td>{orderNumber}</td>

                      <td>
                        {meals.map((meal) => {
                          return (
                            <span>
                              {`${meal[0]} : ${meal[1]}`}
                              <br></br>
                            </span>
                          );
                        })}
                      </td>
                      <td>{dueDate}</td>
                      <td>{address}</td>
                      <td>
                        <Button
                          variant="light"
                          style={{
                            width: "9vw",
                            fontSize: "2vw",
                            padding: "1px",
                          }}
                          className="text-center"
                          onClick={(e) => {
                            e.preventDefault();
                            // setOrdersTable(null);
                            deleteOrderNoSignUps(orderNumber, dueDate);
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </section>
        </>
      );
    }
  };

  const actualPortal = () => {
    return (
      <>
        <Button
          variant="light"
          className="text-dark text-center float-start position-fixed"
          onClick={() => setDisplayReport(true)}
        >
          Report
        </Button>
        <Button
          variant="light"
          className="text-dark text-center float-end"
          onClick={() => setIsLoggedIn(false)}
        >
          Log Out
        </Button>

        <div class="d-flex align-items-center">
          <div class="container">
            <div class="col-12 text-center">
              <div>
                <input
                  type="number"
                  placeholder="Order Number"
                  className="text-center"
                  value={orderNumber}
                  style={{
                    marginRight: "1vw",
                    width: "20vw",
                    fontSize: "2vw",
                    borderRadius: "0.5vw",
                    borderColor: "black",
                  }}
                  onChange={(e) => setOrderNumber(e.target.value)}
                />
                <Button
                  variant="light"
                  style={{
                    width: "9vw",
                    fontSize: "2vw",
                    padding: "1px",
                  }}
                  className="text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    setOrdersTable(null);
                    getOrderByNumber();
                  }}
                >
                  Search
                </Button>
              </div>
              <div style={{ marginTop: "1vh", marginBottom: "1vh" }}>
                <button
                  class="btn btn-light"
                  style={{ width: "9vw", fontSize: "2vw", padding: "1px" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setOrderNumber("");
                    setOrdersTable(null);
                    getAllOrders();
                  }}
                >
                  All
                </button>
                <button
                  class="btn btn-light"
                  style={{
                    marginLeft: "3vw",
                    width: "9vw",
                    fontSize: "2vw",
                    padding: "1px",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    setOrderNumber("");
                    setOrdersTable(null);
                    getDeliveryOrders();
                  }}
                >
                  Delivery
                </button>
              </div>
            </div>
          </div>
        </div>

        {showTableForRegularCustomers()}
        {showTableForNoSignUpsCustomers()}

        <Modal
          show={displayReport}
          onHide={handleCloseReport}
          style={{ fontFamily: "Signika" }}
        >
          <Modal.Header closeButton style={{ textAlign: "center" }}>
            <Modal.Title>Report</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p className="lead">Describe report in detail</p>
            <form>
              <div className="mb-3">
                <label>{reportLabel}</label>
                <textarea
                  className="form-control"
                  onChange={(e) => setReport(e.target.value)}
                ></textarea>
              </div>
            </form>
          </Modal.Body>

          <Modal.Footer>
            {/* Submit Button Clicked */}
            <Button
              className="text-center"
              variant="light"
              onClick={handleSubmitReport}
            >
              <span>{status}</span>
            </Button>
            <Button
              className="text-center"
              variant="light"
              onClick={handleCloseReport}
            >
              <span>Close</span>
            </Button>
          </Modal.Footer>
        </Modal>
        <PopUp
          displayPopUp={statusPopUp}
          setDisplayPopUp={setStatusPopUp}
          title={statusTitle}
          body={statusBody}
        />
      </>
    );
  };

  return <>{!isLoggedIn ? logInBox() : actualPortal()}</>;
};

export default AdminPortal;
