import Container from "../layouts/Container";
import AnimatedSection from "../../AnimatedSection";

const AboutSection = () => {
  const team = [
    {
      name: "María González",
      role: "CEO & Fundadora",
      description: "15+ años en retail y tecnología",
      image: "👩‍💼",
    },
    {
      name: "Carlos Rodríguez",
      role: "CTO",
      description: "Especialista en SaaS y cloud",
      image: "👨‍💻",
    },
    {
      name: "Ana Martínez",
      role: "Head of Customer Success",
      description: "Apasionada por la experiencia del cliente",
      image: "👩‍🎓",
    },
  ];

  const values = [
    {
      icon: "🎯",
      title: "Enfoque en Resultados",
      description:
        "Cada feature está diseñado para generar valor real a tu negocio.",
    },
    {
      icon: "🚀",
      title: "Innovación Constante",
      description:
        "Mejoramos continuamente basados en feedback de usuarios reales.",
    },
    {
      icon: "🤝",
      title: "Soporte Real",
      description: "No somos un software, somos tu partner de crecimiento.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <Container>
        {/* Mission */}
        <AnimatedSection
          direction="up"
          delay={0.2}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Más que un software,
            <span className="text-blue-600"> tu aliado estratégico</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            En{" "}
            <span className="font-semibold text-blue-600">SmartSales365</span>{" "}
            creemos que cada negocio minorista merece herramientas poderosas y
            accesibles. Nuestra misión es democratizar la tecnología para que
            tiendas de todos los tamaños puedan competir y crecer en la era
            digital.
          </p>
        </AnimatedSection>

        {/* Values */}
        <AnimatedSection direction="up" delay={0.4} className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Nuestros Valores
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h4>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Team */}
        <AnimatedSection direction="up" delay={0.6}>
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Nuestro Equipo
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <div
                key={index}
                className="text-center bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="text-6xl mb-4">{member.image}</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h4>
                <div className="text-blue-600 font-medium mb-3">
                  {member.role}
                </div>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Stats & Recognition */}
        <AnimatedSection direction="up" delay={0.8} className="mt-20">
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-blue-600">
                  2021
                </div>
                <div className="text-gray-600 mt-2">Fundación</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-green-600">
                  +500
                </div>
                <div className="text-gray-600 mt-2">Clientes Activos</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-purple-600">
                  4.9/5
                </div>
                <div className="text-gray-600 mt-2">Rating</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-orange-600">
                  3
                </div>
                <div className="text-gray-600 mt-2">Países</div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Final CTA */}
        <AnimatedSection direction="up" delay={1} className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              ¿Listo para unirte a la revolución retail?
            </h3>
            <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
              Comienza tu prueba gratuita hoy mismo y descubre por qué más de
              500 tiendas confían en nosotros.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-colors">
                Comenzar Prueba Gratis
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Agendar Demo
              </button>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
};

export default AboutSection;
