import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';



const AddToCart = ({ product_id }) => {
  const [quantity, setQuantity] = useState(1);

  const addToCart = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/cart_mgmt/add/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ product_id, quantity }),
        credentials: 'include',
      });

    // Check the response body
    const responseData = await response.json();
    console.log('Response:', responseData);

    if (response.ok) {

      alert('Item added to cart successfully!');
    } else {
      // Show the error message from the response if available
      
      alert(responseData.message || 'Failed to add item to cart.');
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    alert('An error occurred while adding the item to the cart.');
  }
};

  return (
    <Form>
      <InputGroup className="align-items-center">
        {/* Display Quantity label */}
        <span className="me-2">Quantity:</span>
        <Form.Control
          type="number"
          value={quantity}
          min="1"
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          style={{ textAlign: 'center', maxWidth: '80px' }}
        />
      </InputGroup>
      <div className='mb-3 '>
      <Button variant="primary" onClick={addToCart} className="w-100" >
        Add to Cart
      </Button>
      </div>
    </Form>
  );
};

export default AddToCart;
