import Container from "../layouts/Container";
import AnimatedSection from "../../AnimatedSection"
import { useState } from "react";

const PricingSection = () => {
  const [billingPeriod, setBillingPeriod] = useState("monthly"); // 'monthly' or 'yearly'

  const plans = [
    {
      name: "Prueba",
      description: "Perfecto para empezar",
      price: {
        monthly: "Gratis",
        yearly: "Gratis",
      },
      period: "14 días",
      features: [
        "Hasta 100 ventas/mes",
        "1 usuario incluido",
        "Dashboard básico",
        "Soporte por email",
        "Inventario limitado",
      ],
      cta: "Comenzar Prueba",
      popular: false,
      color: "border-gray-300",
      button: "bg-gray-600 hover:bg-gray-700",
    },
    {
      name: "Básico",
      description: "Para pequeñas tiendas",
      price: {
        monthly: "Bs. 199",
        yearly: "Bs. 1,990",
      },
      period: billingPeriod === "monthly" ? "por mes" : "por año",
      features: [
        "Ventas ilimitadas",
        "3 usuarios incluidos",
        "Dashboard completo",
        "Soporte prioritario",
        "Inventario completo",
        "App móvil",
        "Reportes básicos",
      ],
      cta: "Elegir Básico",
      popular: true,
      color: "border-blue-500",
      button: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "Profesional",
      description: "Para negocios en crecimiento",
      price: {
        monthly: "Bs. 399",
        yearly: "Bs. 3,990",
      },
      period: billingPeriod === "monthly" ? "por mes" : "por año",
      features: [
        "Todo en Básico +",
        "10 usuarios incluidos",
        "Reportes avanzados",
        "Multi-tienda (hasta 3)",
        "CRM completo",
        "Integraciones API",
        "Soporte 24/7",
        "Backup automático",
      ],
      cta: "Elegir Profesional",
      popular: false,
      color: "border-purple-500",
      button: "bg-purple-600 hover:bg-purple-700",
    },
  ];

  const savings = {
    basic: "Ahorras Bs. 398",
    pro: "Ahorras Bs. 798",
  };

  return (
    <section id="pricing" className="py-20 bg-white">
      <Container>
        {/* Section Header */}
        <AnimatedSection
          direction="up"
          delay={0.2}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Planes que se adaptan a
            <span className="text-blue-600"> tu crecimiento</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Sin sorpresas, sin contratos largos. Cambia o cancela cuando
            quieras.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span
              className={`text-lg ${
                billingPeriod === "monthly"
                  ? "text-gray-900 font-semibold"
                  : "text-gray-500"
              }`}
            >
              Mensual
            </span>
            <button
              onClick={() =>
                setBillingPeriod(
                  billingPeriod === "monthly" ? "yearly" : "monthly"
                )
              }
              className="relative w-14 h-7 bg-blue-600 rounded-full transition-colors"
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  billingPeriod === "monthly" ? "left-1" : "left-8"
                }`}
              />
            </button>
            <div className="flex items-center">
              <span
                className={`text-lg ${
                  billingPeriod === "yearly"
                    ? "text-gray-900 font-semibold"
                    : "text-gray-500"
                }`}
              >
                Anual
              </span>
              {billingPeriod === "yearly" && (
                <span className="ml-2 bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded-full">
                  -20%
                </span>
              )}
            </div>
          </div>
        </AnimatedSection>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <AnimatedSection
              key={index}
              direction="up"
              delay={0.3 * (index + 1)}
              className="relative"
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    MÁS POPULAR
                  </span>
                </div>
              )}

              <div
                className={`bg-white rounded-2xl border-2 ${
                  plan.color
                } p-8 h-full flex flex-col transition-all duration-300 hover:shadow-xl ${
                  plan.popular ? "scale-105 relative z-10" : ""
                }`}
              >
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-gray-900 mb-1">
                    {plan.price[billingPeriod]}
                  </div>
                  <div className="text-gray-600">{plan.period}</div>

                  {/* Savings for yearly */}
                  {billingPeriod === "yearly" && plan.name !== "Prueba" && (
                    <div className="text-green-600 text-sm font-medium mt-2">
                      {plan.name === "Básico" ? savings.basic : savings.pro}
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="flex-grow mb-8">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <svg
                          className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full ${plan.button} text-white py-4 rounded-xl font-semibold transition-colors mt-auto`}
                >
                  {plan.cta}
                </button>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Additional Info */}
        <AnimatedSection
          direction="up"
          delay={0.8}
          className="text-center mt-16"
        >
          <div className="bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Necesitas algo personalizado?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Contáctanos para un plan empresarial con funcionalidades
              específicas para tu negocio.
            </p>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-colors">
              Contactar Ventas
            </button>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
};

export default PricingSection;
