const API_URL = 'https://easystoreapp-techlab.onrender.com/api/orders';

// Traer todas las órdenes
export async function fetchAllOrders() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al obtener las órdenes');
  return res.json();
}

// Traer una orden por ID
export async function fetchOrderById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Error al obtener la orden');
  return res.json();
}

// Crear nueva orden
export async function createOrder() {
  const res = await fetch(API_URL, {
    method: 'POST',
  });
  if (!res.ok) throw new Error('Error al crear la orden');
  return res.json();
}

// Agregar producto a una orden
export async function addProductToOrder(orderId, productId, quantity) {
  const res = await fetch(
    `${API_URL}/${orderId}/add-product?productId=${productId}&quantity=${quantity}`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }});
  if (!res.ok) throw new Error('Error al agregar producto a la orden');
  return res.json();
}

// Eliminar producto de una orden
export async function removeProductFromOrder(orderId, productId) {
  const res = await fetch(
    `${API_URL}/${orderId}/remove-product?productId=${productId}`,
    {
      method: 'DELETE',
    }
  );
  if (!res.ok) throw new Error('Error al eliminar producto de la orden');
  return res.json();
}

// Confirmar una orden
export async function confirmOrder(orderId) {
  const res = await fetch(`${API_URL}/${orderId}/confirm`, {
    method: 'PUT',
  });
  if (!res.ok) throw new Error('Error al confirmar la orden');
  return res.json();
}

// Cancelar una orden
export async function cancelOrder(orderId) {
  const res = await fetch(`${API_URL}/${orderId}/cancel`, {
    method: 'PUT',
  });
  if (!res.ok) throw new Error('Error al cancelar la orden');
  return res.json();
}

// Cambiar estado de una orden
export async function changeOrderStatus(orderId, newStatus) {
  const res = await fetch(`${API_URL}/${orderId}/status?newStatus=${newStatus}`, {
    method: 'PUT',
  });
  if (!res.ok) throw new Error('Error al cambiar estado de la orden');
  return res.json();
}
