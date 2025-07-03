import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import { FaLinkedin, FaGlobe } from 'react-icons/fa';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      logout();
      navigate('/login');
    }, 800);
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
            <li className={`${styles.menuItem} ${activeSection === 'inicio' ? styles.active : ''}`} onClick={() => setActiveSection('inicio')}>
              Inicio
            </li>
            <li className={`${styles.menuItem} ${activeSection === 'productos' ? styles.active : ''}`} onClick={() => setActiveSection('productos')}>
              Productos
            </li>
            <li className={`${styles.menuItem} ${activeSection === 'usuarios' ? styles.active : ''}`} onClick={() => setActiveSection('usuarios')}>
              Usuarios
            </li>
            <li className={`${styles.menuItem} ${activeSection === 'reportes' ? styles.active : ''}`} onClick={() => setActiveSection('reportes')}>
              Reportes
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
          {activeSection === 'inicio' && (
            <>
              <h1>Bienvenido al Dashboard</h1>
              <p>Aquí puedes gestionar productos, usuarios, y más.</p>
            </>
          )}
          {activeSection === 'productos' && <p>Gestión de productos - aquí iría tu tabla o formulario.</p>}
          {activeSection === 'usuarios' && <p>Gestión de usuarios - listado, roles, permisos, etc.</p>}
          {activeSection === 'reportes' && <p>Reportes y estadísticas.</p>}
        </main>
      </div>
    </>
  );
}
