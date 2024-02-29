import React from "react";
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'

const Error = ({ error, setError }) => {
    return (
        <ToastContainer className="p-3" position="top-center">
            <Toast  show={error} delay={3000} onClose={() => setError(false)} autohide>
                <Toast.Header>
                    {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
                    <strong className="me-auto">Error</strong>
                    <small className="text-muted">just now</small>
                </Toast.Header>
                <Toast.Body>Please try again after 1 minute!</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default Error;