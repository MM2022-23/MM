import userSession from "../../../Service/Data/userSession";
import DataCollectionAPIService from "../../../Service/APICalls/DataCollectionAPIService";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import TestimonialCard from "./TestimonialCard";
import "./Testimonials.css";

const items = [
  <TestimonialCard
    testimony="“I never thought Indian food could be so addicting, I'm a repeating customer!”"
    image={require("../../../Resources/Users/Mary.png")}
    name="Mary, 67"
    work="Proud Grandmother"
    data-value="1"
  />,
  <TestimonialCard
    testimony="“Mirchi Meals is god-sent with my schedule! My boys love the meals too!”"
    image={require("../../../Resources/Users/Pallavi.png")}
    name="Pallavi, 43"
    work="Senior Financial Analyst"
    data-value="2"
  />,
  <TestimonialCard
    testimony="“As a busy professional, this is the service I didn’t know I needed.”"
    image={require("../../../Resources/Users/Krish.png")}
    name="Krish, 28"
    work="Data ETL Engineer"
    data-value="3"
  />,
  <TestimonialCard
    testimony="“I've started recommending Mirchi Meals to all my clients too, I can't get enough.”"
    image={require("../../../Resources/Users/Cherry.png")}
    name="Cherry, 38"
    work="Caregiver"
    data-value="4"
  />,
  <TestimonialCard
    testimony="“When my mother says its good, you know its good!”"
    image={require("../../../Resources/Users/Uma.png")}
    name="Uma, 55"
    work="Fitness Trainer"
    data-value="5"
  />,
  <TestimonialCard
    testimony="“Between my in-laws being over for a few months, my children’s after school activities, and errands, Mirchi Meals has been able to keep me calm.”"
    image={require("../../../Resources/Users/Ankhi.png")}
    name="Ankhi, 40"
    work="Stay-at-Home Mom"
    data-value="6"
  />,
  <TestimonialCard
    testimony="“The meals are fresh whenever I reheat them throughout the week, you can taste the quality and effort.”"
    image={require("../../../Resources/Users/Anastasia.png")}
    name="Anastasia, 35"
    work="Waitress"
    data-value="7"
  />,

  <TestimonialCard
    testimony="“As an international masters student studying in the states, I always miss my mom's cooking. Thank You for filling that gap!“"
    image={require("../../../Resources/Users/Shreya.png")}
    name="Shreya, 25"
    work="Student of Designing"
    data-value="8"
  />,

  <TestimonialCard
    testimony="“These meals give me the power to get through my week, I'm a fan!”"
    image={require("../../../Resources/Users/Maitri.png")}
    name="Maitri, 31"
    work="Human Resources Manager"
    data-value="9"
  />,
];

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1000: { items: 3 },
};

export default function App() {
  return (
    <>
      <div className="testimonial-container ">
        <div className="testimonials" style={{ fontSize: "48px" }}>
          Customer Reviews
        </div>
        <p className="testimonials-description">
          Don't take our word, see what our customers are saying
        </p>
        <AliceCarousel
          mouseTracking
          items={items}
          responsive={responsive}
          autoPlay
          infinite
          autoPlayInterval={1700}
          animationDuration={1700}
        />

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
              onClick={() => {
                const activity = userSession.isLoggedIn()
                  ? `Clicked Order frm Cus Revs: ${
                      userSession.getUser().emailAddress
                    }`
                  : `Clicked Order frm Cus Revs: Anon`;
                const dataToSend = {
                  sessionID: userSession.getSessionID(),
                  pageView: "Home",
                  activity: activity,
                };
                DataCollectionAPIService.pageViewCollect(dataToSend)
                  .then((r) => {})
                  .catch((err) => {});
              }}
            >
              Order
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
