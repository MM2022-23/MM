/***
 * has 1 Nav bar, 2 Information Boxes, 1 Foot Bar
 */

import { useEffect } from "react";
import ScrollTop from "../../Service/ScrollTop";
import React from "react";
import Showcase from "./Showcase/Showcase";
import Question from "./Questions/Question";
import Contact from "./Contact/Contact";
import InformationGrid from "../About/InformationGrid/InformationGrid";
import MealPlans from "./MealPlans/MealPlans";
import MealsLookUp from "./MealsLookUp/MealsLookUp";
import Testimonials from "./Testimonials/Testimonials";
const Home = ({
  loggedIn,
  setLogIn,
  setMeals,
  setResetOrderPageInfo,
  setCart,
  setMealNumbers,
  scrollFAQ,
  setScrollFAQ,
}) => {
  useEffect(() => {
    document.title="Mirchi Meals"
    if (scrollFAQ) {
      console.log("Down!!!");
      ScrollTop.scrollToFAQ();
      setScrollFAQ(false);
    } else {
      console.log("UP!!!");
      ScrollTop.scrollUp();
    }
  }, []);
  const saveTime = {
    backColor: "primary",
    headingColor: "dark",
    titleColor: "secondary",
    textColor: "dark",

    heading: "How It Works",
    image1: require("../../Resources/Vector/step1.png"),
    image1Height: "150px",
    image1Width: "250px",
    title1: "Choose Your Meals and Plan",
    description1:
      "Choose a minimum of 4 ready-to-eat meals",

    image2: require("../../Resources/Vector/step2.png"),
    image2Width: "250px",
    image2Height: "150px",
    title2: "Receive Your Delivery ",
    description2: "All meals for the week are delivered straight to you.",

    image3: require("../../Resources/Vector/step3.png"),
    image3Width: "250px",
    image3Height: "150px",
    title3: "Enjoy Your Meals",
    description3: "Microwave meals throughout the week and enjoy right away!",
  };

  const stats = {
    backColor: "light",
    headingColor: "dark",
    titleColor: "dark",
    textColor: "dark",

    heading: "Authentically Amazing",
    image1: require("../../Resources/Vector/customers.png"),
    image1Height: "150px",
    image1Width: "345.95px",
    title1: "Diverse Customers",
    description1:
      "Customers from backgrounds such as: programmers, students, sports enthusiasts, military veterans",

    image2: require("../../Resources/Vector/satisfiction.png"),
    image2Width: "241.44px",
    image2Height: "150px",
    title2: "Guaranteed Satisfaction",
    description2:
      "Customers have repeatedly praised Mirchi Meals’ affordability, quantity and pure taste",

    image3: require("../../Resources/Vector/kitchen.png"),
    image3Width: "313.80px",
    image3Height: "150px",
    title3: "Quality Chefs and Ingredients",
    description3:
      "Across New Jersey, we are partnered with top rated kitchens.",
  };
  return (
    <>
      {/* Log In & Sign Up Button */}
      <Showcase loggedIn={loggedIn} setLogIn={setLogIn} />

      {/* How you save time */}
      <InformationGrid data={saveTime} />

      {/* Meal Plans */}
      <MealPlans
        setMeals={setMeals}
        setResetOrderPageInfo={setResetOrderPageInfo}
        setCart={setCart}
        setMealNumbers={setMealNumbers}
      />

      {/* Fans Favorite */}
      {/* <MealsLookUp /> */}
      <Testimonials />

      {/* Stats */}
      <InformationGrid data={stats} />

      {/* FAQs */}
      <Question />

      {/* Contact */}
      <Contact />
    </>
  );
};

export default Home;
