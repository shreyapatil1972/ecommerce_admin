import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getproductByID,
  getAllCategories,
  getAllBrands,
} from "../../API/Api";
import { Button, Card, Row, Col } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import DeleteProduct from "./DeleteProduct";
import EditProduct from "./EditProduct";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [product, setProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // ✅ Modal visibility
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchProduct = async () => {
    const response = await getproductByID(id);
    if (response.success) {
      setProduct(response.product);
    }
  };

  const handleProductDelete = (success, message) => {
    alert(message);
    if (success) {
      navigate("/product ");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchProduct();
      const categoryResponse = await getAllCategories();
      const brandResponse = await getAllBrands();
      if (categoryResponse.success) setCategories(categoryResponse.categories);
      if (brandResponse.success) setBrands(brandResponse.brands);
    };
    fetchData();
  }, []);

  const getCategoryName = (id) => {
    const category = categories.find((cat) => cat.id === id);
    return category ? category.name : "N/A";
  };

  const getBrandName = (id) => {
    const brand = brands.find((br) => br.id === id);
    return brand ? brand.name : "N/A";
  };

  if (!product)
    return (
      <p className="text-light text-center mt-4">Loading product details...</p>
    );

  return (
    <div className="container mt-4">
      <Button
        variant="light"
        className="mb-3"
        onClick={() => navigate("/product")}
      >
        <BsArrowLeft size={20} /> Back
      </Button>

      <Card
        className="p-4 shadow"
        style={{ backgroundColor: "#1c1c1c", color: "#E0E0E0" }}
      >
        <Row>
          <Col md={4}>
            <Card.Img
              src={product.image}
              alt={product.name}
              className="rounded shadow"
              style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
            />
          </Col>
          <Col md={8}>
            <h3>{product.name}</h3>
            <p>
              <strong>Description:</strong> {product.description}
            </p>
            <p>
              <strong>Price:</strong> ₹{product.price}
            </p>
            <p>
              <strong>Quantity:</strong> {product.Quantity}
            </p>
            <p>
              <strong>In Stock:</strong> {product.Instock ? "Yes" : "No"}
            </p>
            <p>
              <strong>Category:</strong> {getCategoryName(product.Category_id)}
            </p>
            <p>
              <strong>Brand:</strong> {getBrandName(product.Brand_id)}
            </p>

            <div className="d-flex gap-3 mt-3">
              <Button variant="warning" onClick={() => setShowEditModal(true)}>
                Edit
              </Button>

              <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
                Delete
              </Button>
            </div>
          </Col>
        </Row>
      </Card>

      {/* ✅ DeleteProduct Modal */}
      <EditProduct
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        product={product}
        categories={categories}
        brands={brands}
        onProductUpdated={(success, message) => {
          alert(message);
          if (success) {
            fetchProduct(); // Refresh product details
          }
        }}
      />

      <DeleteProduct
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        productId={id}
        onProductDelete={handleProductDelete}
      />
    </div>
  );
};

export default ProductDetails;
