import React from 'react';
import Sidebar from '../ProjectedRoute/SideBar';
import logo from '../assets/logo.png'
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
     <header style={{"height":"120px","backgroundColor":"   black"}}>
      <img src={logo} height={120} width={330}></img><span> </span>
    </header>
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#0D0D0D',
      color: '#E0E0E0',
    }}>
      <Sidebar />
      <div
        style={{
          flex: 1,
          padding: '2rem',
          backgroundColor: '#1A1A1A',
          borderLeft: '1px solid #C19A6B',
          boxShadow: 'inset 0 0 10px rgba(193, 154, 107, 0.2)',
        }}
      >
        <Outlet />
      </div>
    </div>
    </>
  );
};

export default Layout;
