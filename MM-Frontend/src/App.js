// checking git push -- remove this in cleaning process
import ErrorPage from "./components/ErrorPage/ErrorPage";
import { useEffect } from "react";
import Help from "./components/Help/Help";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import React from "react";
import "./index.css";
import { useState } from "react";
import "./App.css";
import Nav from "./components/NavBar/Nav";
import { Route, Routes } from "react-router-dom";
import OrderPage from "./components/OrderPage/OrderPage";
import PickMeals from "./components/PickMeals/PickMeals";
import CheckOut from "./components/CheckOut/CheckOut";
import Hotel from "./components/Hotel/Hotel";
import userSession from "./Service/Data/userSession";
import OrderHistory from "./components/OrderHistory/OrderHistory";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import TermsAndCondition from "./components/TermsAndCondition/TermsAndCondition";
import RefundsAndCancellationsPolicy from "./components/RefundsAndCancellationsPolicy/RefundsAndCancellationsPolicy";
import DataCollectionAPI from "./Service/APICalls/DataCollectionAPIService";
import AdminPortal from "./components/AdminPortal/AdminPortal";
function App() {
  useEffect(() => {
    console.log("APP RENDERED!!!");
    let referrer = document.referrer;
    console.log("REFERED BY: " + referrer);
    if (referrer !== undefined && referrer.length !== 0) {
      DataCollectionAPI.add({ url: referrer })
        .then((response) => {
          console.log("SUCCESS in sending referral::: " + response.data);
        })
        .catch((err) => {
          console.log("Error in sending referral::: " + err);
        });
      referrer = "";
    }
  }, []);
  // Nav, Home
  const [loggedIn, setLogIn] = useState(userSession.isLoggedIn());

  // OrderPage
  const [numMeals, setNumMeals] = useState("Select Plan"); // won't be that useful; just to trick user's mind
  const [zipCode, setZipCode] = useState("");
  // const [freq, setFreq] = useState("Select Frequency");
  const [delivDate, setDelivDate] = useState("Select Day");

  // Nav, PickMeals
  const [cart, setCart] = useState([]);
  const [mealNumbers, setMealNumbers] = useState([]);

  // Connecting PickMeals & OrderPage, [About,Home,Help....]
  // 0: do NOT reset, 1: RESET Everything except Number of Meals bc we go from Home to OrderPage by selecting number of meals, 2: RESET EVERYTHING
  const [resetOrderPageInfo, setResetOrderPageInfo] = useState(3);

  // total price REMOVE THIS IF LOCAL WORKS
  const [totalPrice, setTotalPrice] = useState(0);
  // localtotalPrice
  const [cartPrice, setCartPrice] = useState(0);
  const [numMealsSelected, setNumMealsSelected] = useState(0);

  // Scroll
  const [scrollFAQ, setScrollFAQ] = useState(false);

  const navAndFoot = (element) => {
    return (
      <>
        <Nav
          loggedIn={loggedIn}
          setLogIn={setLogIn}
          cart={cart}
          setCart={setCart}
          mealNumbers={mealNumbers}
          setMealNumbers={setMealNumbers}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
          cartPrice={cartPrice}
          setCartPrice={setCartPrice}
          numMeals={numMeals}
          numMealsSelected={numMealsSelected}
          setNumMealsSelected={setNumMealsSelected}
          scrollFAQ={scrollFAQ}
          setScrollFAQ={setScrollFAQ}
          delivDate={delivDate}
          zipcode={zipCode}
        />

        {/* to make nav sticked to top */}
        <section className="stickNavBarAdjustments"></section>
        {/* About, Home, Help,... */}
        {element}
        <Footer />
      </>
    );
  };

  return (
    <>
      <Routes>
        {/* Home */}
        <Route
          exact
          path="/"
          element={navAndFoot(
            <Home
              loggedIn={loggedIn}
              setLogIn={setLogIn}
              setMeals={setNumMeals}
              setResetOrderPageInfo={setResetOrderPageInfo}
              setCart={setCart}
              setMealNumbers={setMealNumbers}
              scrollFAQ={scrollFAQ}
              setScrollFAQ={setScrollFAQ}
            />
          )}
        />

        {/* About */}
        <Route exact path="/about" element={navAndFoot(<About />)} />

        {/* Help */}
        <Route
          exact
          path="/help"
          element={navAndFoot(
            <Help scrollFAQ={scrollFAQ} setScrollFAQ={setScrollFAQ} />
          )}
        />

        {/* Order Page */}
        <Route
          exact
          path="/order"
          element={navAndFoot(
            <OrderPage
              numMeals={numMeals}
              setNumMeals={setNumMeals}
              zipCode={zipCode}
              setZipCode={setZipCode}
              // freq={freq}
              // setFreq={setFreq}
              delivDate={delivDate}
              setDelivDate={setDelivDate}
              resetOrderPageInfo={resetOrderPageInfo}
              setResetOrderPageInfo={setResetOrderPageInfo}
              setMealNumbers={setMealNumbers}
            />
          )}
        />

        {/* PickMeals page */}
        <Route
          exact
          path="/pickMeals"
          element={navAndFoot(
            <PickMeals
              zipCode={zipCode}
              cart={cart}
              setCart={setCart}
              mealNumbers={mealNumbers}
              setMealNumbers={setMealNumbers}
              setResetOrderPageInfo={setResetOrderPageInfo}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
              numMealsSelected={numMealsSelected}
              setNumMealsSelected={setNumMealsSelected}
              setLogIn={setLogIn}
              numMeals={numMeals}
              cartPrice={cartPrice}
              setCartPrice={setCartPrice}
              delivDate={delivDate}
            />
          )}
        />

        {/* CheckOut Page */}
        <Route exact path="/checkOut" element={<CheckOut />} />

        {/* Order History Page */}
        <Route
          exact
          path="/orderHistory"
          element={navAndFoot(<OrderHistory isLoggedIn={loggedIn} />)}
        />

        {/* Hotel Page */}
        <Route exact path="/hotel" element={<Hotel />} />

        {/* Admin Page */}
        <Route exact path="/admin" element={<AdminPortal />} />

        {/* Privacy Policy */}
        <Route exact path="/privacy" element={navAndFoot(<PrivacyPolicy />)} />

        {/* Terms & Condition Policy */}
        <Route
          exact
          path="/terms"
          element={navAndFoot(<TermsAndCondition />)}
        />

        {/* Refunds Policy */}
        <Route
          exact
          path="/refund"
          element={navAndFoot(<RefundsAndCancellationsPolicy />)}
        />

        <Route path="*" element={navAndFoot(<ErrorPage />)} />
      </Routes>
    </>
  );
}

export default App;
