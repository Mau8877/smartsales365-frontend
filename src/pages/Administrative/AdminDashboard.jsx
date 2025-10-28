import React from "react";
import RoleGuard from "@/components/RoleGuard";
import authService from "@/services/auth";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const currentUser = authService.getCurrentUser();

  // Función helper para obtener el nombre del rol de forma segura
  const getSafeRolNombre = () => {
    if (!currentUser?.rol) return "Usuario";
    
    if (typeof currentUser.rol === 'object') {
      return currentUser.rol.nombre;
    }
    
    return currentUser.rol;
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <motion.div className="space-y-8" initial="hidden" animate="visible">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard {currentUser?.tienda_id ? `de Tienda` : "Global"}
        </h1>
        <p className="text-gray-600 mt-1">
          Hola {currentUser?.nombre_completo}, aquí tienes un resumen de tu
          actividad.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Widget de Perfil (todos lo ven) */}
        <motion.div
          variants={cardVariants}
          custom={0}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h3 className="text-lg font-semibold text-gray-800">Mi Perfil</h3>
          <p className="text-gray-600 truncate">Email: {currentUser?.email}</p>
          <p className="text-gray-600">
            Rol:{" "}
            <span className="font-medium capitalize">
              {getSafeRolNombre()} {/* ✅ Usar la función segura */}
            </span>
          </p>
        </motion.div>

        {/* Widget de Ventas (visible para todos: admin, vendedor, superAdmin) */}
        <motion.div
          variants={cardVariants}
          custom={1}
          className="bg-blue-100 p-6 rounded-lg shadow-md"
        >
          <h3 className="text-lg font-semibold text-blue-900">
            Módulo de Ventas
          </h3>
          <p className="text-blue-700">
            Registra nuevas ventas y consulta el historial.
          </p>
        </motion.div>

        {/* Widget de Gestión de Tienda (visible para admin y superAdmin) */}
        <RoleGuard allowedRoles={["admin"]}>
          <motion.div
            variants={cardVariants}
            custom={2}
            className="bg-green-100 p-6 rounded-lg shadow-md"
          >
            <h3 className="text-lg font-semibold text-green-900">
              Gestión de Tienda
            </h3>
            <p className="text-green-700">
              Administra usuarios y productos de tu tienda.
            </p>
          </motion.div>
        </RoleGuard>
      </div>

      {/* Panel de Super Administrador (SOLO visible para superAdmin) */}
      <RoleGuard allowedRoles={["superAdmin"]}>
        <motion.div
          variants={cardVariants}
          custom={3}
          className="bg-purple-100 p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-bold text-purple-900 mb-4">
            Panel de Super Admin
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow">
              <h4 className="font-semibold">Gestión Global de Tiendas</h4>
              <p className="text-sm text-gray-600">
                Supervisa y administra todas las tiendas del sistema.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow">
              <h4 className="font-semibold">Métricas del Sistema</h4>
              <p className="text-sm text-gray-600">
                Visualiza estadísticas globales y de rendimiento.
              </p>
            </div>
          </div>
        </motion.div>
      </RoleGuard>
    </motion.div>
  );
};

export default AdminDashboard;