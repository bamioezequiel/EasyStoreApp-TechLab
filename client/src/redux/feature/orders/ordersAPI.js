// src/features/order/orderAPI.js

const API_URL = 'https://easystoreapp-techlab.onrender.com/api/orders';

export async function fetchAllOrders(token) {
  const res = await fetch(API_URL, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  });
  if (!res.ok) throw new Error('Error fetching orders');
  return res.json();
}

export async function createOrder(order, token) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(order),
  });
  if (!res.ok) throw new Error('Error creating order');
  return res.json();
}

export async function updateOrder(id, order, token) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(order),
  });
  if (!res.ok) throw new Error('Error updating order');
  return res.json();
}

export async function deleteOrder(id, token) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Error deleting order');
  return true;
}
