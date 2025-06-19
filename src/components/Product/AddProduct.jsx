import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getAllCategories, getAllBrands, createproduct } from '../../API/Api';

function AddProduct({ onHide, onProductAdded, ...props }) {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    Category_id: '',
    Brand_id: '',
    Quantity: '',
    Instock: true,
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const catRes = await getAllCategories();
      const brandRes = await getAllBrands();
      if (catRes.success) setCategories(catRes.categories);
      if (brandRes.success) setBrands(brandRes.brands);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setProduct((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setProduct((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const { name, description, price, Category_id, Brand_id, Quantity, image } = product;

    if (!name || !description || !price || !Category_id || !Brand_id || !Quantity || !image) {
      alert('Please fill all fields and upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', parseFloat(price));
    formData.append('Category_id', parseInt(Category_id));
    formData.append('Brand_id', parseInt(Brand_id));
    formData.append('Quantity', parseInt(Quantity));
    formData.append('Instock', product.Instock ? 'true' : 'false');
    formData.append('image', image);

    setIsSubmitting(true);
    try {
      const response = await createproduct(formData);
      if (response.success) {
        onProductAdded?.();
        onHide?.();
        setProduct({
          name: '',
          description: '',
          price: '',
          Category_id: '',
          Brand_id: '',
          Quantity: '',
          Instock: true,
          image: null,
        });
      } else {
        alert(response.message || 'Failed to add product.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while adding the product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      contentClassName="custom-modal"
    >
      <Modal.Header closeButton style={{ backgroundColor: '#0D0D0D', color: '#C19A6B' }}>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Product
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ backgroundColor: '#0D0D0D', color: '#E0E0E0' }}>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              placeholder="Enter product name"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="elegant-input"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Enter description"
              name="description"
              value={product.description}
              onChange={handleChange}
              className="elegant-input"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              placeholder="Enter price"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="elegant-input"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Select
              name="Category_id"
              value={product.Category_id}
              onChange={handleChange}
              className="elegant-input"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Select
              name="Brand_id"
              value={product.Brand_id}
              onChange={handleChange}
              className="elegant-input"
            >
              <option value="">Select Brand</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>{brand.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              placeholder="Enter quantity"
              name="Quantity"
              value={product.Quantity}
              onChange={handleChange}
              className="elegant-input"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              label="In Stock"
              name="Instock"
              checked={product.Instock}
              onChange={handleChange}
              style={{ fontWeight: 'bold' }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="file"
              name="image"
              onChange={handleChange}
              className="elegant-input"
              accept="image/*"
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer style={{ backgroundColor: '#0D0D0D' }}>
        <Button
          style={{
            backgroundColor: '#C19A6B',
            border: 'none',
            color: '#0D0D0D',
            fontWeight: 'bold',
            padding: '0.5rem 1.5rem',
            borderRadius: '2rem',
          }}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create'}
        </Button>

        <Button
          variant="secondary"
          style={{
            backgroundColor: 'transparent',
            border: '1px solid #E0E0E0',
            color: '#E0E0E0',
            padding: '0.5rem 1.5rem',
            borderRadius: '2rem',
          }}
          onClick={onHide}
          disabled={isSubmitting}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddProduct;
