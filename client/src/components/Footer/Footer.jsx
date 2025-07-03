import { FaGithub, FaLinkedin } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";

import logo from "./../../img/icon-logo.png";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.logoSection}>
          <img src={logo} alt="EasyStore Logo" className={styles.logo} />
          <p className={styles.tagline}>Tu tienda online de confianza</p>
        </div>

        <nav className={styles.navSection}>
          <h4>Enlaces</h4>
          <ul>
            <li><a href="#productos">Productos</a></li>
            <li><a href="#reseñas">Reseñas</a></li>
            <li><a href="/carrito">Carrito</a></li>
          </ul>
        </nav>

        <div className={styles.socialSection}>
          <h4>Síguenos</h4>
          <div className={styles.socialIcons}>
            
            <a href="https://www.linkedin.com/in/ezequielbamio/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaLinkedin />
            </a>
            <a href="https://github.com/bamioezequiel" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaGithub />
            </a>
            <a href="https://bamio.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <TbWorld />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <small>© 2025 EasyStore. Todos los derechos reservados.</small>
      </div>
    </footer>
  );
}
