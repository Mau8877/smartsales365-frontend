  import { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import { loadStripe } from "@stripe/stripe-js";
  import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout,
  } from "@stripe/react-stripe-js";
  import api from "@/services/publicApiClient";
  import AuthService from "@/services/auth";

  // Carga tu clave pública de Stripe desde las variables de entorno (.env)
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  const RegisterPagos = ({ data, onBack, onSubmit }) => {
    const [clientSecret, setClientSecret] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      // Prepara el payload con los datos del formulario una sola vez
      const registroData = {
        plan_id: data.plan.id,
        tienda_nombre: data.tienda.nombre,
        admin_nombre: data.admin.nombre,
        admin_apellido: data.admin.apellido,
        admin_ci: data.admin.ci,
        admin_email: data.admin.email,
        admin_password: data.admin.password,
        admin_telefono: data.admin.telefono || "",
      };

      // Lógica para decidir el flujo: Prueba Gratuita vs. Pago
      if (data.plan.dias_prueba > 0) {
        handleRegistroDirecto(registroData);
      } else {
        handlePagoStripe(registroData);
      }
    }, [data]); // Depende de `data` para re-ejecutarse si el usuario vuelve y cambia algo

    // --- FUNCIÓN PARA PLANES DE PAGO ---
    const handlePagoStripe = async (registroData) => {
      try {
        setIsLoading(true);
        setError(null);
        // Llama al endpoint correcto para crear la sesión de pago
        const response = await api.post(
          "saas/stripe/crear-sesion/",
          registroData
        );

        if (response.clientSecret) {
          setClientSecret(response.clientSecret);
        } else {
          throw new Error(
            response.error || "No se pudo obtener el token de pago de Stripe."
          );
        }
      } catch (err) {
        setError(err.message || "Ocurrió un error al preparar el pago.");
      } finally {
        setIsLoading(false);
      }
    };

    // --- FUNCIÓN PARA PLANES DE PRUEBA GRATUITA ---
    const handleRegistroDirecto = async (registroData) => {
      try {
        setIsLoading(true);
        setError(null);
        // Llama al endpoint específico para registro de prueba
        await api.post("saas/registro/directo/", registroData);

        // Si el registro fue exitoso, hacemos login para obtener el token
        const loginResponse = await AuthService.login(
          registroData.admin_email,
          registroData.admin_password
        );

        // Guardamos la sesión del usuario
        AuthService.saveUserToStorage(loginResponse);

        // Notificamos al componente padre que el proceso se completó
        onSubmit(loginResponse);

        // Redirigimos al dashboard
        navigate("/dashboard");
      } catch (err) {
        setError(
          "Error en el registro de prueba: " +
            (err.message || "Por favor, intenta de nuevo.")
        );
      } finally {
        setIsLoading(false);
      }
    };

    const options = { clientSecret };

    if (isLoading) {
      return (
        <div className="max-w-2xl mx-auto py-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Paso 3: Finalizando Registro
          </h2>
          <div className="flex flex-col justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-4 text-gray-600 mt-4">
              Preparando todo para ti, por favor espera...
            </span>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="max-w-2xl mx-auto py-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Paso 3: Ocurrió un Error
          </h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={onBack}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Volver al paso anterior
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto py-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Paso 3: Información de Pago
            </h2>
            <p className="text-gray-600">
              Completa el pago para activar tu tienda
            </p>
          </div>
          <button
            onClick={onBack}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            ← Anterior
          </button>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <h3 className="font-semibold text-blue-900 mb-3">Plan Seleccionado</h3>
          <div className="flex justify-between items-center">
            <div>
              <span className="text-lg font-bold text-blue-700">
                {data.plan.nombre}
              </span>
              <p className="text-blue-600 text-sm mt-1">
                {data.plan.descripcion}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-blue-800">
                Bs {data.plan.precio_mensual}{" "}
                {data.plan.nombre.includes("-A") ? "/año" : "/mes"}
              </span>
            </div>
          </div>
        </div>

        {clientSecret && (
          <div
            id="checkout"
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        )}

        <div className="flex items-center justify-center text-sm text-gray-500 mt-6">
          <svg
            className="w-4 h-4 mr-2 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Tus datos están protegidos con encriptación de nivel bancario
        </div>
      </div>
    );
  };

  export default RegisterPagos;
