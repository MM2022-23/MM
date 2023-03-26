/**
 * API call required
 */
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import React from "react";
import "./Hotel.css";
import MealData from "../../Service/Data/MealData";
import HotelAPIService from "../../Service/APICalls/HotelAPIService";
import DateService from "../../Service/Algorithms/DateService";
import UserAPIService from "../../Service/APICalls/UserAPIService";

const Hotel = () => {
  const [displayTables, setDisplayTables] = useState(false);
  const [pinLabel, setPinLabel] = useState(
    <label for="exampleInputEmail1" className="mb-2">
      PIN
    </label>
  );

  const [loading, setLoading] = useState("Log In");
  const [pinValue, setPinValue] = useState("");
  const [mealQuantityTable, setMealQuantityTable] = useState(null);
  const [ordersTable, setOrdersTable] = useState(null);
  useEffect(() => {
    if (
      DateService.isSunday() ||
      (DateService.isSaturday() &&
        new Date().getHours() % 12 >= 3 &&
        new Date().getHours() >= 12)
    ) {
      console.log("SHOW TABLE BECAUSE IT IS 03:00 PM EST ");
      setDisplayTables(true);
      console.log(displayTables);
      HotelAPIService.getMealQuantityTable({
        date: DateService.closestUpcomingSunday(),
      })
        .then((res) => {
          setMealQuantityTable(res.data);
        })
        .catch((err) => {
          console.log("Error while fetching mealQuantityTable::: " + err);
        });

      //Replace dates with upcoming sunday's date
      HotelAPIService.getOrderTables({
        date: DateService.closestUpcomingSunday(),
      })
        .then((res) => {
          setOrdersTable(res.data);
        })
        .catch((err) => {
          console.log("Erro while fetching Orders Table::: " + err);
        });
    } else {
      console.log(
        `COULD NOT SHOW TABLE BECAUSE IS IT SUNDAY OR SATURDAY: ${
          DateService.isSaturday() || DateService.isSunday()
        } TIME IS ${
          new Date().getHours() % 12
        } IS NOT GREATER THAN 3 IF IT IS THEN IT IS NOT PM ie. ${
          new Date().getHours() >= 12
        }}`
      );
      setDisplayTables(false);
    }
  }, []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayReport, setDisplayReport] = useState(false);
  const [status, setStatus] = useState("Submit");

  const [defaultstatus, setDefaultStatus] = useState("Default");

  const handleCloseReport = () => {
    setReport("");
    setReportLabel(<span>Report</span>);
    setStatus("Submit");
    setDisplayReport(false);
  };

  const [report, setReport] = useState("");
  const [reportLabel, setReportLabel] = useState(<span>Report</span>);
  /**
   * API call to send notifcation to admin
   */
  const handleSubmitReport = () => {
    console.log("clicked:  " + report);
    if (report.length === 0) {
      setReportLabel(<span style={{ color: "red" }}>Report **</span>);
    } else {
      setStatus("Loading...");
      HotelAPIService.report({ msg: report })
        .then((response) => {
          console.log(response);
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

  /**
   * Send order table to Admin
   */

  const sendTablesToAdmin = () => {
    setDefaultStatus("Loading...");
    let tableContent = "";
    mealQuantityTable.map((item) => {
      const { item_id, Total_Quantity } = item;
      tableContent += `${
        MealData.getAllItems()[item_id].mealName
      } x ${Total_Quantity}\n`;
    });
    HotelAPIService.report({ msg: tableContent })
      .then((response) => {
        console.log(response);
        setDefaultStatus("Default");
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
        setDefaultStatus("Default");
        setReportLabel(
          <span style={{ color: "red" }}>
            Could'nt notify Admin, please call them
          </span>
        );
      });
  };

  // do validation of pin after than let user in
  const handleSubmit = () => {
    setLoading("Loading ...");
    if (pinValue.length > 0) {
      UserAPIService.hotelLogIn(pinValue)
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
              {loading}
            </Button>
          </div>
        </form>
      </div>
    );
  };

  const showTables = () => {
    if (mealQuantityTable === null || ordersTable === null) {
      return <>Loading...</>;
    } else if (mealQuantityTable.length === 0 || ordersTable.length === 0) {
      return <p>No Orders Yet</p>;
    } else {
      return (
        <>
          <section
            className="bg-primary"
            style={{ fontFamily: "Signika", padding: "64px 32px" }}
          >
            <h1
              style={{ fontFamily: "Signika", fontSize: "5vw" }}
              className="text-center mb-4"
            >
              Meal Quantity Table
            </h1>
            <Table
              striped
              bordered
              hover
              style={{ fontSize: "3vw", fontFamily: "Signika" }}
            >
              <thead>
                <tr>
                  <th>Meal Type</th>
                  <th>Total Quantity</th>
                  <th>Total Qauntity of contents</th>
                </tr>
              </thead>
              <tbody>
                {mealQuantityTable.map((mealQuantityInfo) => {
                  const { item_id, Total_Quantity } = mealQuantityInfo;
                  return (
                    <tr>
                      <td>{MealData.getAllItems()[item_id].mealName}</td>

                      <td>{Total_Quantity}</td>
                      <td>
                        {Object.keys(
                          MealData.getAllItems()[item_id].description
                        ).map((key) => {
                          return (
                            <span>
                              {`${key} : ${
                                Total_Quantity *
                                MealData.getAllItems()[item_id].description[key]
                              }`}
                              <br></br>
                            </span>
                          );
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </section>
          <section style={{ fontFamily: "Signika", padding: "64px 32px" }}>
            <h1
              style={{ fontFamily: "Signika", fontSize: "5vw" }}
              className="text-center mb-4"
            >
              Orders Table- Due 5:30PM EST
            </h1>
            <Table
              striped
              bordered
              hover
              style={{ fontSize: "3vw", fontFamily: "Signika" }}
            >
              <thead>
                <tr>
                  <th>Order#</th>
                  <th>Meals</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {ordersTable.map((order) => {
                  const { orderNumber, meals, dueDate } = order;
                  return (
                    <tr>
                      <td>{orderNumber}</td>

                      {/* handle meals  */}

                      <td>
                        {/* {Object.keys(meals).map((key) => {
                            return (
                              <span>
                                {`${MealData.getMeals()[key].mealName} : ${
                                  meals[key]
                                }`}
                                <br></br>
                              </span>
                            );
                          })} */}
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
    const checkBackLater = () => {
      return (
        <div
          style={{
            display: "table",
            height: "100%",
            width: "100%",
            marginTop: "40%",
          }}
        >
          <h2 style={{ verticalAlign: "middle", textAlign: "center" }}>
            Please Check Back on Saturday at 03:00 PM EST
          </h2>
        </div>
      );
    };
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

        {displayTables ? showTables() : checkBackLater()}

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
            <Button
              className="text-center"
              variant="light"
              onClick={sendTablesToAdmin}
            >
              <span>{defaultstatus}</span>
            </Button>
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
      </>
    );
  };

  return <>{!isLoggedIn ? logInBox() : actualPortal()}</>;
};

export default Hotel;
