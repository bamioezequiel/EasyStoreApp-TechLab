// api.js

const API_BASE_URL = 'https://easystoreapp-techlab.onrender.com/api';

export async function loginTest(username, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
  
  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  // Guardar token en localStorage para usar en otras peticiones
  localStorage.setItem('token', data.token);
  return data;
}

export async function fetchProducts() {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No auth token found');

  const response = await fetch(`${API_BASE_URL}/products`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const products = await response.json();
  return products;
}
