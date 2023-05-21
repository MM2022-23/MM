import React from "react";
import { Accordion } from "react-bootstrap";

const Question = () => {
  return (
    <section
      id="questions"
      className="p-5 bg-dark"
      style={{ fontFamily: "Signika" }}
    >
      <h2 className="text-center text-light mb-4" style={{ fontSize: "42px" }}>
        Frequently Asked Questions
      </h2>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>When do I have to order by?</Accordion.Header>
          <Accordion.Body>
            Customers need to place their orders for meals at least 12 pm the
            day before their intended day of delivery or else they will have to
            choose to get it delivered in the next week.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>When do you deliver?</Accordion.Header>
          <Accordion.Body>
            We deliver all your meals for the week depending on Sundays.
            Deliveries happen between 1pm - 2:30pm EST.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>
            How many people can eat from each meal?
          </Accordion.Header>
          <Accordion.Body>
            Each Mirchi Meal is designed to serve 1 adult. If you’re ordering
            for more people, we encourage you to follow our larger meal plans
            (6, 8, 12 meals/week).
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>
            Why can't I order less than 4 meals?
          </Accordion.Header>
          <Accordion.Body>
            We understand our customers are busy and sometimes chaotically busy.
            As a result, we'd rather have our customers receive all their meals
            for the week in one swoop than them stressing about single off
            deliveries and ordering.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>
            Can I just heat the container the meals come in?
          </Accordion.Header>
          <Accordion.Body>
            Yes, of course! Our meals are intended to be brought out of the
            fridge and reheated. No need to waste any cutlery, bowls, or dishes.
            Remove the lid and place into the microwave.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header>How do I preserve meals?</Accordion.Header>
          <Accordion.Body>
            We recommend that you place your meals you intend to consume
            throughout the week in the fridge as soon you get your delivery.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="6">
          <Accordion.Header>
            How do I partner with Mirchi Meals?
          </Accordion.Header>
          <Accordion.Body>
            Mirchi Meals is always considering new partners to help fuel our fan
            base throughout the week, shoot us an email at
            support@mirchimeals.com
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="7">
          <Accordion.Header>How do you ensure quality?</Accordion.Header>
          <Accordion.Body>
            Silly goose! Each customer is as equal as our family member. We hand
            pick the best foods after tasting them, to ensure we can provide the
            best quality to you.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="8">
          <Accordion.Header>
            Why do your meals remind me of home?
          </Accordion.Header>
          <Accordion.Body>It's just what we do best.</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="9">
          <Accordion.Header>How can I cancel my order?</Accordion.Header>
          <Accordion.Body>
            To cancel your order, write us an email at support@mirchimeals.com
            for a cancellation of your order. You can cancel up till 3pm the day
            prior to the selected delivery date. Refunds will be processed
            within 7-10 business days.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </section>
  );
};

export default Question;
