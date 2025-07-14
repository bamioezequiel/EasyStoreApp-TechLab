import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/feature/auth/authSlice';
import { getAllOrders } from '../../redux/feature/orders/ordersSlice'; 

import styles from './Dashboard.module.css';
import { FaLinkedin, FaGlobe, FaCheckCircle, FaDollarSign, FaArrowLeft } from 'react-icons/fa';

import ProductTable from '../ProductTable/ProductTable';
import CategoryTable from '../CategoryTable/CategoryTable';
import OrderTable from '../OrderTable/OrderTable';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, loading: ordersLoading, error: ordersError } = useSelector(state => state.orders);

  useEffect(() => {
    if (orders.length === 0 && !ordersLoading) {
      dispatch(getAllOrders());
    }
  }, [dispatch, orders.length, ordersLoading]);

  const confirmedOrders = orders.filter(order => order.status === 'CONFIRMED');
  const totalVendido = confirmedOrders.reduce((acc, order) => acc + (order.costTotal || 0), 0);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      dispatch(logout());
      navigate('/login');
    }, 800);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <>
      {isLoggingOut && (
        <div className={styles.fadeOverlay}>
          <div className={styles.loaderContainer}>
            <div className={styles.spinner}></div>
            <p className={styles.fadeText}>Cerrando sesión...</p>
          </div>
        </div>
      )}

      <div className={styles.dashboardContainer}>
        <aside className={styles.sidebar}>
          <h2 className={styles.logo}>MiApp</h2>

          <ul className={styles.menu}>
            <li
              className={`${styles.menuItem} ${activeSection === 'inicio' ? styles.active : ''}`}
              onClick={() => setActiveSection('inicio')}
            >
              Inicio
            </li>
            <li
              className={`${styles.menuItem} ${activeSection === 'productos' ? styles.active : ''}`}
              onClick={() => setActiveSection('productos')}
            >
              Productos
            </li>
            <li
              className={`${styles.menuItem} ${activeSection === 'usuarios' ? styles.active : ''}`}
              onClick={() => setActiveSection('usuarios')}
            >
              Categorias
            </li>
            <li
              className={`${styles.menuItem} ${activeSection === 'reportes' ? styles.active : ''}`}
              onClick={() => setActiveSection('reportes')}
            >
              Pedidos
            </li>
            <li className={styles.menuItem} onClick={handleLogout} style={{ cursor: 'pointer' }}>
              Cerrar sesión
            </li>
          </ul>

          <div className={styles.footerInfo}>
            <p>Aplicación desarrollada por <strong>Ezequiel Bamio</strong></p>
            <div className={styles.socialLinks}>
              <a href="https://bamio.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="Portfolio">
                <FaGlobe />
              </a>
              <a href="https://www.linkedin.com/in/ezequielbamio/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </aside>

        <main className={styles.mainContent}>
          {/* Botón Volver a Inicio */}
          <button className={styles.backButton} onClick={handleGoHome}>
            <FaArrowLeft style={{ marginRight: '0.5rem' }} />
            Volver
          </button>

          {activeSection === 'inicio' && (
            <>
              <h1>Bienvenido al Dashboard</h1>
              <p>Aquí puedes gestionar productos, usuarios, y más.</p>

              <div className={styles.statsContainer}>
                {ordersLoading && <p>Cargando órdenes...</p>}
                {ordersError && <p>Error cargando órdenes: {ordersError}</p>}
                {!ordersLoading && !ordersError && (
                  confirmedOrders.length > 0 ? (
                    <>
                      <div className={styles.statCard}>
                        <FaCheckCircle className={styles.statIcon} />
                        <div>
                          <p className={styles.statTitle}>Pedidos Confirmados</p>
                          <p className={styles.statValue}>{confirmedOrders.length}</p>
                        </div>
                      </div>

                      <div className={styles.statCard}>
                        <FaDollarSign className={styles.statIcon} />
                        <div>
                          <p className={styles.statTitle}>Total Vendido</p>
                          <p className={styles.statValue}>${totalVendido.toFixed(2)}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p>No hay pedidos confirmados para mostrar.</p>
                  )
                )}
              </div>
            </>
          )}

          {activeSection === 'productos' && <ProductTable />}
          {activeSection === 'usuarios' && <CategoryTable />}
          {activeSection === 'reportes' && <OrderTable />}
        </main>
      </div>
    </>
  );
}
