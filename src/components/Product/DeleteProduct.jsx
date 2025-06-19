import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteproduct } from '../../API/Api';

function DeleteProduct({ show, onHide, productId, onProductDelete }) {
  const handleDeleteProduct = async () => {
    const response = await deleteproduct(productId);
    if (response.success) {
      onProductDelete(true, 'Product deleted successfully!');
    } else {
      onProductDelete(false, response.message || 'Failed to delete product.');
    }
    onHide(); // Close modal after operation
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton style={{ backgroundColor: '#0D0D0D', color: '#E0E0E0' }}>
        <Modal.Title>Delete Product</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#1c1c1c', color: '#E0E0E0' }}>
        Are you sure you want to delete this product? This action cannot be undone.
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: '#0D0D0D' }}>
        <Button
          style={{ backgroundColor: '#C19A6B', color: '#0D0D0D', border: 'none' }}
          onClick={handleDeleteProduct}
        >
          Delete
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteProduct;
