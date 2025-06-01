import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Image } from "react-bootstrap";
import { updateBrand } from "../../API/Api";

function EditBrand({ show, onHide, brand, onBrandUpdated }) {
  const [brandName, setBrandName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (brand) {
      setBrandName(brand.name);
      setImageFile(null); // reset file input
      setPreviewImage(brand.image); // existing image URL from backend
    }
  }, [brand]);

  // When user selects new image file, create preview URL
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", brandName.trim());

    if (imageFile) {
      formData.append("brandimage", imageFile);
    }

    const response = await updateBrand(brand.id, formData);

    if (response.success) {
      onBrandUpdated(true, "Brand updated successfully");
      onHide();
    } else {
      onBrandUpdated(false, response.message || "Failed to update brand");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Brand</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Brand Name</Form.Label>
          <Form.Control
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Change Image (optional)</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} accept="image/*" />
        </Form.Group>

        {previewImage && (
          <div className="mt-3 text-center">
            <p>Image Preview:</p>
            <Image
              src={previewImage}
              alt="Brand preview"
              thumbnail
              style={{ maxHeight: "150px" }}
            />
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

export default EditBrand;