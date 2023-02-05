import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="p-5 bg-dark text-white text-center position-relative"
      style={{ fontFamily: "Signika" }}
    >
      <div className="container">
        <p className="lead">Copyright &copy; 2022 MirchiMeals.com</p>
        <p>
          <Link to="/terms" className="text-light">
            Terms and Conditions
          </Link>
        </p>
        <p>
          <Link to="/privacy" className="text-light">
            Privacy Policy
          </Link>
        </p>

        <p>
          <Link to="/refund" className="text-light">
            Refunds and Cancellations Policy
          </Link>
        </p>
        <p>Credits: pch.vector,Freepik</p>
      </div>
    </footer>
  );
};

export default Footer;
