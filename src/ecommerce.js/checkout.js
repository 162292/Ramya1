import React, { useState } from 'react';
import { Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';

const Checkout = () => {
    const [orderDetails, setOrderDetails] = useState(null);
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(null); // 'success' or 'danger'
    const [isAuthenticated, setIsAuthenticated] = useState(true); // Track authentication status

    // Function to handle checkout
    const handleCheckout = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/cart_mgmt/checkout/`, {
                method: 'POST',
                credentials: 'include', // Include cookies in the request
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                setMessage(`Checkout failed with status: ${response.status}`);
                setMessageType('danger');
                return;
            }

            const data = await response.json();
            console.log('Checkout Response:', data);

            if (data.Success) {
                setOrderDetails(data);
                setMessage(data.Message);
                setMessageType('success');
            } else {
                setMessage(data.Message || 'Checkout failed.');
                setMessageType('danger');
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            setMessage('Failed to proceed with checkout. Please try again.');
            setMessageType('danger');
        }
    };

    // Function to handle payment
    const handlePayment = async () => {
        
        if (!orderDetails) {
            setMessage('No order details available. Please checkout first.');
            setMessageType('danger');
            return;
        }

        const orderId = orderDetails["Order ID"];
        if (!orderId) {
            setMessage('Order ID is missing. Please complete the checkout process.');
            setMessageType('danger');
            return;
        }

        console.log('Order ID:', orderId);

        if (!isAuthenticated) {
            setMessage('You must be logged in to make a payment.');
            setMessageType('danger');
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/cart_mgmt/payment/${orderId}/`, {
                method: 'POST',
                credentials: 'include', // Include cookies in the request
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(),
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                setMessage(`Payment failed with status: ${response.status}`);
                setMessageType('danger');
                return;
            }

            const data = await response.json();
            console.log('Payment Response:', data);

            if (data.Success) {
                setMessage(data.Message);
                setMessageType('success');
                setOrderDetails(null); // Reset after successful payment
            } else {
                setMessage(data.Message || 'Payment failed.');
                setMessageType('danger');
            }
        } catch (error) {
            console.error('Error during payment:', error);
            setMessage('Failed to process payment. Please try again.');
            setMessageType('danger');
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center">Checkout</h2>

                            {message && (
                                <Alert variant={messageType} className="mt-3">
                                    {message}
                                </Alert>
                            )}

                            <Button onClick={handleCheckout} className="w-100 mt-3" variant="primary">
                                Proceed to Checkout
                            </Button>

                            {orderDetails && (
                                <div className="mt-4">
                                    <h3>Order Summary</h3>
                                    <p><strong>Order ID:</strong> {orderDetails["Order ID"]}</p>
                                    <p><strong>Total Amount:</strong> ₹{orderDetails["Total Amount"]}</p>
                                    <Button onClick={handlePayment} className="w-100 mt-3" variant="success">
                                        Make Payment
                                    </Button>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Checkout;
