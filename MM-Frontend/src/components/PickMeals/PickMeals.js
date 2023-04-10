/**
 *  For now can look in csv file for meal data based on zip code entered
 *  Scaling: might need API call to search meal info based on given zip code
 */

import DataCollectionAPIService from "../../Service/APICalls/DataCollectionAPIService";
import Payment from "../../SharedComponents/PopUp/Payment/Payment";
import SignUpPopUp from "../NavBar/SignUpPopUp/SignUpPopUp";
import LogInPopUP from "../NavBar/LogInPopUp/LogInPopUp";
import userSession from "../../Service/Data/userSession";
import PopUp from "../../SharedComponents/PopUp/PopUp";
import "./PickMeals.css";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ScrollTop from "../../Service/Misc/ScrollTop";
import MealData from "../../Service/Data/MealData";
import UpSaleItems from "../../SharedComponents/UpSaleItems/UpSaleItems";
import ReactGA from "react-ga4";
import Banner from "../Home/Banner/Banner";
const PickMeals = ({
  zipCode,
  cart,
  setCart,
  mealNumbers,
  setMealNumbers,
  setResetOrderPageInfo,
  numMealsSelected,
  setNumMealsSelected,
  setLogIn,
  numMeals,
  cartPrice,
  setCartPrice,
  delivDate,
}) => {
  // so we can go back to orderPage
  const navigate = useNavigate();
  useEffect(() => {
    console.log("ZIPCODE ON PM RENDERED::: " + zipCode);
    // if zipCode not provided, go back to order page
    if (zipCode.length === 0) {
      console.log("NO ZIPCODE; GO BACK TO ORDER AND RESET EVERYTHING");
      setResetOrderPageInfo(2); // if no zip code; go back to order page and have user fill out all the fields
      navigate("/order");
    } else {
      ReactGA.event({
        category: "Viewing Meals",
        action: "viewing",
        label: "Viewing Meals",
      });

      // scroll up only once when user arrives on this page
      ScrollTop.scrollUp();
      if (mealNumbers.length === 0) {
        setMealNumbers(new Array(MealData.getAllItems().length).fill(0));
        console.log("RESETTING CART");
        // should do this in case of payment success
      }

      const handleScroll = () => {
        // Send a custom event to Google Analytics when the user scrolls
        ReactGA.event({
          category: "Pick Meals Page",
          action: "Scroll",
          label: "User scrolled on the Pick Meals page",
        });
      };

      // Register the scroll event listener
      window.addEventListener("scroll", handleScroll);

      // Clean up the event listener on unmount
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const mealList = MealData.getMeals();

  // pop up to show description/ingridents to users
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState("");
  const [mealSelected, setMealSelected] = useState("");

  // What if user wants to reset freq, zipcode, etc...?? => we let user go back to OrderPage
  const backToOrderPage = () => {
    setCart([]);
    setCartPrice(0);
    setNumMealsSelected(0);
    setMealNumbers([]);
    setResetOrderPageInfo(2); // reset everything in orderPage
    console.log("<== BACK BUTTON CLICKED...");
    navigate("/order");
  };

  // Handles PopUp display
  const handleDisplay = (descrption, mealName) => {
    // content
    if (Array.isArray(descrption)) {
      let contentString = "";
      for (let index = 0; index < descrption.length; index++) {
        const element = descrption[index];
        if (index != descrption.length - 1) {
          contentString += `${element}, `;
        } else {
          contentString += `and ${element}`;
        }
      }
      setDescription(contentString);
      setMealSelected(mealName);
      setShow(true);
    } else {
      //description
      setDescription(descrption);
      setMealSelected(mealName);
      setShow(true);
    }
  };

  // closes description pop up when user closes it
  const handleClose = () => {
    setDescription("");
    setMealSelected("");
    setShow(false);
  };

  /**
   * @Goal ADD item to cart && increment quantity by 1
   * @param idNum of item to be added
   * 1. Increment quantity in mealNumbers at index "id"
   * 2. Update cart by setCart()
   */

  const add = (idNum) => {
    setNumMealsSelected((numMealsSelected) => numMealsSelected + 1);
    setCartPrice(
      (cartPrice) =>
        Math.round(
          (cartPrice + MealData.getMeals()[idNum].price + Number.EPSILON) * 100
        ) / 100
    );
    // will have to add PRICE
    const addToCart = {
      id: idNum,
      mealName: mealList[idNum].mealName,
      description: mealList[idNum].description,
      price: mealList[idNum].price,
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
        if (element.id === idNum) {
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

    mealNumbers[idNum]++; // increment quantity in mealNumbers at index "idNum"
    const newAr = [];
    mealNumbers.map((item) => {
      newAr.push(item);
    });
    setMealNumbers(newAr); // Update mealNumbers to display correct quantity numbers in cart AND pickMeals page
  };

  /**
   * @Goal REMOVE item from cart && decrement quantity by 1
   * @param id of item to be removed/reduced
   * 1. Decrement quantity in mealNumbers at index "idNum"
   * 2. Update cart by setCart()
   */
  const remove = (id) => {
    // CANNOT have quantity < 0
    if (mealNumbers[id] > 0) {
      setNumMealsSelected((numMealsSelected) => numMealsSelected - 1);
      setCartPrice(
        (cartPrice) =>
          Math.round(
            (cartPrice - MealData.getMeals()[id].price + Number.EPSILON) * 100
          ) / 100
      );
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

  // log in warnin
  const [displayPopUp, setDisplayPopUp] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [displayEnoughPopUp, setDisplayEnoughPopUp] = useState(false);
  const [titleEnough, setTitleEnough] = useState("");
  const [bodyEnough, setBodyEnough] = useState("");

  // Upsale Item PopUp State
  const [displayUpSale, setDisplayUpSale] = useState(false);

  {
    /* remove this after stripe */
  }
  const [successPopUp, setSuccessPopUp] = useState(false);
  const [successTitle, setSuccessTitle] = useState("");
  const [successBody, setSuccessBody] = useState("");

  const getMealsData = () => {
    let tempDict = {};
    mealNumbers.map((freq, index) => {
      if (freq > 0) {
        tempDict[MealData.getMeals()[index].mealName] = freq;
      }
    });

    return tempDict;
  };

  /**
   * send Data to DB for DA purporses
   * STRIP INTEGRATION
   */
  const handleCheckOut = () => {
    if (numMeals === "12+ meals" && numMealsSelected < 12) {
      setTitleEnough("Not Enough Meals selected!!");
      setBodyEnough(<p>Select at least 12 meals</p>);
      setDisplayEnoughPopUp(true);
    } else if (parseInt(numMeals[0]) > numMealsSelected) {
      setTitleEnough("Not Enough Meals selected!!");
      setBodyEnough(<p>Select at least {numMeals[0]} meals</p>);
      setDisplayEnoughPopUp(true);
    } else if (!userSession.isLoggedIn()) {
      console.log("USER IS NOT LOGGED IN!");
      const mealsInfo = {
        zipcode: zipCode,
        planSize: numMeals,
        mealsAndFreqs: getMealsData(),
      };
      DataCollectionAPIService.storeUnprocessedMeals(mealsInfo)
        .then(() => {
          console.log("Successful");
        })
        .catch((err) => {
          console.log("Err:: " + err);
        });
      setTitle("LogIn/SignUp");
      setBody(
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
      !userSession.isLoggedIn() && setDisplayPopUp(true);
    } else {
      setDisplayPopUp(false);
      setDisplayUpSale(true);
    }
  };

  return (
    <>
      {/* <div className="justify-content-center backButtonContainer"> */}
      <div className="justify-content-center">
        <div
          className="position-fixed text-primary text-center py-1"
          style={{ backgroundColor: "rgb(98, 10, 21)", width: "100%" }}
        >
          Each meal is appropriate for 1 Adult in 1 sitting.
        </div>
        <div className="py-5">
          <Button
            variant="secondary"
            // className="position-fixed backButton"
            className="position-fixed mx-2"
            onClick={() => backToOrderPage()}
            style={{ fontFamily: "Signika", color: "white", width:"5.5rem", height:"2.5rem"}}
          >
            Back
          </Button>
        </div>
      </div>
      <section style={{ fontFamily: "Signika" }}>
        <Container className="text-dark my-4 customCss">
          <Row style={{ marginTop: "px", marginBottom: "32px" }} xs="auto">
            {mealList.map((item) => {
              const { id, img, mealName, description, content, price } = item;
              return (
                <Col key={id} className="p-3 spacesBetweenBoxes">
                  <div className="card-body text-center">
                    <img src={img} className="img-fluid imageAdjustment" />
                    <h4 className="titleAdjustment">{mealName}</h4>
                    <h5>
                      <del className="mx-2">$15.28</del>${price}
                    </h5>
                    <Link
                      onClick={() =>
                        handleDisplay(content, `Content of "${mealName}" meal`)
                      }
                      to=""
                    >
                      <p className="text-light descriptionAdjustment">
                        Content
                      </p>
                    </Link>
                    <Link
                      onClick={() => handleDisplay(description, mealName)}
                      to=""
                    >
                      <p className="text-light descriptionAdjustment">
                        Description
                      </p>
                    </Link>

                    <Button
                      variant="light"
                      onClick={() => remove(id)}
                      className="buttonAdjustment"
                    >
                      <span className="letterAdjustment">-</span>
                    </Button>

                    <span className="amountAdjustment">{mealNumbers[id]}</span>

                    <Button
                      variant="light"
                      onClick={() => add(id)}
                      className="buttonAdjustment"
                    >
                      <span className="letterAdjustment">+</span>
                    </Button>
                  </div>
                </Col>
              );
            })}

            <Modal
              show={show}
              onHide={handleClose}
              style={{ fontFamily: "Signika" }}
            >
              <Modal.Header closeButton>
                <Modal.Title>{mealSelected}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* {Object.keys(description).map((key) => {
                  return (
                    <span>
                      {`${key} : ${description[key]}`}
                      <br></br>
                    </span>
                  );
                })} */}
                {description}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="light" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Row>

          <Row>
            {/* Only show checkout button if # of item > 0 */}

            <div className="h-100 d-flex align-items-center justify-content-center">
              <Button
                variant="secondary"
                className="text-primary checkOutButton"
                onClick={() => handleCheckOut()}
              >
                Proceed
              </Button>
            </div>
          </Row>
        </Container>
        {/* should probably remove 1st condition */}
        {(numMealsSelected === 0 || !userSession.isLoggedIn()) && (
          <PopUp
            displayPopUp={displayPopUp}
            setDisplayPopUp={setDisplayPopUp}
            title={title}
            body={body}
          />
        )}

        <PopUp
          displayPopUp={displayEnoughPopUp}
          setDisplayPopUp={setDisplayEnoughPopUp}
          title={titleEnough}
          body={bodyEnough}
        />

        <UpSaleItems
          displayPopUp={displayUpSale}
          setDisplayPopUp={setDisplayUpSale}
          cartPrice={cartPrice}
          setCartPrice={setCartPrice}
          cart={cart}
          setCart={setCart}
          zipCode={zipCode}
          mealNumbers={mealNumbers}
          setMealNumbers={setMealNumbers}
        />

        <Payment
          cart={cart}
          setCart={setCart}
          mealNumbers={mealNumbers}
          cartPrice={cartPrice}
          setCartPrice={setCartPrice}
          setNumMealsSelected={setNumMealsSelected}
          delivDate={delivDate}
        />
      </section>
    </>
  );
};

export default PickMeals;
