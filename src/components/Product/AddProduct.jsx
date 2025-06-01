import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getAllCategories, getAllBrands, createproduct } from '../../API/Api';

const AddProduct = ({ show, onHide, onProductAdded }) => {
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

  useEffect(() => {
    const fetchData = async () => {
      const categoryResponse = await getAllCategories();
      const brandResponse = await getAllBrands();
      if (categoryResponse.success) setCategories(categoryResponse.categories);
      if (brandResponse.success) setBrands(brandResponse.brands);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setProduct({ ...product, [name]: checked });
    } else if (type === 'file') {
      setProduct({ ...product, [name]: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async () => {
    if (
      !product.name ||
      !product.description ||
      !product.price ||
      !product.Category_id ||
      !product.Brand_id ||
      !product.Quantity ||
      !product.image
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', parseFloat(product.price));
    formData.append('Category_id', parseInt(product.Category_id));
    formData.append('Brand_id', parseInt(product.Brand_id));
    formData.append('Quantity', parseInt(product.Quantity));
    formData.append('Instock', product.Instock ? 'true' : 'false');
    formData.append('image', product.image);

    const response = await createproduct(formData);

    if (response.success) {
      onProductAdded();
      onHide();
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
      alert('Failed to add product: ' + (response.message || 'Unknown error'));
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton style={{ backgroundColor: '#0D0D0D', color: '#E0E0E0' }}>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#1c1c1c', color: '#E0E0E0' }}>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" value={product.name} onChange={handleChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control name="description" value={product.description} onChange={handleChange} as="textarea" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control name="price" value={product.price} onChange={handleChange} type="number" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Select name="Category_id" value={product.Category_id} onChange={handleChange}>
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Brand</Form.Label>
            <Form.Select name="Brand_id" value={product.Brand_id} onChange={handleChange}>
              <option value="">Select brand</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>{brand.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Quantity</Form.Label>
            <Form.Control name="Quantity" value={product.Quantity} onChange={handleChange} type="number" />
          </Form.Group>

          <Form.Group>
            <Form.Check
              type="checkbox"
              label="In Stock"
              name="Instock"
              checked={product.Instock}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" name="image" onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: '#0D0D0D' }}>
        <Button
          style={{ backgroundColor: '#C19A6B', color: '#0D0D0D', border: 'none' }}
          onClick={handleSubmit}
        >
          Save
        </Button>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProduct;
