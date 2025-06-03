import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Image } from "react-bootstrap";
import { updateproduct } from "../../API/Api"; // Ensure this API function exists

function EditProduct({ show, onHide, product, categories, brands, onProductUpdated }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    brand_id: "",
    quantity: "",
    inStock: true,
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        category_id: product.category_id || "",
        brand_id: product.brand_id || "",
        quantity: product.quantity || "",
        inStock: product.inStock || false,
      });
      setImageFile(null);
      setPreviewImage(product.image || null);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await updateproduct(product.id, formData);

    if (response.success) {
      onProductUpdated(true, "Product updated successfully!");
      onHide();
    } else {
      onProductUpdated(false, response.message || "Failed to update product.");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            rows={3}
            value={form.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select name="category_id" value={form.category_id} onChange={handleChange}>
            <option value="">Select Category</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Brand</Form.Label>
          <Form.Select name="brand_id" value={form.brand_id} onChange={handleChange}>
            <option value="">Select Brand</option>
            {brands?.map((brand) => (
              <option key={brand.id} value={brand.id}>{brand.name}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            name="inStock"
            label="In Stock"
            checked={form.inStock}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Change Image (optional)</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
        </Form.Group>

        {previewImage && (
          <div className="text-center mt-3">
            <p>Image Preview:</p>
            <Image src={previewImage} alt="Product preview" thumbnail style={{ maxHeight: "150px" }} />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleUpdate}>
          Update Product
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditProduct;
