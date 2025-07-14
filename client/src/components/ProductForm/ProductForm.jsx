import { useState, useEffect } from 'react';
import styles from './ProductForm.module.css';

export default function ProductForm({ onSuccess, initialData = {}, onCancel, categories = [] }) {
  // Estados con inicialización condicional para edición o nuevo producto
  const [name, setName] = useState(initialData.name || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [imageUrl, setImageUrl] = useState(initialData.imageUrl || '');
  const [price, setPrice] = useState(initialData.price || '');
  const [stock, setStock] = useState(initialData.stock || '');
  const [categoryId, setCategoryId] = useState(initialData.category?.id?.toString() || ''); // mejor string para <select>
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Construcción del objeto para enviar, con id convertido a número
    const productData = {
      name,
      description,
      imageUrl,
      price: Number(price),
      stock: Number(stock),
      category: {
        id: Number(categoryId),
      },
    };

    try {
      await onSuccess(productData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={`${styles.form} ${animate ? styles.animateIn : ''}`} onSubmit={handleSubmit}>
      <h3>{initialData.id ? '✏️ Editar Producto' : '➕ Nuevo Producto'}</h3>

      <input
        type="text"
        placeholder="Nombre del producto"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />

      <textarea
        placeholder="Descripción"
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows={3}
        required
      />

      <input
        type="url"
        placeholder="URL de la imagen"
        value={imageUrl}
        onChange={e => setImageUrl(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Precio"
        value={price}
        onChange={e => setPrice(e.target.value)}
        required
        min={0}
        step="0.01"
      />

      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={e => setStock(e.target.value)}
        required
        min={0}
      />

      <select value={categoryId} onChange={e => setCategoryId(e.target.value)} required>
        <option value="">Seleccione una categoría</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id.toString()}>
            {cat.name}
          </option>
        ))}
      </select>

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
