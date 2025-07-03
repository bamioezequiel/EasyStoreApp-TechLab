import { useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import styles from './Login.module.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Nuevo estado
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire('Error', 'Por favor completa todos los campos', 'error');
      return;
    }

    setLoading(true); // Muestra el overlay

    setTimeout(() => {
      const success = onLogin({ email, password });

      setLoading(false); // Oculta el overlay

      if (success) {
        Swal.fire('Éxito', 'Login correcto', 'success').then(() => {
          navigate('/dashboard');
        });
      } else {
        Swal.fire('Error', 'Credenciales incorrectas', 'error');
      }
    }, 1000); // Simula la espera
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

          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            placeholder="tucorreo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
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
