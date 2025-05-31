import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteCategory } from '../../API/Api';

function DeleteCategory({ show, onHide, CategoryId, onCategoryDelete }) {
  const handleDeleteCategory = async () => {
    const response = await deleteCategory(CategoryId);
    if (response.success) {
      onCategoryDelete(true, 'Category deleted successfully!');
    } else {
      onCategoryDelete(false, response.message || 'Failed to delete Category');
    }
    onHide(); // Close modal in both cases
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton style={{ backgroundColor: '#0D0D0D', color: '#E0E0E0' }}>
        <Modal.Title>Delete Category</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#1c1c1c', color: '#E0E0E0' }}>
        Are you sure you want to delete this Category? This action cannot be undone.
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: '#0D0D0D' }}>
        <Button
          style={{ backgroundColor: '#C19A6B', color: '#0D0D0D', border: 'none' }}
          onClick={handleDeleteCategory}
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

export default DeleteCategory;
