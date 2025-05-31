import React, { useState, useEffect } from 'react';
import { Table, Badge } from 'react-bootstrap';
import { getAllBrands } from '../../API/Api';
import AddBrand from './AddBrand';
import DeleteBrand from './DeleteBrand';

const Brand = () => {
  const [brands, setBrands] = useState([]);
  const [addBrandModalShow, setAddBrandModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [alert, setAlert] = useState({ show: false, variant: '', message: '' });

  const fetchData = async () => {
    const response = await getAllBrands();
    if (response.success) {
      setBrands(response.brands);
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
          onClick={() => setAddBrandModalShow(true)}
        >
          Add Brand
        </button>
        <hr />
        <div className="d-flex justify-content-between p-3">
          <p style={{ color: '#E0E0E0' }}>
            Brands <Badge bg="secondary">{brands.length}</Badge>
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
              <th>Brand Name</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {brands.length > 0 ? (
              brands.map((brand, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{brand.name}</td>
                  <td>
                    <img src={brand.image} alt={brand.name} width="50" className="rounded shadow" />
                  </td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2">Edit</button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => {
                        setSelectedBrandId(brand.id);
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
                  No brands available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Modals */}
      <AddBrand show={addBrandModalShow} onHide={() => setAddBrandModalShow(false)} onBrandAdded={fetchData} />

      <DeleteBrand
        show={deleteModalShow}
        onHide={() => setDeleteModalShow(false)}
        brandId={selectedBrandId}
        onBrandDelete={() => {
          fetchData();
          showAlert('success', 'Brand deleted successfully!');
        }}
      />
    </>
  );
};

export default Brand;
