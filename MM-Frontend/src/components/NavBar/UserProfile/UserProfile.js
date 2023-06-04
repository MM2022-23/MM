import Row from "react-bootstrap/Row";
import PopUp from "../../../SharedComponents/PopUp/PopUp";
import { useState } from "react";
import SignUpPopUp from "../SignUpPopUp/SignUpPopUp";
import LogInPopUP from "../LogInPopUp/LogInPopUp";
import React from "react";
import userSession from "../../../Service/Data/userSession";
import { Dropdown } from "react-bootstrap";
const UserProfile = ({ setDisplayAccountInfo, setLogIn }) => {
  // fromLogOut exists so even after user logs out login/sign up popup does not annoy user
  let fromLogOut = false;
  const logOut = () => {
    setLogIn(false);
    userSession.removeUser();
    fromLogOut = true;
  };
  const dropDownClicked = () => {
    if (fromLogOut) {
      setDisplayPopUp(false);
      fromLogOut = false;
    } else if (!userSession.isLoggedIn()||userSession.getUser().id==="improper") {
      setTitle("LogIn/SignUp");
      setBody(
        <div
          className="container align-items-center d-flex justify-content-center"
          style={{ fontFamily: "Signika" }}
        >
          <form style={{ padding: "20px" }} className="rounded">
            <Row className="">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="mb-4">
                  <p className="lead">Log in or Sign Up to continue</p>
                </label>
              </div>
            </Row>

            <div className="container text-center mb-4">
              <LogInPopUP
                style={{ buttonColor: "secondary", textColor: "white" }}
                setLogIn={setLogIn}
              />
            </div>
            <div className="container text-center">
              <SignUpPopUp
                style={{ buttonColor: "secondary", textColor: "white" }}
                setLogIn={setLogIn}
              />
            </div>
          </form>
        </div>
      );
      setDisplayPopUp(true);
    }
  };

  const [displayPopUp, setDisplayPopUp] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  return (
    <>
      <Dropdown onClick={dropDownClicked}>
        <Dropdown.Toggle
          variant="light"
          id="dropdown-basic"
          className="mx-1"
          style={{
            marginBottom: "-3px",
            borderRadius: "10px",
            height: "36px",
            boxShadow: "2px 1px 3px black",
          }}
        >
          <i
            className="bi bi-person"
            style={{
              marginBottom: "2px",
              borderRadius: "10px",
              height: "36px",
            }}
          ></i>
        </Dropdown.Toggle>

        {(userSession.isLoggedIn()&&userSession.getUser().id!=="improper") && (
          <Dropdown.Menu>
            <Dropdown.Item href="#/orderHistory">Order History</Dropdown.Item>
            <Dropdown.Item onClick={() => setDisplayAccountInfo(true)}>
              Account Info
            </Dropdown.Item>
            <Dropdown.Item onClick={logOut}>Log Out</Dropdown.Item>
          </Dropdown.Menu>
        )}
      </Dropdown>
      {(!userSession.isLoggedIn()||userSession.getUser().id==="improper") && (
        <PopUp
          displayPopUp={displayPopUp}
          setDisplayPopUp={setDisplayPopUp}
          title={title}
          body={body}
        />
      )}
    </>
  );
};

export default UserProfile;
