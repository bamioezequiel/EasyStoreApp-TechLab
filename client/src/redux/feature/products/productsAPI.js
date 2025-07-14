const API_URL = 'https://easystoreapp-techlab.onrender.com/api/products';

export async function fetchAllProducts() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error fetching products');
  return res.json();
}

export async function createProduct(product) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error('Error creating product');
  return res.json();
}

export async function updateProduct(id, product) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error('Error updating product');
  return res.json();
}

export async function deleteProduct(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error deleting product');
  return true;
}
