import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';

const ResetPassword = () => {
  const [searchParams] = useSearchParams(); // To retrieve token from the URL
  const [new_password, setnew_Password] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const token = searchParams.get('token'); // Extract token from URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (new_password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    try {
      console.log('Sending password reset request...');
      const response = await fetch(
        `http://127.0.0.1:8000/admin_console/reset-password/?token=${token}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ new_password }),
          credentials: 'include',
        }
      );

      // Log the response status and body for debugging
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        setError(data.message || 'Something went wrong!');
        return;
      }

      // If response is OK, show success message
      setSuccess(true);
      setError(''); // Clear any existing error message
    } catch (err) {
      console.error('Error during password reset:', err);
      setError('Failed to reset password. Please try again later.');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4} className="p-4 border rounded shadow-sm">
          <h2 className="text-center mb-4">Reset Password</h2>
          
          {/* Display error message if there's an error */}
          {error && <Alert variant="danger">{error}</Alert>}

          {/* Display success message if password reset is successful */}
          {success && (
            <Alert variant="success">
              Password has been reset successfully. You can now log in with your new password.
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={new_password}
                onChange={(e) => setnew_Password(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary" className='w-100'>
              Reset Password
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
