/***
 * has 1 Nav bar, 2 Information Boxes, 1 Foot Bar
 */

import React from "react";

import { Button } from "react-bootstrap";
import InformationBox from "./InformationBox/InformationBox";
import { Link } from "react-router-dom";
import ScrollTop from "../../Service/ScrollTop";
import { useEffect } from "react";
const About = () => {
  useEffect(() => {
    document.title="About"
    ScrollTop.scrollUp();
  }, []);
  const firstBox = {
    image: require("../../Resources/Meals/meal1.png"),
    textPosition: "r",
    backgroundColor: "primary",
    heading: (
      <h1 className="text-center text-secondary" style={{ fontSize: "48px" }}>
        What We Do
      </h1>
    ),
    headingColor: "secondary",
    textColor: "",
    buttonExist: true,
    bigImage: (
      <img
        className="img-fluid w-50 d-none d-sm-block"
        src={require("../../Resources/Meals/paneer.png")}
        alt="lorem"
        style={{
          height: "auto",
          width: "100%",
          borderRadius: "17px",
          marginBottom: "6px",
          marginRight: "40px",
        }}
      />
    ),
    smallImage: (
      <img
        className="d-sm-block"
        src={require("../../Resources/Vector/puzzle1.png")}
        style={{ height: "250px", width: "350px" }}
        alt=""
      />
    ),

    button: (
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
    ),
    description: (
      <div
        className="text-secondary text-center"
        style={{ fontSize: "20px", marginTop: "10px" }}
      >
        <p className="mb-3">
          Mirchi Meals was born out of the thought that Indian cuisine should be
          easily and readily accessible for everyone to enjoy. Whether you’re
          always on the go or simply want to experience the authentic delicacies
          of India, Mirchi Meals has you covered.
        </p>
        <p className="mb-3">
          Our meals are prepared by experienced Indian chefs who have a passion
          for creating authentic, delicious dishes that are sure to please your
          taste buds. They use traditional Indian cooking methods and
          ingredients to bring out the full flavor of each dish.
        </p>
        <p className="mb-3">
          Mirchi Meals aims to bring customers the best in quality, price, and
          quantity of meals available in their area to enjoy whenever and
          wherever.
        </p>
        <p className="mb-3">
          Order all your meals for the week, get them delivered in one go, and
          reheat to enjoy.
        </p>
      </div>
    ),
  };

  const secondBox = {
    image: require("../../Resources/Meals/meal1.png"),
    textPosition: "l",
    backgroundColor: "light",
    heading: (
      <h1 className="text-center text-dark" style={{ fontSize: "48px" }}>
        Our Mission
      </h1>
    ),
    headingColor: "dark",
    textColor: "",
    buttonExist: true,
    button: (
      <div className="h-100 d-flex align-items-center justify-content-center">
        <Link to="/order">
          <Button
            variant="dark"
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
    ),
    bigImage: (
      <img
        className="img-fluid w-50 d-none d-sm-block"
        src={require("../../Resources/Meals/rajma.png")}
        alt="lorem"
        style={{
          height: "450px",
          borderRadius: "17px",
          marginBottom: "10px",
          marginRight: "40px",
        }}
      />
    ),
    smallImage: (
      <img
        className="d-sm-block"
        src={require("../../Resources/Vector/rocket.png")}
        style={{ height: "250px", width: "350px" }}
        alt=""
      />
    ),
    description: (
      <p className="text-left" style={{ padding: "15px", fontSize: "20px" }}>
        Mirchi Meals seeks to provide everyone the option to enjoy Indian meals
        without the complexity of having to spend time in the kitchen.
      </p>
    ),
  };

  const thirdBox = {
    textPosition: "r",
    backgroundColor: "secondary",
    heading: (
      <h1 className="text-center text-light" style={{ fontSize: "48px" }}>
        Our Guiding Values
      </h1>
    ),
    headingColor: "dark",
    textColor: "",
    buttonExist: true,
    button: (
      <div className="h-100 d-flex align-items-center justify-content-center">
        <Link to="/order">
          <Button
            variant="light"
            className="text-dark"
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
    ),
    bigImage: (
      <img
        className="img-fluid w-50 d-none d-sm-block"
        src={require("../../Resources/Meals/biryani.png")}
        alt="lorem"
        style={{
          height: "450px",
          borderRadius: "17px",
          marginBottom: "10px",
          marginRight: "40px",
        }}
      />
    ),
    smallImage: (
      <img
        className="d-sm-block"
        src={require("../../Resources/Vector/puzzle.png")}
        style={{ height: "250px", width: "350px" }}
        alt=""
      />
    ),
    description: (
      <>
        <p className="text-light" style={{ fontSize: "20px" }}>
          At Mirchi Meals, each customer is our family member. That’s why, we
          follow M.E.A.L.S :
        </p>
        <div className="text-center text-light">
          <p style={{ fontSize: "20px" }}>Mind Blowing Taste</p>
          <p style={{ fontSize: "20px" }}>Easy to Order</p>
          <p style={{ fontSize: "20px" }}>Attention to Detail</p>
          <p style={{ fontSize: "20px" }}>Listening to Customers</p>
          <p style={{ fontSize: "20px" }}>Service at Heart</p>
        </div>
      </>
    ),
  };
  return (
    <>
      {/* What we do */}
      <InformationBox data={firstBox} />

      {/* Our Mission */}
      <InformationBox data={secondBox} />

      {/* Guiding Values */}
      <InformationBox data={thirdBox} />
    </>
  );
};

export default About;
