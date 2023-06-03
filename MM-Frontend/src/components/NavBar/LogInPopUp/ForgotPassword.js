import userSession from "../../../Service/Data/userSession";
import UserAPIService from "../../../Service/APICalls/UserAPIService";
import DataCollectionAPIService from "../../../Service/APICalls/DataCollectionAPIService";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React from "react";

const ForgotPassword = ({
  showForgotPassword,
  setShowForgotPassword,
  setDisplay,
}) => {
  const [title, setTitle] = useState(<span>Forgot Password</span>);
  const [emailForgotPassword, setEmailForgotPassword] = useState("");
  const [emailLabel, setEmailLabel] = useState(
    <label htmlFor="emailForgotPassword" className="col-form-label">
      Enter email<span style={{ color: "red" }}>*</span>
    </label>
  );

  const [status, setStatus] = useState("Get Password");

  const handleClose = () => {
    setTitle(<span>Forgot Password</span>);
    setEmailForgotPassword("");
    setEmailLabel(
      <label htmlFor="emailForgotPassword" className="col-form-label">
        Enter email<span style={{ color: "red" }}>*</span>
      </label>
    );
    setStatus("Get Password");
    setShowForgotPassword(false);
    setDisplay(true);
  };

  const getCredentials = () => {
    // emailForgotPassword is empty
    if (emailForgotPassword.length === 0) {
      setEmailLabel(
        <label htmlFor="emailForgotPassword" className="col-form-label">
          <span style={{ color: "red" }}>
            Enter Email<span style={{ color: "red" }}>**</span>
          </span>
        </label>
      );
    } else {
      setStatus("Loading...");
      setEmailLabel(
        <label htmlFor="emailForgotPassword" className="col-form-label">
          Enter email<span style={{ color: "red" }}>*</span>
        </label>
      );
      // API CALL
      UserAPIService.forgotPassword(emailForgotPassword)
        .then((response) => {
          setStatus("Get Password");
          const data = response.data;
          if (data === "notFound") {
            setTitle(
              <span style={{ color: "red" }}>
                Account does not exist, Create new Account
              </span>
            );
          } else if (data === "notSent") {
            setTitle(
              <span style={{ color: "red" }}>
                Error while sending emailForgotPassword create new account or
                contact admin
              </span>
            );
          } else {
            setTitle(
              <span style={{ color: "green" }}>
                Check your emailForgotPassword and Log in!
              </span>
            );

            const activity = `Forgot Password submitted: ${emailForgotPassword}`;
            const dataToSend = {
              sessionID: userSession.getSessionID(),
              pageView: "Unkown, bc this is universal popup",
              activity: activity,
            };
            DataCollectionAPIService.pageViewCollect(dataToSend)
              .then((r) => {})
              .catch((err) => {});

            setTimeout(() => {
              handleClose();
            }, 1500);
          }
        })
        .catch((err) => {
          setStatus("Get Password");
          setTitle(
            <span style={{ color: "red" }}>
              Error while sending emailForgotPassword create new account or
              contact admin
            </span>
          );
        });
    }
  };
  return (
    <Modal
      show={showForgotPassword}
      onHide={() => handleClose()}
      style={{ fontFamily: "Signika" }}
    >
      <Modal.Header closeButton style={{ textAlign: "center" }}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form>
          <div className="mb-3">
            {emailLabel}
            <input
              type="text"
              className="form-control"
              id="emailForgotPassword"
              value={emailForgotPassword}
              onChange={(e) => setEmailForgotPassword(e.target.value)}
            />
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={getCredentials}>
          <span className="text-primary">{status}</span>
        </Button>

        <Button variant="secondary" onClick={handleClose}>
          <span className="text-primary">Close</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ForgotPassword;
