import React, { useState } from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";




const RequestOtp = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("danger"); // For Alert color control


  // Function to request OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset previous message

    try {
      const response = await fetch(`http://127.0.0.1:8000/admin_console/otp-login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: phoneNumber }),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to send OTP");

      const data = await response.json();
      setMessage("OTP sent successfully!");
      setVariant("success");
      console.log("Response:", data);
          
            

    } catch (error) {
      setMessage(error.message || "An error occurred!");
      setVariant("danger");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h3 className="text-center mb-4">Request OTP</h3>
          <Form onSubmit={handleRequestOtp}>
            <Form.Group controlId="phoneNumber" className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">
              Request OTP
            </Button>
          </Form>

          {/* Feedback Message */}
          {message && (
            <Alert className="mt-3" variant={variant}>
              {message}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RequestOtp;
