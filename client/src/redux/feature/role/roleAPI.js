// src/features/role/roleAPI.js

const API_URL = 'https://easystoreapp-techlab.onrender.com/api/roles';

export async function fetchAllRoles() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error fetching roles');
  return res.json();
}

export async function createRole(role, token) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(role),
  });
  if (!res.ok) throw new Error('Error creating role');
  return res.json();
}

export async function updateRole(id, role, token) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(role),
  });
  if (!res.ok) throw new Error('Error updating role');
  return res.json();
}

export async function deleteRole(id, token) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Error deleting role');
  return true;
}
