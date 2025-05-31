// src/routes/dashboardRoutes.js
import { Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Brand from '../components/brand/brand';
import Category from '../components/Category/Category';
import Product from '../components/Product/Product';

const DashboardRoutes = [
  <Route index element={<Dashboard />} key="dashboard" />,
  <Route path="profile" element={<Profile />} key="profile" />,
  <Route path="brand" element={<Brand />} key="brand" />,
  <Route path="category" element={<Category />} key="category" />,
  <Route path='product' element={<Product/>} key="product"/>
];

export default DashboardRoutes;
