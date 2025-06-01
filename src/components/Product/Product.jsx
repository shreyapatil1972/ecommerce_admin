import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAllproducts } from '../../API/Api';
import AddProduct from './AddProduct';


const Product = () => {
  const [products, setProducts] = useState([]);
  const [addProductModalShow, setAddProductModalShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getAllproducts();
      if (response.success && Array.isArray(response.products)) {
        setProducts(response.products);
      } else {
        setProducts([]);
        setError('Failed to fetch products');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container py-3">
      <Button
        style={{
          backgroundColor: '#C19A6B',
          color: '#0D0D0D',
          fontWeight: 'bold',
          borderRadius: '1rem'
        }}
        onClick={() => setAddProductModalShow(true)}
      >
        Add Product
      </Button>
      <hr />

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="light" />
        </div>
      ) : error ? (
        <div className="text-danger text-center my-3">{error}</div>
      ) : (
        <Row>
          {products.length > 0 ? (
            products.map((product) => (
              <Col md={3} className="mb-4" key={product.id}>
                <Card
                  style={{
                    cursor: 'pointer',
                    backgroundColor: '#1c1c1c',
                    border:"1px solid #C19A6B",
                    color: '#E0E0E0'
                  }}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <Card.Img
                    variant="top"
                    src={product.image}
                    height="200px"
                    style={{ objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>Price: ₹{product.price}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <div className="text-center w-100">No Products Found</div>
          )}
        </Row>
      )}

      <AddProduct
        show={addProductModalShow}
        onHide={() => setAddProductModalShow(false)}
        onProductAdded={fetchData}
      />
    </div>
  );
};

export default Product;
