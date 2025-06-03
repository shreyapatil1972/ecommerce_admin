import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getproductByID, deleteproduct } from '../../API/Api';
import { Button, Card, Row, Col } from 'react-bootstrap';
import { BsArrowLeft } from "react-icons/bs";
import EditProduct from './EditProduct';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    const response = await getproductByID(id);
    if (response.success) {
      setProduct(response.product);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this product?');
    if (confirm) {
      const response = await deleteproduct(id);
      if (response.success) {
        alert('Product deleted successfully!');
        navigate('/products');
      } else {
        alert(response.message || 'Failed to delete product.');
      }
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!product) return <p className="text-light text-center mt-4">Loading product details...</p>;

  return (
    <div className="container mt-4">
      <Button
        variant="light"
        className="mb-3"
        onClick={() => navigate('/product')}
      >
        <BsArrowLeft size={20} /> Back
      </Button>

      <Card className="p-4 shadow" style={{ backgroundColor: '#1c1c1c', color: '#E0E0E0' }}>
        <Row>
          <Col md={4}>
            <Card.Img
              src={product.image}
              alt={product.name}
              className="rounded shadow"
              style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
            />
          </Col>
          <Col md={8}>
            <h3>{product.name}</h3>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Price:</strong> ₹{product.price}</p>
            <p><strong>Quantity:</strong> {product.Quantity}</p>
            <p><strong>In Stock:</strong> {product.Instock ? 'Yes' : 'No'}</p>
            <p><strong>Category:</strong> {product.Category_id || 'N/A'}</p>
            <p><strong>Brand:</strong> {product.Brand_id || 'N/A'}</p>

            <div className="d-flex gap-3 mt-3">
              <Button
                variant="warning"
                onClick={() => navigate(`/edit-product/${id}`)}
              >
                Edit
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ProductDetails;
