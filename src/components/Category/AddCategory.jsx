import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createCategory } from '../../API/Api';

function AddCategory({ onHide, onCategoryAdded, ...props }) {
  const [CategoryName, setCategoryName] = useState('');
  const [CategoryImage, setCategoryImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewCategory = async () => {
    if (!CategoryName.trim() || !CategoryImage) {
      alert('Please provide both Category name and image.');
      return;
    }

    const formData = new FormData();
    formData.append('name', CategoryName.trim());
    formData.append('image', CategoryImage);

    setIsSubmitting(true);
    try {
      const response = await createCategory(formData);

      if (response?.success) {
        onCategoryAdded?.(); // Call only if passed
        onHide?.();       // Close modal
        setCategoryName('');
        setCategoryImage(null);
      } else {
        alert(response?.message || 'Failed to add Category');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while adding the Category.');
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
      <Modal.Header
        closeButton
        className="border-0"
        style={{ backgroundColor: '#0D0D0D', color: '#C19A6B' }}
      >
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Category
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ backgroundColor: '#0D0D0D', color: '#E0E0E0' }}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control elegant-input"
            placeholder="Enter Category name"
            value={CategoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="file"
            className="form-control elegant-input"
            onChange={(e) => setCategoryImage(e.target.files[0])}
            accept="image/*"
          />
        </div>
      </Modal.Body>

      <Modal.Footer className="border-0" style={{ backgroundColor: '#0D0D0D' }}>
        <Button
          variant="light"
          style={{
            backgroundColor: '#C19A6B',
            border: 'none',
            color: '#0D0D0D',
            fontWeight: 'bold',
            padding: '0.5rem 1.5rem',
            borderRadius: '2rem',
          }}
          onClick={handleNewCategory}
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

export default AddCategory;
