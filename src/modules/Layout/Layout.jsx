  import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavBar from '../NavBar/NavBar';

const Layout = () => {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
        <ToastContainer autoClose={1700} position="top-right" />
      </main>
    </>
  );
};
export default Layout;
