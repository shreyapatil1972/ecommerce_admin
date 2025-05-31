import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteBrand } from '../../API/Api';

function DeleteBrand({ show, onHide, brandId, onBrandDelete }) {
  const handleDeleteBrand = async () => {
    const response = await deleteBrand(brandId);
    if (response.success) {
      onBrandDelete(true, 'Brand deleted successfully!');
    } else {
      onBrandDelete(false, response.message || 'Failed to delete brand');
    }
    onHide(); // Close modal in both cases
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton style={{ backgroundColor: '#0D0D0D', color: '#E0E0E0' }}>
        <Modal.Title>Delete Brand</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#1c1c1c', color: '#E0E0E0' }}>
        Are you sure you want to delete this brand? This action cannot be undone.
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: '#0D0D0D' }}>
        <Button
          style={{ backgroundColor: '#C19A6B', color: '#0D0D0D', border: 'none' }}
          onClick={handleDeleteBrand}
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

export default DeleteBrand;
