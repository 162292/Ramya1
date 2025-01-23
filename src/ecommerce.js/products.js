import React, { useState, useEffect } from "react";
import AddToCart from "./Add to cart";
import { Card,Button,Form,Container,Spinner,Row,Col } from "react-bootstrap";
  
const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  // Fetch products from the API
  const getProducts = async (searchQuery = "") => {
    try {
      setLoading(true);
      const url = `http://127.0.0.1:8000/product/get/${
        searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ""
      }`;
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      if (data.Success) {
        setProducts(data.Products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all products on component mount
  useEffect(() => {
    getProducts(); // Fetch all products without query
  }, []);

return (
  <Container className="mt-5">
    <h2 className="text-center mb-4">Products</h2>

    {/* Search Bar */}
    <Form className="mb-4">
      <Form.Group controlId="search">
        <Form.Control
          type="text"
          placeholder="Search for a product..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Prevent form submission
              getProducts(query); // Fetch products based on query
            }
          }}
        />
      </Form.Group>
    </Form>

    {loading ? (
      <div className="text-center">
        <Spinner animation="border" variant="primary" />
      </div>
    ) : products.length > 0 ? (
      <Row className="g-4 justify-content-center">
        {products.map((product) => (
          <Col key={product.productID} xs={12} sm={6} md={4} lg={4}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={product.imageUrl || "https://via.placeholder.com/150"}
                style={{ objectFit: "cover", height: "200px" }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="small fw-bold">{product.model}</Card.Title>
                <Card.Text className="text-muted small">
                  {product.description}
                </Card.Text>
                <Card.Text>
                  <strong>Price:</strong> ₹{product.price}
                </Card.Text>
                <Card.Text>
                  <strong>Stock:</strong> {product.stock}
                </Card.Text>
                <div className="mt-auto">
                  <AddToCart product_id={product.productID} />
                  <Button variant="success" className="w-100 mt-2">
                    Buy Now
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    ) : (
      <p className="text-center">No products found.</p>
    )}
  </Container>
);
}

export default Product;
