import React, { useState, useEffect } from "react";
import {
  Table,Badge,
  Button,
  InputGroup,
  FormControl,
  Card,
  OverlayTrigger,
  Tooltip,
  Alert,
  Image,
} from "react-bootstrap";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { getAllCategories } from "../../API/Api";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [alert, setAlert] = useState({ show: false, variant: "", message: "" });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const filtered = categories.filter((cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchTerm, categories]);

  const fetchCategories = async () => {
    const response = await getAllCategories();
    if (response.success) {
      setCategories(response.categories);
      setFilteredCategories(response.categories);
    }
  };

  const showAlert = (variant, message) => {
    setAlert({ show: true, variant, message });
    setTimeout(() => setAlert({ show: false, variant: "", message: "" }), 3000);
  };

  const handleCategoryUpdated = (success, message) => {
    showAlert(success ? "success" : "danger", message);
    if (success) fetchCategories();
  };

  return (
    <>
      {alert.show && (
        <Alert variant={alert.variant} dismissible onClose={() => setAlert({ show: false })}>
          {alert.message}
        </Alert>
      )}

      <div className="container shadow p-3 rounded" style={{ backgroundColor: "#1c1c1c", color: "#E0E0E0" }}>
        <Card className="p-4 mb-4" style={{ backgroundColor: "#2c2c2c", borderRadius: "1rem" }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 style={{ color: "#C19A6B" }}>Categories</h2>
            <Button
              style={{ backgroundColor: "#C19A6B", color: "#0D0D0D", fontWeight: "bold", border: "none", borderRadius: "1rem" }}
              onClick={() => setShowAddModal(true)}
            >
              Add Category
            </Button>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="text-white">
              Total Categories{" "}
              <Badge bg="light" text="dark">
                {filteredCategories.length}
              </Badge>
            </h6>

            <InputGroup className="w-50">
              <InputGroup.Text style={{ backgroundColor: "#C19A6B" }}>
                <FaSearch />
              </InputGroup.Text>
              <FormControl
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </div>

          <Table responsive bordered hover variant="dark" className="align-middle text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Category Name</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category, index) => (
                  <tr key={category.id}>
                    <td>{index + 1}</td>
                    <td>{category.name}</td>
                    <td>
                      {category.image ? (
                        <Image
                          src={category.image}
                          alt={category.name}
                          width="100"
                          height="80"
                          className="rounded border"
                        />
                      ) : (
                        <span className="text-muted">No Image</span>
                      )}
                    </td>
                    <td>
                      <OverlayTrigger overlay={<Tooltip>Edit Category</Tooltip>}>
                        <Button
                          size="sm"
                          variant="warning"
                          className="me-2"
                          onClick={() => {
                            setSelectedCategory(category);
                            setShowEditModal(true);
                          }}
                        >
                          <FaEdit />
                        </Button>
                      </OverlayTrigger>

                      <OverlayTrigger overlay={<Tooltip>Delete Category</Tooltip>}>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => {
                            setSelectedCategoryId(category.id);
                            setShowDeleteModal(true);
                          }}
                        >
                          <FaTrash />
                        </Button>
                      </OverlayTrigger>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-muted">
                    No categories available.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card>
      </div>

      {/* Modals */}
      <AddCategory
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onCategoryAdded={() => {
          fetchCategories();
          showAlert("success", "Category added successfully!");
        }}
      />

      <EditCategory
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        category={selectedCategory}
        onCategoryUpdated={handleCategoryUpdated}
      />

      <DeleteCategory
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        CategoryId={selectedCategoryId}
        onCategoryDelete={(success, message) => {
          handleCategoryUpdated(success, message);
        }}
      />
    </>
  );
};

export default Category;
