import { loginSuccess } from './authSlice';

export const login = (username, password) => async (dispatch) => {
  const response = await fetch('https://easystoreapp-techlab.onrender.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) throw new Error('Credenciales inválidas');

  const data = await response.json();
  const user = { username: data.username, token: data.token };

  localStorage.setItem('token', data.token);
  dispatch(loginSuccess(user));
};
