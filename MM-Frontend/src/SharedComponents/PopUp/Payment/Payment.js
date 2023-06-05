import DataCollection from "../../../Service/Data/DataCollection";
import DataCollectionAPIService from "../../../Service/APICalls/DataCollectionAPIService";
import zipCodeService from "../../../Service/Data/zipCodeService";
import logo from "./logo192.png";
import PopUp from "../PopUp";
import userSession from "../../../Service/Data/userSession";
import StripeCheckout from "react-stripe-checkout";
import OrderAPIService from "../../../Service/APICalls/OrderAPIService";
import { useEffect } from "react";
import StripeBackend from "../../../Service/APICalls/StripeBackendAPIService";
import { useState } from "react";
import React from "react";
import ReactGA from "react-ga4";
import { STRIPE_KEY } from "../../../Service/Constants";
import UserAPIService from "../../../Service/APICalls/UserAPIService";
const Payment = ({
  cart,
  setCart,
  mealNumbers,
  cartPrice,
  setCartPrice,
  setNumMealsSelected,
  delivDate,
  zipCode,
}) => {
  const getLineItems = () => {
    let rslt = "";
    cart.forEach((element) => {
      rslt += `(${element.mealName}, ${mealNumbers[element.id]}, $${
        mealNumbers[element.id] * element.price
      })  `;
    });
    return rslt;
  };
  // To give users live update about making payment & storing order
  const [statusPopUp, setStatusPopUp] = useState(false);
  const [statusTitle, setStatusTitle] = useState("");
  const [statusBody, setStatusBody] = useState("");
  // stripeToken will have store shipping info
  const [stripeToken, setStripeToken] = useState(null);
  const onToken = (token) => {
    setStripeToken(token);
    // console.log("TOKEN Recevied::: " + JSON.stringify(token));
  };

  const [amount, setAmount] = useState(
    Math.round(
      (cartPrice +
        cartPrice * 0.06625 +
        zipCodeService.isValidZipCode(zipCode)) *
        100
    ) / 100
  );
  useEffect(() => {
    setAmount(
      Math.round(
        (cartPrice +
          cartPrice * 0.06625 +
          zipCodeService.isValidZipCode(zipCode)) *
          100
      ) / 100
    );
  }, [cartPrice]);
  useEffect(() => {
    const makeRequest = () => {
      // console.log("Making request!");
      setStatusTitle("Payment Status");
      // Sending req to backend to create charge based on card details entered by user..
      if (stripeToken.card.address_zip !== zipCode) {
        console.log("PAYMENT POPUP OPENED BUT INSUCCESSFUL");
        setStatusTitle("Payment Insuccessful");
        setStatusPopUp(true);

        setStatusBody(
          `You were viewing meals for zipcode ${zipCode}, but trying to ship at zipcode ${stripeToken.card.address_zip}`
        );
        setTimeout(() => {
          setStatusPopUp(false);
          setStatusTitle("Payment Status");
          document.getElementById("hiddenPaymentButton").click();
        }, 3000);
        return;
      }

      // console.log("About to send req to backend");
      StripeBackend.requestToServer(
        stripeToken,
        Math.round(
          ((cartPrice + zipCodeService.isValidZipCode(zipCode)) * 0.06625 +
            (cartPrice + zipCodeService.isValidZipCode(zipCode))) *
            100
        ) / 100,
        setStatusBody,
        setStatusPopUp,
        getLineItems()
      ) // Response received from backend and we know if payment succeded or not
        .then((res) => {
          // console.log("Backend successfully charged customer");
          // Payment failed
          if (res.status === 206) {
            // console.log("Stripe error");
            setStatusBody(res.data);
            // let user view err msg for 2s; close pop up; reopen payment pop up
            setTimeout(() => {
              setStripeToken(null);
              document.getElementById("hiddenPaymentButton").click();
            }, 2000);
          } else {
            // console.log("Sending order in backend to store!");
            // Successful payment; so, STORE ORDER IN DB
            // UNCOMMENT THIS SHIT to give status of successful payment
            /* setStatusBody("Successful Payment!");
                  setTimeout(() => {
                    setStatusTitle("Order Status");
                    setStatusBody("Processing....");
                  }, 1000);
                */

            setTimeout(() => {
              // mealAndFreqsArr is in format: [[id1,q1],[id2,q2]....]
              const mealAndFreqsArr = [];
              cart.map((item) => {
                mealAndFreqsArr.push([item.id, mealNumbers[item.id]]);
              });

              if (
                !userSession.isLoggedIn() ||
                userSession.getUser().id === "improper"
              ) {
                // console.log("Registering new user");
                let todaysDate = new Date().toDateString();
                const objToSend = {
                  Order_date: todaysDate,
                  Shipping_date: delivDate,
                  Total_Price:
                    Math.round(
                      ((cartPrice + zipCodeService.isValidZipCode(zipCode)) *
                        0.06625 +
                        (cartPrice + zipCodeService.isValidZipCode(zipCode))) *
                        100
                    ) / 100,
                  name: stripeToken.card.name,
                  email: stripeToken.email,
                  Address: `${stripeToken.card.address_line1} ${stripeToken.card.address_city}, ${stripeToken.card.address_zip}`,
                  Customer_id: res.data,
                  mealAndFreqs: mealAndFreqsArr,
                };

                OrderAPIService.addOrderNoSignUps(objToSend, setStatusBody)
                  .then((res) => {
                    // console.log("Order Stored in DB for Anon User");
                    setStatusTitle("Confirmation");
                    setStatusBody(
                      "Order#: " +
                        res.data +
                        " Check email provided for receipt"
                    );

                    // after 2 seconds close the pop up
                    setTimeout(() => {
                      // setStatusPopUp(false);
                      // here we empty previous token
                      setStripeToken(null);
                      // console.log("Stripe token made NULL");
                    }, 2000);
                  })
                  .catch((err) => {
                    setStatusBody(
                      "Could NOT store the order please contact Admin "
                    );
                    // after 2 seconds close the pop up
                    setTimeout(() => {
                      setStatusPopUp(false);
                      // here we empty previous token
                      setStripeToken(null);
                      // console.log("Stripe token made NULL in 2nd Block");
                    }, 2000);
                    // console.log("All Done");
                  });
              } else {
                let todaysDate = new Date().toDateString();
                const objToSend = {
                  Order_date: todaysDate,
                  Shipping_date: delivDate,
                  Total_Price:
                    Math.round(
                      ((cartPrice + zipCodeService.isValidZipCode(zipCode)) *
                        0.06625 +
                        (cartPrice + zipCodeService.isValidZipCode(zipCode))) *
                        100
                    ) / 100,
                  email: stripeToken.email,
                  Address: `${stripeToken.card.address_line1} ${stripeToken.card.address_city}, ${stripeToken.card.address_zip}`,
                  Customer_id: userSession.getUser().id,
                  mealAndFreqs: mealAndFreqsArr,
                };

                // setStatusTitle("Order Status");
                OrderAPIService.addOrder(objToSend, setStatusBody)
                  .then((res) => {
                    setStatusTitle("Confirmation");
                    setStatusBody("Order#: " + res.data);

                    // after 2 seconds close the pop up
                    setTimeout(() => {
                      // setStatusPopUp(false);
                      // here we empty previous token
                      setStripeToken(null);
                    }, 2000);
                  })
                  .catch((err) => {
                    setStatusBody(
                      "Could NOT store the order please contact Admin "
                    );
                    // after 2 seconds close the pop up
                    setTimeout(() => {
                      setStatusPopUp(false);
                      // here we empty previous token
                      setStripeToken(null);
                    }, 2000);
                  });
              }

              // Regiserting activity
              DataCollection.registerActivity(
                "PaymentCompletion",
                `Payment Sucessful: ${
                  userSession.isLoggedIn() &&
                  userSession.getUser().id !== "improper"
                    ? userSession.getUser().emailAddress
                    : "Anon"
                }`
              );

              // Resetting Cart
              setCart([]);
              setNumMealsSelected(0);
              setCartPrice(0);
              for (let index = 0; index < mealNumbers.length; index++) {
                mealNumbers[index] = 0;
              }
            }, 2000);
          }
        })
        .catch((error) => {
          // console.log("PAYMENT POPUP OPENED IN CATCH ERR BLOCK");
          setStatusPopUp(true);
          setStatusBody("" + error);
          setTimeout(() => {
            setStripeToken(null);
            setStatusPopUp(false);
            document.getElementById("hiddenPaymentButton").click();
          }, 3000);
        });
    };

    stripeToken && makeRequest();
  }, [stripeToken]);

  return (
    <>
      {/* Regular Stripe pop UP */}
      <StripeCheckout
        name="Mirchi Meals"
        panelLabel="Proceed"
        shippingAddress
        billingAddress
        description={`Total: $${
          Math.round(
            ((cartPrice + zipCodeService.isValidZipCode(zipCode)) * 0.06625 +
              (cartPrice + zipCodeService.isValidZipCode(zipCode))) *
              100
          ) / 100
        }`}
        amount={
          (Math.round(
            ((cartPrice + zipCodeService.isValidZipCode(zipCode)) * 0.06625 +
              (cartPrice + zipCodeService.isValidZipCode(zipCode))) *
              100
          ) /
            100) *
          100
        }
        image={logo}
        token={onToken}
        stripeKey={STRIPE_KEY}
      >
        <button
          id="hiddenPaymentButton"
          style={{
            borderColor: "blue",
            padding: "10px",
            fontSize: "large",
            margin: "50%",
            height: "70px",
            width: "100px",
            backgroundColor: "black",
          }}
          hidden
        >
          <span style={{ color: "white" }}>Pay ${cartPrice}</span>
        </button>
      </StripeCheckout>
      <PopUp
        displayPopUp={statusPopUp}
        setDisplayPopUp={setStatusPopUp}
        title={statusTitle}
        body={statusBody}
      />
    </>
  );
};

export default Payment;
