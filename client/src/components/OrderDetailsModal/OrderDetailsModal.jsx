import { useState } from 'react';
import styles from './OrderDetailsModal.module.css';

export default function OrderDetailsModal({ order, onClose, onStatusChange }) {
  const [newStatus, setNewStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleChange = (e) => {
    setNewStatus(e.target.value);
    setSuccessMsg(null);
    setErrorMsg(null);
  };

  const handleSubmit = async () => {
    if (newStatus === order.status) return;

    setLoading(true);
    try {
      await onStatusChange(order.id, newStatus);
      setSuccessMsg('✅ Estado actualizado correctamente');
    } catch (err) {
      console.error(err);
      setErrorMsg('❌ Error al actualizar el estado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <h3>🧾 Detalles de Orden #{order.id}</h3>

        <p><strong>Total:</strong> ${order.costTotal?.toFixed(2)}</p>
        <p><strong>Estado actual:</strong> {order.status}</p>

        <div className={styles.selectGroup}>
          <label htmlFor="statusSelect">Cambiar estado:</label>
          <select
            id="statusSelect"
            value={newStatus}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="CREATED">Creada</option>
            <option value="CONFIRMED">Confirmada</option>
            <option value="CANCELLED">Cancelada</option>
          </select>
        </div>

        {successMsg && <p className={styles.success}>{successMsg}</p>}
        {errorMsg && <p className={styles.error}>{errorMsg}</p>}

        <h4>📦 Productos</h4>
        <ul className={styles.itemsList}>
          {order.items?.length > 0 ? (
            order.items.map((item, i) => (
              <li key={i}>
  <strong>Producto ID:</strong> {item.id ?? 'N/A'} &nbsp;|&nbsp; <strong>Cantidad:</strong> {item.quantity}
              </li>
            ))
          ) : (
            <li>No hay productos en esta orden.</li>
          )}
        </ul>

        <div className={styles.btnGroup}>
          <button
            className={styles.confirmBtn}
            onClick={handleSubmit}
            disabled={loading || newStatus === order.status}
          >
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
          <button
            className={styles.cancelBtn}
            onClick={onClose}
            disabled={loading}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
