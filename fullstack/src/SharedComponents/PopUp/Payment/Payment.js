import logo from "./logo192.png";
import PopUp from "../PopUp";
import userSession from "../../../Service/userSession";
import StripeCheckout from "react-stripe-checkout";
import OrderAPIService from "../../../Service/OrderAPIService";
import { useEffect } from "react";
import StripeBackend from "../../../Service/StripeBackend";

import { useState } from "react";
import React from "react";

const Payment = ({
  cart,
  setCart,
  mealNumbers,
  cartPrice,
  setCartPrice,
  setNumMealsSelected,
  delivDate,
}) => {
  // To give users live update about making payment & storing order
  const [statusPopUp, setStatusPopUp] = useState(false);
  const [statusTitle, setStatusTitle] = useState("");
  const [statusBody, setStatusBody] = useState("");
  const STRIPE_KEY =
    "pk_test_51MLGUDLxe44udBspRQVfTcgFGVZRI6NRIlrfX4lexUptlrYTJjsqfJZFBeDrKXdyOCiJVVQKcD88WAQDsNPVWZ9b00bKBn0FaU";

  // stripeToken will have store shipping info
  const [stripeToken, setStripeToken] = useState(null);
  const onToken = (token) => {
    setStripeToken(token);
    console.log("TOKEN::: " + JSON.stringify(token));
  };

  const [amount, setAmount] = useState((Math.round((cartPrice + (cartPrice * 0.06625) + 3)*100)/100));
  useEffect(() => {
    setAmount((Math.round((cartPrice + (cartPrice * 0.06625) + 3)*100)/100)); 
  }, [cartPrice]);
  useEffect(() => {
    console.log("CART PRICE:: "+cartPrice+ ":: type:: "+ typeof(cartPrice));
    console.log("AMOUNT:: "+amount+ ":: type:: "+ typeof(amount));
    const makeRequest = () => {
      setStatusTitle("Payment Status");
      // Sending req to backend to create charge based on card details entered by user..
      StripeBackend.requestToServer(
        stripeToken,
        (Math.round(
          ((cartPrice+3)*0.06625+(cartPrice+3)) * 100
        ) / 100),
        setStatusBody,
        setStatusPopUp
      ) // Response received from backend and we know if payment succeded or not
        .then((res) => {
          // Payment failed
          if (res.status === 206) {
            setStatusBody(res.data);
            // let user view err msg for 2s; close pop up; reopen payment pop up
            setTimeout(() => {
              document.getElementById("hiddenPaymentButton").click();
            }, 2000);
          } else {
            // Successful payment; so, STORE ORDER IN DB
            setStatusBody("Successful Payment!");
            setTimeout(() => {
              setStatusTitle("Order Status");
              setStatusBody("Sending Order to DB....");
            }, 1000);
            setTimeout(() => {
              // mealAndFreqsArr is in format: [[id1,q1],[id2,q2]....]
              const mealAndFreqsArr = [];
              cart.map((item) => {
                mealAndFreqsArr.push([item.id, mealNumbers[item.id]]);
              });

              let todaysDate = new Date().toDateString();

              const objToSend = {
                Order_date: todaysDate,
                Shipping_date: delivDate,
                Total_Price:  (Math.round(
                  ((cartPrice+3)*0.06625+(cartPrice+3)) * 100
                ) / 100),
                email: stripeToken.email,
                Address: `${stripeToken.card.address_line1} ${stripeToken.card.address_city}, ${stripeToken.card.address_zip}`,
                Customer_id: userSession.getUser().id,
                mealAndFreqs: mealAndFreqsArr,
              };
              // setStatusTitle("Order Status");
              OrderAPIService.addOrder(objToSend, setStatusBody)
                .then((res) => {
                  setStatusBody("Order saved in DB! Order#: " + res.data);

                  // after 2 seconds close the pop up
                  setTimeout(() => {
                    setStatusPopUp(false);
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

              // SUCCESS; RESET: cart, numMealsSelected, mealNumbers
              setCart([]);
              setNumMealsSelected(0);
              setCartPrice(0);
              for (let index = 0; index < mealNumbers.length; index++) {
                mealNumbers[index] = 0;
              }
            }, 1200);
          }
        })
        .catch((error) => {
          setStatusPopUp(true);
          setStatusBody("" + error);
          setTimeout(() => {
            setStatusPopUp(false);
            document.getElementById("hiddenPaymentButton").click();
          }, 3000);
        });
    };
    stripeToken && makeRequest();
  }, [stripeToken]);

  let multilineString =
    "This is the first line.\n" +
    "This is the second line.\n" +
    "This is the third line.";

  return (
    <>
      {/* Regular Stripe pop UP */}
      <StripeCheckout
        name="Mirchi Meals"
        panelLabel="Proceed"
        shippingAddress
        billingAddress
        description={`Total: $${
          (Math.round(
            ((cartPrice+3)*0.06625+(cartPrice+3)) * 100
          ) / 100)
        }`}
        amount={
          (Math.round(
            ((cartPrice+3)*0.06625+(cartPrice+3)) * 100
          ) / 100)*100
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
