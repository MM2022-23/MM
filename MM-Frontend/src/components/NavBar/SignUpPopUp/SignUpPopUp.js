import DataCollection from "../../../Service/Data/DataCollection";
import { Link } from "react-router-dom";
import UserAPIService from "../../../Service/APICalls/UserAPIService";
/***
 * Will call backend API to register user
 */

import userSession from "../../../Service/Data/userSession";
import DataCollectionAPIService from "../../../Service/APICalls/DataCollectionAPIService";
import "./SignUp.css";
import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useState } from "react";
import ReactGA from "react-ga4";

function SignUpPopUp({ style, setLogIn }) {
  // display pop up
  const [display, setDisplay] = useState(false);

  // states for firstName, firstNameLabel
  const [firstName, setFirstName] = useState("");
  const [firstNameLabel, setFirstNameLabel] = useState(
    <label htmlFor="first-name" className="col-form-label">
      <span style={{ color: "black" }}>
        First Name <span style={{ color: "red" }}>*</span>
      </span>
    </label>
  );

  // states for lastName, lastNameLabel
  const [lastName, setLastName] = useState("");
  const [lastNameLabel, setLastNameLabel] = useState(
    <label htmlFor="last-name" className="col-form-label">
      <span style={{ color: "black" }}>
        Last Name <span style={{ color: "red" }}>*</span>
      </span>
    </label>
  );

  // states for email, emailLabel
  const [email, setEmail] = useState("");
  const [emailLabel, setEmailLabel] = useState(
    <label htmlFor="email" className="col-form-label">
      <span style={{ color: "black" }}>
        Email <span style={{ color: "red" }}>*</span>
      </span>
    </label>
  );
  // states for password, passwordLabel
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordLabel, setUserPasswordLabel] = useState(
    <label htmlFor="userPassword" className="col-form-label">
      <span style={{ color: "black" }}>
        Create Password <span style={{ color: "red" }}>*</span>
      </span>
    </label>
  );

  // states for phone, phoneLabel
  const [phone, setPhone] = useState("");
  const [phoneLabel, setPhoneLabel] = useState(
    <label htmlFor="phone" className="col-form-label">
      <span style={{ color: "black" }}>
        Phone <span style={{ color: "red" }}>*</span>
      </span>
    </label>
  );

  // restores labels to black text and replace ** with *
  // for eg. First Name ** in red will become First Name * in black
  const resetLabels = () => {
    setFirstNameLabel(
      <label htmlFor="first-name" className="col-form-label">
        <span style={{ color: "black" }}>
          First Name <span style={{ color: "red" }}>*</span>
        </span>
      </label>
    );
    setLastNameLabel(
      <label htmlFor="last-name" className="col-form-label">
        <span style={{ color: "black" }}>
          Last Name <span style={{ color: "red" }}>*</span>
        </span>
      </label>
    );
    setEmailLabel(
      <label htmlFor="email" className="col-form-label">
        <span style={{ color: "black" }}>
          Email <span style={{ color: "red" }}>*</span>
        </span>
      </label>
    );

    setUserPasswordLabel(
      <label htmlFor="userPassword" className="col-form-label">
        <span style={{ color: "black" }}>
          Create Password <span style={{ color: "red" }}>*</span>
        </span>
      </label>
    );

    setPhoneLabel(
      <label htmlFor="phone" className="col-form-label">
        <span style={{ color: "black" }}>
          Phone <span style={{ color: "red" }}>*</span>
        </span>
      </label>
    );
  };

  // resets state of data
  const resetData = () => {
    setFirstName("");
    setLastName("");
    setUserPassword("");
    setEmail("");
    setPhone("");
  };

  // reset data & lables
  const reset = () => {
    localStorage.removeItem("Loading");
    resetLabels();
    resetData();
  };

  //reset ALL states of data & CLOSE Pop Up
  const handleClose = () => {
    reset();
    setDisplay(false);
  };

  const handleDisplay = (e) => {
    e.preventDefault();
    setDisplay(true);
  };

  /** User clicked on submit
   * all fields were entered
   * API interaction happens here
   * Validate email
   * Store data in DB
   * get userId and update userInfo global state
   */
  const handleSubmit = () => {
    resetLabels();
    if (firstName.length === 0) {
      setFirstNameLabel(
        <label htmlFor="first-name" className="col-form-label">
          <span style={{ color: "red" }}>
            First Name <span style={{ color: "red" }}>**</span>
          </span>
        </label>
      );
    } else if (lastName.length === 0) {
      setLastNameLabel(
        <label htmlFor="last-name" className="col-form-label">
          <span style={{ color: "red" }}>
            Last Name <span style={{ color: "red" }}>**</span>
          </span>
        </label>
      );
    } else if (email.length === 0) {
      setEmailLabel(
        <label htmlFor="email" className="col-form-label">
          <span style={{ color: "red" }}>
            Email <span style={{ color: "red" }}>**</span>
          </span>
        </label>
      );
    } else if (phone.length !== 10) {
      setPhoneLabel(
        <label htmlFor="phone" className="col-form-label">
          <span style={{ color: "red" }}>
            Phone <span style={{ color: "red" }}>**</span>
          </span>
        </label>
      );
    } else if (userPassword.length === 0) {
      setUserPasswordLabel(
        <label htmlFor="userPassword" className="col-form-label">
          <span style={{ color: "red" }}>
            Create Password <span style={{ color: "red" }}>**</span>
          </span>
        </label>
      );
    } else if (!document.getElementById("ageRestriction").checked) {
      document.getElementById("agreement").style.color = "red";
    } else {
      const toBeAdded = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: userPassword,
        phone: phone,
      };
      UserAPIService.registerUser(toBeAdded)
        .then((response) => {
          localStorage.removeItem("Loading");
          if (response.status === 201) {
            setLogIn(true);
            const userLoggedIn = {
              id: response.data,
              fname: firstName,
              lname: lastName,
              emailAddress: email,
              password: userPassword,
              phone: phone,
            };
            userSession.addUser(userLoggedIn);
            handleClose();

            DataCollection.registerActivity(
              "Universal SignUp PopUp",
              `Signed up Successfully: ${userSession.getUser().emailAddress}`
            );

            // console.log("SUCCESS ON FRONT END ");
          } else {
            // FIX: DIFFERENTIATE OTHER ERRS FROM SIGN UP DUPLICATE EMAIL ERRORS
            // console.log("FAILURE ON FRONT END ");
          }
        })
        .catch((err) => {
          // console.log("ERR :" + err);
          localStorage.removeItem("Loading");
          setEmailLabel(
            <label htmlFor="email" className="col-form-label">
              <span style={{ color: "red" }}>
                Email already registered, use different Email
                <span style={{ color: "red" }}></span>
              </span>
            </label>
          );
          // console.log("ERROR::: " + err);
        });
      // IF email valid => following things
      // store more info on order history
      // setLogIn(true);
      // const userLoggedIn = {
      //   fname: firstName,
      //   lname: lastName,
      //   emailAddress: email,
      //   password: userPassword,
      // };
      // userSession.addUser(userLoggedIn);
      // handleClose();

      // IF email invalid => take some action
    }
  };

  return (
    <>
      {/* Sign Up Button on Red Box in Showcase */}
      <button
        onClick={(e) => {
          handleDisplay(e);
          DataCollection.registerActivity("Universal SignUp", "Signing Up");
        }}
        className="buttonAdjustments"
      >
        <span style={{ color: style.textColor }}>Sign Up</span>
      </button>

      {/* Content in Pop Up */}
      <Modal
        show={display}
        onHide={handleClose}
        style={{ fontFamily: "Signika" }}
      >
        <Modal.Header closeButton style={{ textAlign: "center" }}>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="lead">Fill out this form and you are all set</p>
          <form>
            <div className="mb-3">
              {firstNameLabel}
              <input
                type="text"
                className="form-control"
                id="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              {lastNameLabel}
              <input
                type="text"
                className="form-control"
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              {emailLabel}
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              {phoneLabel}
              <input
                type="number"
                className="form-control"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="mb-3">
              {userPasswordLabel}
              <input
                type="password"
                className="form-control"
                id="userPassword"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <p id="agreement">
                <span style={{ marginRight: "7px" }}>
                  <input type="checkbox" id="ageRestriction" />
                </span>
                I am 18 years of age or older and agree to the
                <Link className="text-dark" to="/privacy">
                  Privacy Policy
                </Link>
                ,
                <Link className="text-dark" to="/terms">
                  Terms and Conditions
                </Link>
                , and
                <Link className="text-dark" to="/refund">
                  Refunds and Cancellation Policy
                </Link>
                .
              </p>
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant={style.buttonColor} onClick={handleClose}>
            <span style={{ color: style.textColor }}>Close</span>
          </Button>
          {/* Submit Button Clicked */}
          <Button variant={style.buttonColor} onClick={handleSubmit}>
            {localStorage.getItem("Loading") ? (
              <span style={{ color: style.textColor }}>Loading...</span>
            ) : (
              <span style={{ color: style.textColor }}>Submit</span>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default SignUpPopUp;
