import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addNewBrand } from '../../API/Api';

function AddBrand({ onHide, onBrandAdded, ...props }) {
  const [brandName, setBrandName] = useState('');
  const [brandImage, setBrandImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewBrand = async () => {
    if (!brandName.trim() || !brandImage) {
      alert('Please provide both brand name and image.');
      return;
    }

    const formData = new FormData();
    formData.append('name', brandName.trim());
    formData.append('image', brandImage);

    setIsSubmitting(true);
    try {
      const response = await addNewBrand(formData);

      if (response?.success) {
        onBrandAdded?.(); // Call only if passed
        onHide?.();       // Close modal
        setBrandName('');
        setBrandImage(null);
      } else {
        alert(response?.message || 'Failed to add brand');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while adding the brand.');
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
          Add New Brand
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ backgroundColor: '#0D0D0D', color: '#E0E0E0' }}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control elegant-input"
            placeholder="Enter brand name"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="file"
            className="form-control elegant-input"
            onChange={(e) => setBrandImage(e.target.files[0])}
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
          onClick={handleNewBrand}
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

export default AddBrand;
