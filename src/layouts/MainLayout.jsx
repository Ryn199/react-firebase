import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { ThemeProvider } from '../context/ThemeContext';
import { useAuth } from '../context/authContext';

export default function MainLayout() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Jika pengguna belum login, arahkan ke halaman login
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  return (
    <>
      <ThemeProvider>
        <Navbar />
        <Outlet />
        <Footer />
      </ThemeProvider>
    </>
  );
}
