const API_URL = 'https://easystoreapp-techlab.onrender.com/api/products';

export async function fetchAllProducts() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error fetching products');
  return res.json();
}

export async function createProduct(product, token) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // agrego token
    },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error('Error creating product');
  return res.json();
}

export async function updateProduct(id, product, token) {
  console.log('PUT', `${API_URL}/${id}`, 'Body:', product);

  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // agrego token
    },
    body: JSON.stringify(product),
    
  });
  if (!res.ok) {
  const errorText = await res.text();
  console.error('Error response:', errorText);
  throw new Error('Error updating product');
  }
  return res.json();
}

export async function deleteProduct(id, token) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`, // agrego token
    },
  });
  if (!res.ok) throw new Error('Error deleting product');
  return true;
}
