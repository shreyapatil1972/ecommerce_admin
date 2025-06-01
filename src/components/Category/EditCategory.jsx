import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Image } from "react-bootstrap";
import { updateCategory } from "../../API/Api";

function EditCategory({ show, onHide, category, onCategoryUpdated }) {
  const [categoryName, setCategoryName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (category) {
      setCategoryName(category.name);
      setImageFile(null); // Reset image file input
      setPreviewImage(category.image); // Load existing image URL
    }
  }, [category]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", categoryName.trim());

    if (imageFile) {
      formData.append("categoryimage", imageFile); // Adjust key to match your backend field
    }

    const response = await updateCategory(category.id, formData);

    if (response.success) {
      onCategoryUpdated(true, "Category updated successfully!");
      onHide();
    } else {
      onCategoryUpdated(false, response.message || "Failed to update category.");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
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
              alt="Category preview"
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

export default EditCategory;
