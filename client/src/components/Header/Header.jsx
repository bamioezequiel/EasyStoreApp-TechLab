import { Link, useNavigate } from 'react-router-dom';
import img from './../../img/icon-logo.png';
import style from './Header.module.css';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const { itemCount } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={style.header}>
      <img src={img} alt="Logo" />
      <nav>
        <ul className={style.menu}>
          <li className={style.itemMenu}>
            <Link to="/#productos">Productos</Link>
          </li>
          <li className={style.itemMenu}>
            <Link to="/#reseñas">Reseñas</Link>
          </li>
          <li className={style.itemMenu}>
            <Link to="/carrito">
              Carrito (<span id="cart-counter-nav">{itemCount}</span>)
            </Link>
          </li>

          {isAuthenticated ? (
            <>
              <li className={style.itemMenu}>
                <Link to="/dashboard">Dashboard</Link>
              </li>             
            </>
          ) : (
            <li className={style.itemMenu}>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
