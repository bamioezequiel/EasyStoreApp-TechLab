import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import ProductSection from './components/ProductSection/ProductSection';
import ReviewsSection from './components/ReviewsSection/ReviewsSection';
import CartSection from './components/CartSection/CartSection';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';

import './App.module.css';

export default function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  const hideHeaderFooter = location.pathname === '/dashboard';

  return (
    <>
      {!hideHeaderFooter && <Header />}

      <Routes>
        <Route
          path="/"
          element={
            <main className="main-content">
              <Home />
              <ProductSection />
              <ReviewsSection />
            </main>
          }
        />

        <Route path="/carrito" element={<CartSection />} />

        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>

      {!hideHeaderFooter && <Footer />}
    </>
  );
}
