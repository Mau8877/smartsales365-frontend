import React, { useState, useEffect } from "react"; // <-- Simplificamos los imports
import UniversalTable from "@/components/UniversalTable";
import StatusPill from "@/components/StatusPill"; // <-- 1. Importamos el Pill
// import StatusToggle from "@/components/StatusToggle"; // <-- 2. Eliminamos el Toggle
import apiClient from "@/services/apiClient"; 

const GestionarUsuariosTienda = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- 3. ELIMINAMOS handleToggleStatus ---
  // (Toda la función 'handleToggleStatus' ha sido borrada)

  // --- 4. Definimos las columnas (ahora más simples) ---
  const columns = [
    {
      header: "Nombre",
      accessor: "nombre_completo",
    },
    {
      header: "Email",
      accessor: "email",
    },
    {
      header: "Rol",
      accessor: "rol_nombre",
    },
    {
      header: "Estado",
      accessor: "estado_texto", // El buscador usa esto
      render: (item) => (
        // Usamos el nuevo Pill.
        // Le pasamos el texto ("Activo" o "Desactivado")
        // y el 'type' (para que sepa si es verde o rojo)
        <StatusPill
          text={item.estado_texto}
          type={item.is_active ? 'active' : 'inactive'}
        />
      ),
    },
  ];

  // Cargar los datos
  useEffect(() => {
    const fetchUsers = async () => {
      console.log(localStorage.getItem('userData'));
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const apiData = [
          { id: 1, nombre_completo: "Carlos Leonel", email: "leonel@tienda.com", rol_nombre: "Admin", is_active: true },
          { id: 2, nombre_completo: "Mauro", email: "mauro@tienda.com", rol_nombre: "Vendedor", is_active: true },
          { id: 3, nombre_completo: "María", email: "maria@tienda.com", rol_nombre: "Vendedor", is_active: false },
        ];

        // --- 5. MANTENEMOS ESTA LÓGICA ---
        // Seguimos usando "Desactivado" para que el buscador funcione.
        const processedData = apiData.map(user => ({
          ...user,
          estado_texto: user.is_active ? "Activo" : "Desactivado"
        }));
        
        setData(processedData);

      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []); // El array vacío [] está perfecto

  // Funciones para los botones (sin cambios)
  const handleAdd = () => {
    console.log("Abrir modal para AGREGAR usuario");
  };

  const handleEdit = (user) => {
    console.log("Abrir modal para EDITAR usuario:", user);
  };

  const handleDelete = (user) => {
    console.log("Abrir modal para ELIMINAR usuario:", user);
  };

  return (
    <UniversalTable
      title="Gestión de Usuarios de Tienda"
      data={data}
      columns={columns}
      loading={loading}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      searchPlaceholder="Buscar por nombre, email, rol, estado..."
      addButtonText="Agregar Usuario"
      emptyMessage="No se encontraron usuarios"
    />
  );
};

export default GestionarUsuariosTienda;