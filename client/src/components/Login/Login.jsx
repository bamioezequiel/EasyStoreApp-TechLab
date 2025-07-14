import { useDispatch } from 'react-redux';
import { login } from '../../redux/feature/auth/authAPI';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './Login.module.css';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      Swal.fire('Error', 'Por favor completa todos los campos', 'error');
      return;
    }

    setLoading(true);

    try {
      await dispatch(login(username, password));
      Swal.fire('Éxito', 'Login correcto', 'success').then(() => {
        navigate('/dashboard');
      });
    } catch (err) {
      Swal.fire('Error', 'Credenciales incorrectas', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className={styles.overlay}>
          <div className={styles.loaderContainer}>
            <div className={styles.spinner}></div>
            <p className={styles.fadeText}>Iniciando sesión...</p>
          </div>
        </div>
      )}

      <div className={styles.loginContainer}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Iniciar Sesión</h2>

          <label htmlFor="username">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            placeholder="admin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">Contraseña</label>
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className={styles.toggleBtn}
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Mostrar/Ocultar contraseña"
              tabIndex={-1}
            >
              {showPassword ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
            </button>
          </div>

          <button type="submit" className={styles.btnLogin}>Ingresar</button>
        </form>
      </div>
    </>
  );
}
