import { useState, useEffect} from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";
import DateService from "../../Service/DateService";

const ErrorPage = () => {
  const [mins, setmins] = useState();
  useEffect(() => {
    // Have timer IF today == saturday
    // if (isSaturday()) {
    //   const interval = setInterval(() => {
    //     setmins(new Date().getSeconds());
    //     console.log("In Deliv Date Component");
    //   }, 1000);
    //   return () => clearInterval(interval);
    // }

    // Friday
    if (new Date().getDay()==5) {
      const interval = setInterval(() => {
        setmins(new Date().getSeconds());
        console.log("In Deliv Date Component");
      }, 60000);
      return () => clearInterval(interval);
    }
  }, []);
  return (
    <section
      className="mealPlans bg-primary"
      style={{ fontFamily: "Signika", padding: "64px 32px" }}
    >
      <h1>Time: {new Date().toLocaleString()}</h1>
      {/* <h1>Hour: {mins.split(":")[0]}</h1>
      <h1>Minute: {mins.split(":")[1]}</h1> */}
      {/* <h1>Second: {mins.split(":")[2].split(" ")[0]}</h1> */}
      {/* <h1>Second: {mins.split(":")[2].split(" ")[1]}</h1> */}
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

          {/* Help Text */}
          <div style={{ marginTop: "30px" }}>
            <p className="">Looks like Link does not Exist!</p>
            <p>Please try to naviagte to other page</p>
            <p>
              OR
            </p>
            <p className="mb-4"> Checkout out our meals</p>

            {/* Order Button */}
            <div className="h-100 d-flex align-items-center justify-content-center">
              <Link to="/order">
                <Button
                  variant="secondary"
                  className="text-primary"
                  style={{
                    height: "35px",
                    width: "100px",
                    borderRadius: "15px",
                    fontSize: "20px",
                    padding:"1px"
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

export default ErrorPage;
