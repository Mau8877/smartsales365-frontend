import React, { useState, useEffect } from "react";
import { Loader } from "lucide-react";

// Componente helper 'Field' (copiado de tu ejemplo)
const Field = ({ label, error, children }) => (
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-gray-700">{label}</label>
    {children}
    {error && (
      <p className="text-sm text-red-600 flex items-center gap-1">
        <span className="w-1 h-1 bg-red-600 rounded-full"></span>
        {error}
      </p>
    )}
  </div>
);

const UsuarioTiendaForm = ({
  initialData = null,
  rolesOptions = [],
  onSubmit,
  onCancel,
  loading = false,
  isEditMode = false,
}) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    rol: "",
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
  });
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (isEditMode && initialData) {
      setForm({
        email: initialData.email || "",
        password: "",
        rol: initialData.rol || "",
        nombre: initialData.nombre || "",
        apellido: initialData.apellido || "",
        telefono: initialData.telefono || "",
        direccion: initialData.direccion || "",
      });
    }
  }, [initialData, isEditMode]);

  const setField = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleBlur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      email: true,
      password: true,
      rol: true,
      nombre: true,
    });

    if (!form.email || !form.nombre || !form.rol || (!isEditMode && !form.password)) {
      return; // No enviar si faltan campos requeridos
    }

    // Preparamos el payload para la API
    const payload = {
      email: form.email,
      rol_id: form.rol,
      profile: {
        nombre: form.nombre,
        apellido: form.apellido,
        telefono: form.telefono,
        direccion: form.direccion,
      }
    };

    // Solo enviamos la contraseña si es modo CREAR y tiene valor
    if (!isEditMode && form.password) {
      payload.password = form.password;
    }
    
    onSubmit(payload);
  };

  // Lógica de Validación
  const invalid = {
    email: touched.email && !form.email,
    nombre: touched.nombre && !form.nombre,
    rol: touched.rol && !form.rol,
    password: !isEditMode && touched.password && !form.password,
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Fila 1: Nombre, Apellido, Rol */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Field label="Nombre *" error={invalid.nombre && "Nombre es requerido"}>
          <input
            value={form.nombre}
            onChange={(e) => setField("nombre", e.target.value)}
            onBlur={() => handleBlur("nombre")}
            disabled={loading}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${invalid.nombre ? "border-red-500 ring-red-200" : "border-gray-300 focus:ring-blue-700"}`}
            placeholder="Ej: Leonel"
          />
        </Field>
        <Field label="Apellido">
          <input
            value={form.apellido}
            onChange={(e) => setField("apellido", e.target.value)}
            disabled={loading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700"
            placeholder="Ej: Barrios"
          />
        </Field>
        <Field label="Rol *" error={invalid.rol && "Rol es requerido"}>
          <select
            value={form.rol}
            onChange={(e) => setField("rol", e.target.value)}
            onBlur={() => handleBlur("rol")}
            disabled={loading || rolesOptions.length === 0}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${invalid.rol ? "border-red-500 ring-red-200" : "border-gray-300 focus:ring-blue-700"}`}
          >
            <option value="" disabled>Seleccione un rol...</option>
            {rolesOptions.map((rol) => (
              <option key={rol.id} value={rol.id} className="capitalize">{rol.nombre}</option>
            ))}
          </select>
        </Field>
      </div>

      {/* Fila 2: Email y Contraseña (solo en creación) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Email *" error={invalid.email && "Email es requerido"}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            disabled={loading} // Permitimos editar email
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${invalid.email ? "border-red-500 ring-red-200" : "border-gray-300 focus:ring-blue-700"}`}
            placeholder="ejemplo@tienda.com"
          />
        </Field>

        {!isEditMode && (
          <Field label="Contraseña *" error={invalid.password && "Contraseña es requerida"}>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setField("password", e.target.value)}
              onBlur={() => handleBlur("password")}
              disabled={loading}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${invalid.password ? "border-red-500 ring-red-200" : "border-gray-300 focus:ring-blue-700"}`}
              placeholder="••••••••"
            />
          </Field>
        )}
      </div>

      {/* Fila 3: Teléfono y Dirección */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Teléfono">
          <input
            value={form.telefono}
            onChange={(e) => setField("telefono", e.target.value)}
            disabled={loading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700"
            placeholder="Ej: 71234567"
          />
        </Field>
        <Field label="Dirección">
          <input
            value={form.direccion}
            onChange={(e) => setField("direccion", e.target.value)}
            disabled={loading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700"
            placeholder="Ej: Av. Principal #123"
          />
        </Field>
      </div>

      {/* Botones */}
      <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader className="animate-spin" size={18} />
              Guardando...
            </>
          ) : isEditMode ? (
            "Guardar Cambios"
          ) : (
            "Crear Usuario"
          )}
        </button>
      </div>
    </form>
  );
};

export default UsuarioTiendaForm;