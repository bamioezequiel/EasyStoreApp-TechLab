import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCategories,
  addCategory,
  editCategory,
  removeCategory
} from '../../redux/feature/category/categorySlice';
import CategoryForm from '../CategoryForm/CategoryForm';
import styles from './CategoryTable.module.css'; 
import Swal from 'sweetalert2';

export default function CategoryTable() {
  const dispatch = useDispatch();
  const { items: categories, status, error } = useSelector(state => state.categories);
  const [showForm, setShowForm] = useState(false);
  const [editCategoryData, setEditCategoryData] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const openFormForAdd = () => {
    setEditCategoryData(null);
    setShowForm(true);
  };

  const openFormForEdit = (category) => {
    setEditCategoryData(category);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditCategoryData(null);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: '¿Eliminar categoría?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (confirm.isConfirmed) {
      try {
        await dispatch(removeCategory(id)).unwrap();
        Swal.fire('¡Eliminada!', 'Categoría eliminada con éxito', 'success');
      } catch (err) {
        Swal.fire('Error', 'No se pudo eliminar la categoría', 'error');
      }
    }
  };

  const handleFormSuccess = async (categoryData) => {
    try {
      if (editCategoryData) {
        await dispatch(editCategory({ id: editCategoryData.id, category: categoryData })).unwrap();
        Swal.fire('¡Actualizada!', 'Categoría actualizada con éxito', 'success');
      } else {
        await dispatch(addCategory(categoryData)).unwrap();
        Swal.fire('¡Creada!', 'Categoría creada con éxito', 'success');
      }
      closeForm();
    } catch (err) {
      Swal.fire('Error', err.message || 'Error al guardar categoría', 'error');
    }
  };

  if (status === 'loading') return <p>Cargando categorías...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <h2>📁 Lista de Categorías</h2>

      <button onClick={openFormForAdd} className={styles.addBtn}>
        ➕ Agregar categoría
      </button>

      {showForm && (
        <CategoryForm
          initialData={editCategoryData || {}}
          onSuccess={handleFormSuccess}
          onCancel={closeForm}
        />
      )}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.name}</td>
              <td>
                <button className={styles.editBtn} onClick={() => openFormForEdit(cat)}>Editar</button>
                <button className={styles.deleteBtn} onClick={() => handleDelete(cat.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
