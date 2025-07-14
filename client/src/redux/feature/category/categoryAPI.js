// src/features/category/categoryAPI.js

const API_URL = 'https://easystoreapp-techlab.onrender.com/api/categories';

export async function fetchAllCategories(token) {
  const res = await fetch(API_URL, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Error fetching categories');
  return res.json();
}

export async function createCategory(category, token) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  });
  if (!res.ok) throw new Error('Error creating category');
  return res.json();
}

export async function updateCategory(id, category, token) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  });
  if (!res.ok) throw new Error('Error updating category');
  return res.json();
}

export async function deleteCategory(id, token) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Error deleting category');
  return true;
}
