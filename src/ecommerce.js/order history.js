import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, Spinner, Alert } from 'react-bootstrap';

function OrderHistory({ setIsAuthenticated }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://127.0.0.1:8000/cart_mgmt/order-history/`, {
                    method: 'POST',
                    credentials: 'include',
                });

                if (!response.ok) {
                    if (response.status === 401 || response.status === 403) {
                        setIsAuthenticated(false);
                        localStorage.removeItem('isAuthenticated');
                        setError('Session expired. Please log in again.');
                        return;
                    }
                    setError('Failed to fetch order history.');
                    return;
                }

                const data = await response.json();
                setOrders(data.Orders || []);
            } catch (err) {
                setError('An error occurred while fetching order history.');
                console.error('Error fetching order history:', err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderHistory();
    }, [setIsAuthenticated]);

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <h2 className="text-center mb-4">Order History</h2>

                    {loading && (
                        <div className="text-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                            <p className="mt-3">Loading your order history...</p>
                        </div>
                    )}

                    {error && (
                        <Alert variant="danger" className="text-center">
                            {error}
                        </Alert>
                    )}

                    {!loading && !error && orders.length === 0 && (
                        <p className="text-center text-muted">You have no orders yet.</p>
                    )}

                    {!loading && !error && orders.length > 0 && (
                        <ListGroup>
                            {orders.map((order) => (
                                <ListGroup.Item key={order.id} className="mb-3">
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Order ID: {order.id}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">
                                                Order Date: {new Date(order.created_at).toLocaleDateString()}
                                            </Card.Subtitle>
                                            <Card.Text>Total Amount: ₹{order.total_amount}</Card.Text>
                                            <Card.Text>Status: {order.is_paid ? 'Paid' : 'Pending'}</Card.Text>
                                            <h6>Items:</h6>
                                            <ul>
                                                {order.items.map((item, index) => (
                                                    <li key={index}>
                                                        {item.product} - Quantity: {item.quantity}
                                                    </li>
                                                ))}
                                            </ul>
                                        </Card.Body>
                                    </Card>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default OrderHistory;
