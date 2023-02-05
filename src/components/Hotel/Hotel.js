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
import MealData from "../../Service/MealData";
import HotelAPIService from "../../Service/HotelAPIService";

const Hotel = () => {
  const [pinLabel, setPinLabel] = useState(
    <label for="exampleInputEmail1" className="mb-2">
      PIN
    </label>
  );
  const [pinValue, setPinValue] = useState("");
  const [mealQuantityTable, setMealQuantityTable] = useState(null);
  const [ordersTable, setOrdersTable] = useState(null);
  useEffect(() => {
    //Replace dates with upcoming sunday's date
    // Display only after 3:00 PM on Friday
    HotelAPIService.getMealQuantityTable({ date: "Sunday: 1/29/2023" })
      .then((res) => {
        setMealQuantityTable(res.data);
      })
      .catch((err) => {
        console.log("Erro while fetching mealQuantityTable::: " + err);
      });

    //Replace dates with upcoming sunday's date
    HotelAPIService.getOrderTables({ date: "Sunday: 1/29/2023" })
      .then((res) => {
        setOrdersTable(res.data);
      })
      .catch((err) => {
        console.log("Erro while fetching Orders Table::: " + err);
      });
  }, []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayReport, setDisplayReport] = useState(false);
  const [status, setStatus] = useState("Submit");
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
    console.log("clicked:  "+report);
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
          setReportLabel(<span style={{color:"red"}}>Could'nt notify Admin, please call them</span>);
        });
    }
  };

  // do validation of pin after than let user in
  const handleSubmit = () => {
    if (pinValue === "123") {
      setIsLoggedIn(true);
      setPinLabel(
        <label for="exampleInputEmail1" className="mb-2">
          PIN
        </label>
      );
    } else {
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

  const displayMealQuantityTable = () => {
    return (
      <>
        {mealQuantityTable === null ? (
          "Loading..."
        ) : (
          <section
            className="bg-primary"
            style={{ fontFamily: "Signika", padding: "64px 32px" }}
          >
            <h1 style={{ fontFamily: "Signika" }} className="text-center mb-4">
              Meal Quantity Table
            </h1>
            <Table
              striped
              bordered
              hover
              style={{ fontSize: "calc(16px+1vw)", fontFamily: "Signika" }}
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
                      <td>{MealData.getMeals()[item_id].mealName}</td>

                      <td>{Total_Quantity}</td>
                      <td>
                        {Object.keys(
                          MealData.getMeals()[item_id].description
                        ).map((key) => {
                          return (
                            <span>
                              {`${key} : ${
                                Total_Quantity *
                                MealData.getMeals()[item_id].description[key]
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
        )}
      </>
    );
  };
  const displayOrdersTable = () => {
    return (
      <>
        {ordersTable === null ? (
          "Loading..."
        ) : (
          <section style={{ fontFamily: "Signika", padding: "64px 32px" }}>
            <h1 style={{ fontFamily: "Signika" }} className="text-center mb-4">
              Orders Table- Due 5:30PM EST
            </h1>
            <Table
              striped
              bordered
              hover
              style={{ fontSize: "calc(16px+1vw)", fontFamily: "Signika" }}
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
                              {`${meal[0]}: ${meal[1]}`}
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
        )}
      </>
    );
  };
  const actualPortal = () => {
    /** TABLE 1
     * call api to get first table in following format
     * [{mealId:i1,quantity:q1},{mealId:i2,quantity:q2}, {mealId:i3,quantity:q3}...]
     * "i": meal ID; "q": quanity of meal with meal id "i"
     */
    const mealQuantityTable = [
      // gujarati thali 3 quantity

      { id: 1, quantity: 2 },

      // punjabi thali 1 quantity
      { id: 2, quantity: 1 },

      // Madrari thali 2 quantity
      { id: 0, quantity: 2 },
    ];

    /** TABLE 2
     * call api to get second table in following format
     * [{orderNumber:o1, meals:[{mealId:i2,quantity:q2,mealId:i2,quantity:q2}],due:d}]
     * "i": meal ID; "q": quanity of meal with id "i"; "d": due date
     */

    const ordersTable = [
      {
        orderNumber: 1,
        meals: {
          1: 2,
          2: 1,
        },
        dueDate: "12/11/2023",
      },
      {
        orderNumber: 2,
        meals: {
          0: 2,
        },
        dueDate: "12/31/2023",
      },
    ];
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

        {displayMealQuantityTable()}
        {displayOrdersTable()}

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
                {/* <input
                  type="text"
                  className="form-control"
                  id="first-name"
                  
                /> */}
                <textarea className="form-control" onChange={(e)=>setReport(e.target.value)}></textarea>
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
              <span>
                {status}
              </span>
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
    // return(<p className="text-dark text-center" >Logged In</p>)
  };
  return <>{!isLoggedIn ? logInBox() : actualPortal()}</>;
};

export default Hotel;
