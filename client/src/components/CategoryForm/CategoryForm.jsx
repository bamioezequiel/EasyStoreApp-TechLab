import { useState, useEffect } from 'react';
import styles from './CategoryForm.module.css';

export default function CategoryForm({ onSuccess, initialData = {}, onCancel }) {
  const [name, setName] = useState(initialData.name || '');
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSuccess({ name });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.form} ${animate ? styles.animateIn : ''}`}>
      <h3>{initialData.id ? '✏️ Editar Categoría' : '➕ Nueva Categoría'}</h3>

      <input
        type="text"
        placeholder="Nombre de la categoría"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} disabled={loading}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
