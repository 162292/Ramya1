import React, { useState } from 'react';

import { Button, Alert} from 'react-bootstrap';

const ResendVerification = ({ email }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/admin_console/resend-verification/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Verification email sent successfully!');
      } else {
        setMessage(data.message || 'Failed to send verification email.');
      }
    } catch (error) {
      console.error('Resend Verification Error:', error);
      setMessage('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-3">
      {message && <Alert variant={message.includes('successfully') ? 'success' : 'danger'}>{message}</Alert>}
      <Button variant="link" onClick={handleResend} disabled={loading}>
        {loading ? 'Sending...' : 'Resend Verification Email'}
      </Button>
    </div>
  );
};
export default ResendVerification;
