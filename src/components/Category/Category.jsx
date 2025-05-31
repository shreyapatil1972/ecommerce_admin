import React, { useState, useEffect } from 'react';
import { Table, Badge } from 'react-bootstrap';
import { getAllCategories } from '../../API/Api';
import AddCategory from './AddCategory';
import DeleteCategory from './DeleteCategory';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [addCategoryModalShow, setAddCategoryModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [alert, setAlert] = useState({ show: false, variant: '', message: '' });

  const fetchData = async () => {
    const response = await getAllCategories();
    if (response.success) {
      setCategories(response.categories);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showAlert = (variant, message) => {
    setAlert({ show: true, variant, message });
    setTimeout(() => {
      setAlert({ show: false, variant: '', message: '' });
    }, 3000);
  };

  return (
    <>
      {alert.show && (
        <div className={`alert alert-${alert.variant} alert-dismissible fade show`} role="alert">
          {alert.message}
          <button type="button" className="btn-close" onClick={() => setAlert({ show: false })}></button>
        </div>
      )}

      <div className="container p-3">
        <button
          className="btn"
          style={{ backgroundColor: '#C19A6B', color: '#0D0D0D', fontWeight: 'bold', borderRadius: '1rem' }}
          onClick={() => setAddCategoryModalShow(true)}
        >
          Add Category
        </button>
        <hr />
        <div className="d-flex justify-content-between p-3">
          <p style={{ color: '#E0E0E0' }}>
            Category <Badge bg="secondary">{categories.length}</Badge>
          </p>
          <p>
            <button className="btn btn-outline-light">Filter</button>
          </p>
        </div>
      </div>

      <div className="container shadow p-3 rounded" style={{ backgroundColor: '#1c1c1c', color: '#E0E0E0' }}>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Category Name</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td>
                    <img src={category.image} alt={category.name} width="50" className="rounded shadow" />
                  </td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2">Edit</button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => {
                        setSelectedCategoryId(category.id);
                        setDeleteModalShow(true);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No Category available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Modals */}
      <AddCategory show={addCategoryModalShow} onHide={() => setAddCategoryModalShow(false)} onCategoryAdded={fetchData} />

      <DeleteCategory
  show={deleteModalShow}
  onHide={() => setDeleteModalShow(false)}
  CategoryId={selectedCategoryId}
  onCategoryDelete={(success, message) => {
    if (success) {
      fetchData();
      showAlert('success', 'Category deleted successfully!');
    } else {
      showAlert('danger', 'error deleting category ');
    }
  }}
/>
    </>
  );
};

export default Category;
