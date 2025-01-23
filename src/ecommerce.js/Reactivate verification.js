import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function ReactivateVerification() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);

    const handleReactivateVerification = async (e) => {
        e.preventDefault();
        setMessage(null); // Clear previous message

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/admin_console/reactivate-verification/`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email }),
                    credentials: 'include',
                }
            );

            if (response.ok) {
                setMessage({ type: 'success', text: 'Verification email sent successfully!' });
            } else {
                const errorData = await response.json();
                setMessage({ type: 'danger', text: errorData.message || 'Failed to send verification email.' });
            }
        } catch (error) {
            console.error('Error during reactivation request:', error);
            setMessage({ type: 'danger', text: 'An unexpected error occurred. Please try again.' });
        }
    };

    return (
        <div>
            <Form onSubmit={handleReactivateVerification}>
                <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Send Verification Email
                </Button>
            </Form>
            {message && (
                <Alert className={`mt-3 text-center alert-${message.type}`}>
                    {message.text}
                </Alert>
            )}
        </div>
    );
}

export default ReactivateVerification;
