import React, { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import UniversalTable from '@/components/UniversalTable';
import StatusPill from '@/components/StatusPill'; // Reutilizamos el pill
import { useServerSideTable } from '@/hooks/useServerSideTable'; // ¡Nuestra magia!
import apiClient from '@/services/apiClient';

// Celda de renderizado para el usuario (Nombre + Rol)
const UserCell = ({ item }) => (
  <div>
    <div className="font-medium text-gray-900">
      {item.profile?.nombre || 'Sin'} {item.profile?.apellido || 'Nombre'}
    </div>
    <div className="text-sm text-gray-500 capitalize">
      {item.rol?.nombre || "Sin Rol"}
    </div>
  </div>
);

const GestionarUsuariosTienda = () => {
  const navigate = useNavigate();

  // --- ¡AQUÍ ESTÁ LA MAGIA! ---
  // 1. Usamos el hook
  // 2. Le pasamos un 'fixedQueryFilters' para que SIEMPRE filtre
  //    por Admin y Vendedor en esta vista.
  const { 
    data: rawData,
    loading, 
    error, 
    pagination, 
    orderingState,
    handlePageChange, 
    handleSearchSubmit,
    handleSort,
    refreshData // <-- ¡Función para recargar!
  } = useServerSideTable(
    '/usuarios/users/', // Endpoint del UserViewSet
    { 'rol__nombre__in': 'admin,vendedor' } // ¡Filtro fijo!
  );
  
  // Procesamos los datos para la búsqueda (igual que en Bitácora)
  const data = useMemo(() => {
    return rawData.map(user => ({
      ...user,
      nombre_completo: `${user.profile?.nombre || ''} ${user.profile?.apellido || ''}`.trim(),
      rol_nombre: user.rol?.nombre,
      estado_texto: user.is_active ? "Activo" : "Desactivado"
    }));
  }, [rawData]);

  // --- Definición de Columnas ---
  const columns = useMemo(() => [
    { 
      header: "Nombre", 
      accessor: "nombre_completo", 
      render: (item) => <UserCell item={item} />,
      sortKey: "profile__apellido"
    },
    { 
      header: "Email", 
      accessor: "email",
      sortKey: "email"
    },
    { 
      header: "Estado", 
      accessor: "estado_texto",
      render: (item) => (
        <StatusPill
          text={item.estado_texto}
          type={item.is_active ? 'active' : 'inactive'}
        />
      ),
      // 'is_active' no está en 'ordering_fields', así que no hay sortKey
    },
  ], []);

  // --- Handlers para CRUD ---
  const handleAdd = () => {
    navigate('/dashboard/usuarios/tienda/nuevo');
  };

  const handleEdit = (user) => {
    navigate(`/dashboard/usuarios/tienda/${user.id_usuario}`);
  };

  const handleDelete = async (user) => {
    if (window.confirm(`¿Estás seguro que quieres eliminar a ${user.nombre_completo || user.email}?`)) {
      try {
        await apiClient.delete(`/usuarios/users/${user.id_usuario}/`);
        refreshData(); // ¡Recarga la tabla!
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
        alert("Error al eliminar usuario: " + (error.detail || error.message));
      }
    }
  };

  if (error) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-xl font-bold text-red-600">Error de Carga</h2>
        <p className="text-gray-700 mt-2">No se pudieron cargar los usuarios.</p>
        <pre className="bg-gray-100 p-4 rounded-md mt-4 text-red-800 overflow-auto">
          {error}
        </pre>
      </div>
    );
  }

  return (
    <UniversalTable
      title="Gestión de Usuarios de Tienda"
      data={data}
      columns={columns}
      loading={loading}
      
      // Búsqueda y Paginación (Modo Servidor)
      searchMode="manual"
      onSearchSubmit={handleSearchSubmit}
      pagination={pagination}
      onPageChange={handlePageChange}
      onSort={handleSort}
      orderingState={orderingState}
      
      // Acciones CRUD
      showAddButton={true}
      addButtonText="Agregar Usuario"
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      
      searchPlaceholder="Buscar por nombre, email..."
      emptyMessage="No se encontraron usuarios"
    />
  );
};

export default GestionarUsuariosTienda;