import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllOrders,
  changeOrderStatusThunk,
} from '../../redux/feature/orders/ordersSlice'; 
import styles from './OrderTable.module.css';
import OrderDetailsModal from '../OrderDetailsModal/OrderDetailsModal';

export default function OrderTable() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(state => state.orders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const token = localStorage.getItem('token'); // o donde guardes el token

  useEffect(() => {
    if (token) {
      dispatch(getAllOrders(token));
    }
  }, [dispatch, token]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await dispatch(changeOrderStatusThunk({ orderId: id, newStatus, token })).unwrap();
      setSelectedOrder(null);
    } catch (err) {
      alert('Error al actualizar el estado');
    }
  };

  if (loading) return <p>Cargando órdenes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <h2>📑 Lista de Órdenes</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Ítems</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>${order.costTotal?.toFixed(2) || '0.00'}</td>
              <td>{order.status}</td>
              <td>{order.items?.length || 0}</td>
              <td>
                <button
                  className={styles.viewBtn}
                  onClick={() => setSelectedOrder(order)}
                >
                  Ver Detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
