import React from 'react';

/**
 * Muestra una "pastilla" de color estática para estados.
 * @param {string} text - El texto a mostrar (ej. "Activo").
 * @param {'active' | 'inactive'} type - El tipo para definir el color.
 */
const StatusPill = ({ text, type }) => {
  // Define los colores de nuestro sistema
  const colorClasses = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        colorClasses[type] || "bg-gray-100 text-gray-800"
      }`}
    >
      {text}
    </span>
  );
};

export default StatusPill;