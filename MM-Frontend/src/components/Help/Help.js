import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate , useLocation} from "react-router-dom";
import React from "react";
import ScrollTop from "../../Service/Misc/ScrollTop";
import {Helmet} from "react-helmet";
import ReactGA from 'react-ga4'; 

const Help = ({ scrollFAQ, setScrollFAQ }) => {
  const useLoc = useLocation(); 
  useEffect(() => {
    ScrollTop.scrollUp();
    ReactGA.send({ 
      hitType: 'pageview', 
      page_location: window.location.href, 
      page_path: useLoc.pathname, 
      page_title: 'Help' 
    });
  }, []);
  const navigate = useNavigate();
  const toFAQ = (e) => {
    e.preventDefault();
    setScrollFAQ(true);
    navigate("/");
  };
  return (
    <>
    <Helmet>
      <title>
      Help
      </title>
      <meta name = "description" content="For comments, concerns and order cancellations, please address to support@mirchimeals.com where our support staff will get back to your query within 3 hours."/>
      
    </Helmet>
    <section
      className="mealPlans bg-primary"
      style={{ fontFamily: "Signika", padding: "64px 32px" }}
    >
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
          <img
            className="img-fluid"
            src={require("../../Resources/Vector/help.png")}
          />
          {/* Help Text */}
          <div style={{ marginTop: "30px" }}>
            <p className="">
              Any inquiries, comments, concerns, or requests for cancellations
              please address to: support@mirchimeal.com
            </p>
            <p>
              Our support staff will get back to you in less than 3 hours.
              Promise :)
            </p>
            <p>
              Please check our{" "}
              <Link className="text-dark mx-1" onClick={(e) => toFAQ(e)} to="">
                FAQ
              </Link>
              section to see if you can find the answer to your question.{" "}
            </p>
            <p>In the meantime, try out our meals.</p>

            {/* Order Button */}
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
          </div>
        </div>
      </div>
    </section>
    </>
    
  );
};

export default Help;
