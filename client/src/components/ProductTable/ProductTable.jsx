import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, editProduct, removeProduct } from '../../redux/feature/products/productsSlice';
import { fetchCategories } from '../../redux/feature/category/categorySlice'; // importá el thunk de categorías
import ProductForm from '../ProductForm/ProductForm';
import styles from './ProductTable.module.css';
import Swal from 'sweetalert2';

export default function ProductTable() {
  const dispatch = useDispatch();
  const { items: products, status, error } = useSelector(state => state.products);
  const { items: categories } = useSelector(state => state.categories); // obtenemos categorías
  const [showForm, setShowForm] = useState(false);
  const [editProductData, setEditProductData] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());  // cargamos categorías también
  }, [dispatch]);

  const openFormForAdd = () => {
    setEditProductData(null);
    setShowForm(true);
  };

  const openFormForEdit = (product) => {
    setEditProductData(product);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditProductData(null);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: '¿Eliminar producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (confirm.isConfirmed) {
      try {
        await dispatch(removeProduct(id)).unwrap();
        Swal.fire('¡Eliminado!', 'Producto eliminado con éxito', 'success');
      } catch (err) {
        Swal.fire('Error', 'No se pudo eliminar el producto', 'error');
      }
    }
  };

  const handleFormSuccess = async (productData) => {
    try {
      if (editProductData) {
        await dispatch(editProduct({ id: editProductData.id, product: productData })).unwrap();
        Swal.fire('¡Actualizado!', 'Producto actualizado con éxito', 'success');
      } else {
        await dispatch(addProduct(productData)).unwrap();
        Swal.fire('¡Creado!', 'Producto creado con éxito', 'success');
      }
      closeForm();
    } catch (err) {
      Swal.fire('Error', err.message || 'Error al guardar producto', 'error');
    }
  };

  if (status === 'loading') return <p>Cargando productos...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <h2>📦 Lista de Productos</h2>

      <button onClick={openFormForAdd} className={styles.addBtn}>
        ➕ Agregar producto
      </button>

      {showForm && (
        <ProductForm
          initialData={editProductData || {}}
          onSuccess={handleFormSuccess}
          onCancel={closeForm}
          categories={categories}  
        />
      )}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Imagen</th> 
            <th>Categoría</th> 
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>

              <td>
                <img
                  src={p.imageUrl || 'https://placehold.co/60x40?text=Sin+img'}
                  alt={p.name}
                  style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4 }}
                />
              </td>
              <td>
                {/* Opción 1: Si product.category es objeto */}
                {p.category?.name
                  ? p.category.name
                  // Opción 2: Si category es solo id (por ejemplo p.category === 1)
                  : categories.find(cat => cat.id === p.category)?.name || 'Sin categoría'}
              </td>

              <td>${p.price}</td>
              <td>{p.stock}</td>
              <td>
                <button className={styles.editBtn} onClick={() => openFormForEdit(p)}>Editar</button>
                <button className={styles.deleteBtn} onClick={() => handleDelete(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
