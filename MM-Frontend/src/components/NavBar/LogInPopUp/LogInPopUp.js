import ForgotPassword from "./ForgotPassword";
import { Link } from "react-router-dom";
import UserAPIService from "../../../Service/APICalls/UserAPIService";
/***
 * Will call backend API to authenticate user based on username and password
 */
import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useState } from "react";
import userSession from "../../../Service/Data/userSession";
import ReactGA from 'react-ga4'; 
function LogInPopUP({ style, setLogIn }) {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  // display pop up
  const [display, setDisplay] = useState(false);

  const [invalid, setInvalid] = useState(false);

  // states for email, emailLabel
  const [email, setEmail] = useState("");
  const [emailLabel, setEmailLabel] = useState(
    <label htmlFor="email" className="col-form-label">
      Enter email<span style={{ color: "red" }}>*</span>
    </label>
  );

  // states for password, passwordLabel
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordLabel, setUserPasswordLabel] = useState(
    <label htmlFor="userPassword" className="col-form-label">
      Enter Password <span style={{ color: "red" }}>*</span>
    </label>
  );

  // restores labels to black text and replace ** with *
  // for eg. User Name ** in red will become User Name * in black
  const resetLabels = () => {
    setEmailLabel(
      <label htmlFor="email" className="col-form-label">
        <span style={{ color: "black" }}>
          Enter email <span style={{ color: "red" }}>*</span>
        </span>
      </label>
    );
    setUserPasswordLabel(
      <label htmlFor="userPassword" className="col-form-label">
        <span style={{ color: "black" }}>
          Enter Password <span style={{ color: "red" }}>*</span>
        </span>
      </label>
    );

    setInvalid(false);
  };

  // resets state of data
  const resetData = () => {
    setEmail("");
    setUserPassword("");
  };

  // reset data & lables
  const reset = () => {
    localStorage.removeItem("Loading");
    resetData();
    resetLabels();
  };

  //reset ALL states of data & CLOSE Pop Up
  const handleClose = () => {
    reset();
    setDisplay(false);
  };

  const handleDisplay = (e) => {
    ReactGA.event({
      category: 'Button',
      action: 'Click',
      label: 'LogIn Button'
    });
    e.preventDefault();
    setDisplay(true);
  };

  /** User clicked on submit
   * all fields were entered
   * API interaction happens here
   * Authenticate user from backend based on email & password
   * get userinfo from backend and update userInfo global state
   */
  const handleSubmit = () => {
    resetLabels();
    if (email.length === 0) {
      setEmailLabel(
        <label htmlFor="email" className="col-form-label">
          <span style={{ color: "red" }}>
            Enter User Name <span style={{ color: "red" }}>**</span>
          </span>
        </label>
      );
    } else if (userPassword.length === 0) {
      setUserPasswordLabel(
        <label htmlFor="userPassword" className="col-form-label">
          <span style={{ color: "red" }}>
            Enter Password <span style={{ color: "red" }}>**</span>
          </span>
        </label>
      );
    } else {
      const toBeAuthenticated = {
        userName: email,
        password: userPassword,
      };
      // API rough work: order history not fetched!
      UserAPIService.logUserIn(toBeAuthenticated)
        .then((response) => {
          localStorage.removeItem("Loading");
          if (response.status === 200) {
            if (response.data.length !== 0) {
              const userLoggedIn = {
                id: response.data.id,
                fname: response.data.First_Name,
                lname: response.data.Last_Name,
                emailAddress: response.data.Email,
                password: response.data.Password,
                phone: response.data.phone,
              };
              ReactGA.event({
                category: "Button",
                action: "LogIn",
                label: "Log In successful",
              });
              userSession.addUser(userLoggedIn);
              setInvalid(false);
              setLogIn(true);
              handleClose();
            } else {
              // incorrect password!
              setInvalid(true);
            }
          }
        })
        .catch((err) => {
          localStorage.removeItem("Loading");
          setInvalid(true);
          console.log("ERROR::: " + err);
        });

      // IF username && password valid => following things

      // setLogIn(true);
      /**
       * Stuff is commented out because version 1.0 of backend API is being integrated
       */

      // const userReceived = {
      //   fname: "First",
      //   lname: "Last",
      //   emailAddress: email,
      //   password: userPassword,
      //   orderHistory: orderhistory,
      // };
      // userSession.addUser(userReceived);
      // handleClose();

      // IF username || password invalid => take some action
    }
  };

  return (
    <>
      {/* Log In Button on Red Box in Showcase */}
      <button onClick={(e) => handleDisplay(e)} className="buttonAdjustments">
        <span style={{ color: style.textColor }}>Log In</span>
      </button>

      {/* Content in Pop Up */}
      <Modal
        show={display}
        onHide={handleClose}
        style={{ fontFamily: "Signika" }}
      >
        <Modal.Header closeButton style={{ textAlign: "center" }}>
          <Modal.Title>
            {invalid ? (
              <span style={{ color: "red" }}>
                Invalid LogIn Credentials Try Again!
              </span>
            ) : (
              <span>Log In</span>
            )}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="lead">Enter email and password</p>
          <form>
            <div className="mb-3">
              {emailLabel}
              <input
                type="text"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Link
            to=""
            style={{ color: "blue", margitRight: "1px" }}
            onClick={() => {
              setDisplay(false);
              setShowForgotPassword(true);
            }}
          >
            Forgot Password
          </Link>
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
      <ForgotPassword
        showForgotPassword={showForgotPassword}
        setShowForgotPassword={setShowForgotPassword}
        setDisplay={setDisplay}
      />
    </>
  );
}
export default LogInPopUP;
