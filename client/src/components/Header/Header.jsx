import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/feature/auth/authSlice';
import img from './../../img/icon-logo.png';
import style from './Header.module.css';
import { useCart } from '../../context/CartContext';

export default function Header() {
  const { itemCount } = useCart();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
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
              <li className={style.itemMenu}>
                <button onClick={handleLogout} className={style.logoutBtn}>
                  Cerrar sesión
                </button>
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
