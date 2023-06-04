import PopUp from "../PopUp/PopUp";
import SignUpPopUp from "../../components/NavBar/SignUpPopUp/SignUpPopUp";
import LogInPopUP from "../../components/NavBar/LogInPopUp/LogInPopUp";
import DataCollection from "../../Service/Data/DataCollection";
import userSession from "../../Service/Data/userSession";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import zipCodeService from "../../Service/Data/zipCodeService";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import React from "react";
import MealData from "../../Service/Data/MealData";
import DataCollectionAPIService from "../../Service/APICalls/DataCollectionAPIService";

const UpSaleItems = ({
  displayPopUp,
  setDisplayPopUp,
  cartPrice,
  setCartPrice,
  cart,
  setCart,
  zipCode,
  mealNumbers,
  setMealNumbers,
  setLogIn,
}) => {
  const noItems = () => {
    for (let index = 0; index < MealData.getUpSaleItems().length; index++) {
      const element = MealData.getUpSaleItems()[index];
      if (mealNumbers[element.id] !== 0) {
        return false;
      }
    }

    return true;
  };

  // SignUp/LogIn Pop Up
  const [showSignUpLogIn, setShowSignUpLogIn] = useState(false);
  const [signUpLogInTitle, setSignUpLogInTitle] = useState("LogIn/SignUp");
  const [signUpLogInBody, setSignUpLogInBody] = useState("");

  const [show, setShow] = useState(false);
  const [description, setDescription] = useState("");
  const handleDisplay = (description, mealName) => {
    setDescription(`${mealName} ${description}`);
    setShow(true);
  };

  const add = (id) => {
    // console.log(`ID SENT IS ${id}`);
    // setProceedText("Proceed");

    // setCartPrice(
    //   (cartPrice) =>
    //     Math.round(
    //       (cartPrice + MealData.getAllItems()[id].price + Number.EPSILON) * 100
    //     ) / 100
    // );

    try {
      setCartPrice(
        (cartPrice) =>
          Math.round(
            (cartPrice + MealData.getAllItems()[id].price + Number.EPSILON) *
              100
          ) / 100
      );
    } catch (Err) {
      // console.log(JSON.stringify(MealData.getAllItems()));
    }
    // // will have to add PRICE
    const addToCart = {
      id: id,
      mealName: MealData.getAllItems()[id].mealName,
      description: MealData.getAllItems()[id].description,
      price: MealData.getAllItems()[id].price,
    };

    const tempArray = [];

    if (cart.length === 0) {
      // cart is empty
      tempArray.push(addToCart);
      setCart(tempArray);
    } else {
      // cart is NOT empty; 2 cases: idNum IS in cart OR NOT in the cart

      // don't wanna add duplicate items
      let found = false;

      cart.forEach((element) => {
        if (element.id === id) {
          found = true;
        }
        tempArray.push(element);
      });

      // adding item first time
      if (!found) {
        tempArray.push(addToCart);
      }
      setCart(tempArray); // Update cart to display correct items in cart
    }

    mealNumbers[id]++; // increment quantity in mealNumbers at index "idNum"
    const newAr = [];
    mealNumbers.map((item) => {
      newAr.push(item);
    });
    setMealNumbers(newAr); // Update mealNumbers to display correct quantity numbers in cart AND pickMeals page
  };
  const remove = (id) => {
    // console.log("Remove clicked...");
    // CANNOT have quantity < 0
    if (mealNumbers[id] > 0) {
      // if (countSelected === 0) {
      //   setProceedText("No Thanks, Proceed");
      // }
      try {
        setCartPrice(
          (cartPrice) =>
            Math.round(
              (cartPrice - MealData.getAllItems()[id].price + Number.EPSILON) *
                100
            ) / 100
        );
      } catch (Err) {
        // console.log(JSON.stringify(MealData.getAllItems()));
      }
      mealNumbers[id]--; // decrement quantity in mealNumbers at index "id"
      const newAr = [];
      mealNumbers.map((item) => {
        newAr.push(item);
      });
      setMealNumbers(newAr); // update mealNumbers

      if (mealNumbers[id] === 0) {
        // if item is reduced to 0 in cart, cart should be updated so we don't have an item in cart whose quantity = 0
        const tempCart = [];
        cart.forEach((element) => {
          if (element.id !== id) {
            tempCart.push(element);
          }
        });
        setCart(tempCart);
      }
    }
  };

  const handleNoSignUp = (e) => {
    e.preventDefault();
    // No sign up clicked from pick meals
    DataCollection.registerActivity(
      "UpSaleItemsPopUp",
      `Signup skipped from UpSales: ${
        userSession.isLoggedIn() && userSession.getUser().id !== "improper"
          ? userSession.getUser().emailAddress
          : "Anon"
      }`
    );

    const userLoggedIn = {
      id: "improper",
    };
    userSession.addUser(userLoggedIn);
    setShowSignUpLogIn(false);
    // document clicked!
    setDisplayPopUp(false);
    document.getElementById("hiddenPaymentButton").click();
  };

  const handleProceed = (e) => {
    e.preventDefault();
    if (!userSession.isLoggedIn() || userSession.getUser().id === "improper") {
      // user not logged in
      setSignUpLogInBody(
        <div
          className="container align-items-center d-flex justify-content-center"
          style={{ fontFamily: "Signika" }}
        >
          <form style={{ padding: "20px" }} className="rounded">
            <Row className="">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="mb-4">
                  <p className="lead">Log in or Sign Up to continue</p>
                </label>
              </div>
            </Row>

            <div className="container text-center mt-4 mb-4">
              <button
                onClick={(e) => handleNoSignUp(e)}
                className="text-primary mx-2"
                style={{
                  backgroundColor: "rgb(212,106,25)",
                  borderRadius: "10px",
                  border: "0",
                  height: "45px",
                  width: "100px",
                  fontSize: "15px",
                }}
              >
                Skip Sign Up
              </button>
            </div>

            <div className="container text-center mb-4">
              <LogInPopUP
                style={{ buttonColor: "secondary", textColor: "white" }}
                setLogIn={setLogIn}
              />
            </div>

            <div className="container text-center">
              <SignUpPopUp
                style={{ buttonColor: "secondary", textColor: "white" }}
                setLogIn={setLogIn}
              />
            </div>
          </form>
        </div>
      );
      (!userSession.isLoggedIn() || userSession.getUser().id === "improper") &&
        setShowSignUpLogIn(true);
    } else {
      // logged in
      DataCollection.registerActivity(
        "UpSaleItmes",
        "Clicked Proceed frm UpSale: Anon"
      );
      setDisplayPopUp(false);
      document.getElementById("hiddenPaymentButton").click();
    }
  };

  return (
    <>
      <Modal
        show={displayPopUp}
        onHide={() => setDisplayPopUp(false)}
        style={{ fontFamily: "Signika" }}
      >
        <Modal.Header closeButton style={{ textAlign: "center" }}>
          <Modal.Title>People have also tried</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <>
            <Container>
              <Row>
                {MealData.getUpSaleItems().map((item) => {
                  const { id, img, mealName, description, price } = item;
                  return (
                    <Col key={id} className="p-3 spacesBetweenBoxes">
                      <div className="card-body text-center">
                        <img
                          src={img}
                          style={{ width: "47vw", height: "15vh" }}
                          className="img-fluid"
                        />
                        <h4 style={{ fontSize: "20px" }}>{mealName}</h4>
                        <h5>${price}</h5>
                        <Link
                          onClick={() => handleDisplay(description, mealName)}
                          to=""
                        >
                          <p className="text-light">Description</p>
                        </Link>

                        <button
                          style={{
                            fontSize: "19px",
                            height: "27px",
                            width: "38px",
                            borderRadius: "10px",
                            backgroundColor: "rgb(247, 193, 68)",
                            border: "none",
                          }}
                          onClick={() => remove(id)}
                        >
                          -
                        </button>
                        <span style={{ fontSize: "25px" }} className="mx-2">
                          {mealNumbers[id]}
                        </span>
                        <button
                          style={{
                            fontSize: "19px",
                            height: "27px",
                            width: "38px",
                            borderRadius: "10px",
                            backgroundColor: "rgb(247, 193, 68)",
                            border: "none",
                          }}
                          onClick={() => add(id)}
                        >
                          +
                        </button>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Container>

            <hr />
            {/* Final version below do NOT change it */}
            <h5 className="text-center mt-4">{`${
              "Meals Total $" + cartPrice
            }`}</h5>
            <h5 className="text-center mt-2">{`${
              "Delivery $" + zipCodeService.isValidZipCode(zipCode)
            }`}</h5>
            <h5 className="text-center mt-2">{`${
              "Taxes $" +
              Math.round(
                (cartPrice + zipCodeService.isValidZipCode(zipCode)) *
                  0.06625 *
                  100
              ) /
                100
            }`}</h5>
            <h5 className="text-center mt-2">{`${
              "Total $" +
              Math.round(
                ((cartPrice + zipCodeService.isValidZipCode(zipCode)) *
                  0.06625 +
                  (cartPrice + zipCodeService.isValidZipCode(zipCode))) *
                  100
              ) /
                100
            }`}</h5>

            <div className="h-100 d-flex align-items-center justify-content-center">
              <Button
                variant="light"
                className="text-dark"
                onClick={(e) => {
                  handleProceed(e);
                }}
              >
                {noItems() ? "No Thanks, Continue" : "Proceed"}
              </Button>
            </div>
          </>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setDisplayPopUp(false);
            }}
          >
            <span className="text-primary">Close</span>
          </Button>
        </Modal.Footer>
      </Modal>

      {/* description pop up  */}
      <Modal
        show={show}
        onHide={() => setShow(false)}
        style={{ fontFamily: "Signika" }}
      >
        <Modal.Header closeButton style={{ textAlign: "center" }}>
          <Modal.Title>decription</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <>{description}</>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            <span className="text-primary">Close</span>
          </Button>
        </Modal.Footer>
      </Modal>
      {(!userSession.isLoggedIn() ||
        userSession.getUser().id === "improper") && (
        <PopUp
          displayPopUp={showSignUpLogIn}
          setDisplayPopUp={setShowSignUpLogIn}
          title={signUpLogInTitle}
          body={signUpLogInBody}
        />
      )}
    </>
  );
};

export default UpSaleItems;
