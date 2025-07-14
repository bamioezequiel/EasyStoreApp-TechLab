import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../redux/feature/orders/ordersSlice';
import styles from './OrderTable.module.css';

export default function OrderTable() {
  const dispatch = useDispatch();
  const { items: orders, status, error } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (status === 'loading') return <p>Cargando órdenes...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

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
              <td>${order.costTotal.toFixed(2)}</td>
              <td>{order.status}</td>
              <td>{order.items?.length || 0}</td>
              <td>
                {/* Podés reemplazar esto con un modal si querés ver los productos */}
                <button
                  className={styles.viewBtn}
                  onClick={() => console.log('Ver detalles de orden', order.id)}
                >
                  Ver Detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
