import React from "react";
import Toast from "react-bootstrap/Toast";

const Error = ({ messageError, showError, setShowError }) => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 60,
          right: 0,
          zIndex: 50,
          float: "right",
        }}
      >
        <Toast
          onClose={() => setShowError(false)}
          show={showError}
            delay={3000} autohide
        >
          <Toast.Header>
            <img className="rounded" alt="" />
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>{messageError}</Toast.Body>
        </Toast>
      </div>
    </>
  );
};

export default Error;
