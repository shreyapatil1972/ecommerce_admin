import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Image } from "react-bootstrap";
import { updateproduct, getAllCategories, getAllBrands } from "../../API/Api";

function EditProduct({ show, onHide, product, onProductUpdated }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [inStock, setInStock] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setQuantity(product.Quantity);
      setCategoryId(product.Category_id);
      setBrandId(product.Brand_id);
      setInStock(product.inStock);
      setPreviewImage(product.image);
      setImageFile(null); // Reset previous image
    }
  }, [product]);

  useEffect(() => {
    const fetchData = async () => {
      const categoriesRes = await getAllCategories();
      const brandsRes = await getAllBrands();
      setCategories(categoriesRes?.data || []);
      setBrands(brandsRes?.data || []);
    };
    fetchData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("description", description.trim());
    formData.append("price", price);
    formData.append("Quantity", quantity);
    formData.append("Category_id", categoryId);
    formData.append("Brand_id", brandId);
    formData.append("inStock", inStock);

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
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Product Name</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group className="mt-2">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>

        <Form.Group className="mt-2">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </Form.Group>

        <Form.Group className="mt-2">
          <Form.Label>Quantity</Form.Label>
          <Form.Control type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </Form.Group>

        <Form.Group className="mt-2">
          <Form.Label>Category</Form.Label>
          <Form.Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mt-2">
          <Form.Label>Brand</Form.Label>
          <Form.Select value={brandId} onChange={(e) => setBrandId(e.target.value)}>
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>{brand.name}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mt-2">
          <Form.Check
            type="checkbox"
            label="In Stock"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Change Image (optional)</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} accept="image/*" />
        </Form.Group>

        {previewImage && (
          <div className="mt-3 text-center">
            <p>Image Preview:</p>
            <Image src={previewImage} alt="Product preview" thumbnail style={{ maxHeight: "150px" }} />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleUpdate}>
          Update
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditProduct;
