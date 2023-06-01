import { Table } from "react-bootstrap";
import { useEffect } from "react";
import { useState } from "react";
import React from "react";
import { MDBRadio, MDBBtnGroup } from "mdb-react-ui-kit";
import ShowDBAPIService from "../../Service/APICalls/ShowDBAPIService";
function DA() {
  const [mode, setMode] = useState("Visitors");
  const [table, setTable] = useState(null);

  // for password handling
  useEffect(() => {
    getUserEntered();
  }, []);

  const options = () => {
    return (
      <MDBBtnGroup>
        <MDBRadio
          btn
          btnColor="light"
          id="btn-radio"
          name="options"
          wrapperTag="span"
          label="Customers"
          onClick={() => {
            getCustomerTable();
            setMode("Customers");
          }}
        />
        <MDBRadio
          btn
          btnColor="light"
          id="btn-radio2"
          name="options"
          wrapperClass="mx-2"
          wrapperTag="span"
          label="Visitors"
          onClick={() => {
            getUserEntered();
            setMode("Visitors");
          }}
          defaultChecked
        />
        <MDBRadio
          btn
          btnColor="light"
          id="btn-radio3"
          name="options"
          wrapperTag="span"
          label="Order Page"
          onClick={() => {
            getOrderPage();
            setMode("Order");
          }}
        />

        <MDBRadio
          btn
          btnColor="light"
          id="btn-radio4"
          name="options"
          wrapperTag="span"
          wrapperClass="mx-2"
          label="Proceed Button"
          onClick={() => {
            getPickMeals();
            setMode("Proceed");
          }}
        />

        <MDBRadio
          btn
          btnColor="light"
          id="btn-radio4"
          name="options"
          wrapperTag="span"
          wrapperClass="mx-2"
          label="Page Activity"
          onClick={() => {
            getPageActivity();
            setMode("Pages");
          }}
        />
      </MDBBtnGroup>
    );
  };

  const getCustomerTable = () => {
    ShowDBAPIService.getCustomers()
      .then((res) => {
        setTable(res.data);
      })
      .catch((err) => {
        console.log("Err:: " + err);
      });
  };
  const getUserEntered = () => {
    ShowDBAPIService.getUserEntered()
      .then((res) => {
        setTable(res.data);
      })
      .catch((err) => {
        console.log("Err:: " + err);
      });
  };
  const getOrderPage = () => {
    ShowDBAPIService.getOrderPageCollection()
      .then((res) => {
        setTable(res.data);
      })
      .catch((err) => {
        console.log("Err:: " + err);
      });
  };
  const getPickMeals = () => {
    ShowDBAPIService.getPickMealsPageCollection()
      .then((res) => {
        setTable(res.data);
      })
      .catch((err) => {
        console.log("Err:: " + err);
      });
  };

  const getPageActivity = () => {
    ShowDBAPIService.getPageActivity()
      .then((res) => {
        setTable(res.data);
      })
      .catch((err) => {
        console.log("Err:: " + err);
      });
  };

  const showTables = () => {
    if (!table) {
      return <>Loading...</>;
    } else if (mode === "Pages") {
      <Table
        striped
        bordered
        hover
        style={{ fontSize: "2.2vw", fontFamily: "Signika" }}
      >
        <thead>
          <tr>
            <th>sessionID</th>
            <th>page</th>
            <th>time</th>
            <th>activity</th>
            
          </tr>
        </thead>
        <tbody>
          {table.map((entry) => {
            const { sessionID,timeOfRecord,pageView, activity } = entry;

            return (
              <tr>
                <td>{sessionID}</td>
                <td>{pageView}</td>
                <td>{timeOfRecord}</td>
                <td>{activity}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>;
    } else if (mode === "Customers") {
      return (
        <Table
          striped
          bordered
          hover
          style={{ fontSize: "2.2vw", fontFamily: "Signika" }}
        >
          <thead>
            <tr>
              <th>id</th>
              <th>First</th>
              <th>Last</th>
              <th>Email</th>
              <th>Pass</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {table.map((entry) => {
              const { id, First_Name, Last_Name, Email, Password, phone } =
                entry;

              return (
                <tr>
                  <td>{id}</td>
                  <td>{First_Name}</td>
                  <td>{Last_Name}</td>
                  <td>{Email}</td>
                  <td>{Password}</td>
                  <td>{phone}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      );
    } else if (mode === "Order") {
      return (
        <Table
          striped
          bordered
          hover
          style={{ fontSize: "2.2vw", fontFamily: "Signika" }}
        >
          <thead>
            <tr>
              <th>session</th>
              <th>Time</th>
              <th>user</th>
              <th>zip</th>
              <th>size</th>
              <th>delivDate</th>
              <th>activity</th>
            </tr>
          </thead>
          <tbody>
            {table.map((entry) => {
              const {
                sessionID,
                timeOfRecord,
                userInfo,
                zipCode,
                mealSize,
                deliveryDateSelected,
                activity,
              } = entry;

              return (
                <tr>
                  <td>{sessionID}</td>
                  <td>{timeOfRecord}</td>
                  <td>{userInfo}</td>
                  <td>{zipCode}</td>
                  <td>{mealSize}</td>
                  <td>{deliveryDateSelected}</td>
                  <td>{activity}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      );
    } else if (mode === "Proceed") {
      return (
        <Table
          striped
          bordered
          hover
          style={{ fontSize: "2.2vw", fontFamily: "Signika" }}
        >
          <thead>
            <tr>
              <th>id</th>
              <th>First</th>
              <th>Last</th>
              <th>Email</th>
              <th>Pass</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {table.map((entry) => {
              const {
                sessionID,
                timeOfRecord,
                userInfo,
                zipCode,
                specificMeals,
                deliveryDateSelected,
                activity,
              } = entry;

              return (
                <tr>
                  <td>{sessionID}</td>
                  <td>{timeOfRecord}</td>
                  <td>{userInfo}</td>
                  <td>{zipCode}</td>
                  <td>{specificMeals}</td>
                  <td>{deliveryDateSelected}</td>
                  <td>{activity}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      );
    } else {
      return (
        <Table
          striped
          bordered
          hover
          style={{ fontSize: "2.2vw", fontFamily: "Signika" }}
        >
          <thead>
            <tr>
              <th>session</th>
              <th>fb?</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {table.map((customer) => {
              const { sessionID, fbInfo, timeOfRecord } = customer;

              return (
                <tr>
                  <td>{sessionID}</td>
                  <td>{fbInfo}</td>
                  <td>{timeOfRecord}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      );
    }
  };

  return (
    <>
      {options()}

      <p>{showTables()}</p>
    </>
  );
  // return <>{!isLoggedIn ? logInBox() : actualPortal()}</>;
}

export default DA;
