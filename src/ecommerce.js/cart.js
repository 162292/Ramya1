import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Image, ListGroup } from 'react-bootstrap';


function Cart({ setIsAuthenticated }) {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://127.0.0.1:8000/cart_mgmt/view/`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    if (response.status === 401 || response.status === 403) {
                        setIsAuthenticated(false);
                        localStorage.removeItem('isAuthenticated');
                // Use a timeout to ensure state updates are reflected
                setTimeout(() => {
                    alert('Session expired, please log in again');
                    navigate('/login');
                    }, 100); 

                    } else {
                        alert('Failed to fetch cart');
                    }
                    return;
                }

                const data = await response.json();
                setCart(data["Cart Items"]);
            } catch (error) {
                console.error('Error fetching cart:', error.message);
                alert('Error fetching cart');
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [setIsAuthenticated, navigate]);

    const handleDelete = async (cartItemId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/cart_mgmt/remove/${cartItemId}/`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!response.ok) {
                alert('Failed to remove item');
                return;
            }

            setCart((prevItems) => prevItems.filter(item => item.id !== cartItemId));
            alert('Item removed from cart');
        } catch (error) {
            console.error('Error removing item:', error.message);
            alert('Error removing item');
        }
    };

     const handleCheckout = () => {
         if (cart.length === 0) {
             alert('Your cart is empty. Add items to proceed to checkout.');
             return;
         }
         navigate('/checkout');
     };

    return (
        <Container className="cart-container">
            <h2 className="text-center">Your Cart</h2>

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                    <p>Loading your cart...</p>
                </div>
            ) : cart.length > 0 ? (
                <>
                    <ListGroup className="cart-list">
                        {cart.map((item) => (
                            <ListGroup.Item key={item.id} className="cart-item d-flex align-items-center">
                                <Row className="w-100">
                                    <Col md={2} className="d-flex align-items-center">
                                        <Image src={item.imageUrl} alt={item.model} thumbnail className="cart-item-image" />
                                    </Col>
                                    <Col md={6} className="d-flex flex-column">
                                        <p className="mb-1 fw-bold">{item.model}</p>
                                        <p className="mb-0">Quantity: {item.quantity}</p>
                                        <p className="mb-0">Price: ₹{item.price}</p>
                                    </Col>
                                    <Col md={4} className="text-end">
                                        <Button
                                            variant="danger"
                                            className="remove-button"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            Remove
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                     <div className="checkout-container mt-4 text-end">
                        <Button variant="primary" className="checkout-button" onClick={handleCheckout}>
                            Proceed to Checkout
                        </Button>
                    </div> 
                </>
            ) : (
                <p className="text-center">Your cart is empty.</p>
            )}
        </Container>
    );
}

export default Cart;
