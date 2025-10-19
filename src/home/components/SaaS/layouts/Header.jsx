import { useState } from "react";
import Container from "./Container";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 bg-blue-600/95 backdrop-blur-md border-b border-blue-500">
      <Container>
        <nav className="flex items-center justify-between h-16">
          {/* Logo + Nombre - Ahora clickeable */}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-3 hover:opacity-75 transition-opacity"
          >
            <img
              src="/Icono365white.png"
              alt="SmartSales365"
              className="w-22 h-22 object-contain"
              onError={(e) => {
                e.target.src = "/Icono365small.png";
              }}
            />
            <span className="text-2xl font-bold text-white">SmartSales365</span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="#features"
              className="text-white/90 hover:text-white transition-colors font-medium"
            >
              Funcionalidades
            </a>
            <a
              href="#pricing"
              className="text-white/90 hover:text-white transition-colors font-medium"
            >
              Planes
            </a>
            <a
              href="#about"
              className="text-white/90 hover:text-white transition-colors font-medium"
            >
              Nosotros
            </a>

            {/* Botones */}
            <div className="flex items-center space-x-4 ml-4">
              <button
                className="
                text-white 
                hover:text-blue-50 
                font-semibold 
                transition-all 
                duration-200
                ease-out
                border border-white/30 
                hover:border-white
                px-4 py-2 
                rounded-lg 
                hover:bg-white/10
                active:bg-white/20
                active:scale-98
                transform
                hover:-translate-y-0.5
                active:translate-y-0
              "
              >
                Iniciar Sesión
              </button>
              <button
                className="
                bg-white 
                text-blue-600
                hover:text-blue-700
                px-6 py-2 
                rounded-lg 
                hover:bg-blue-50
                active:bg-blue-100
                transition-all 
                duration-200
                ease-out
                font-semibold 
                transform
                hover:-translate-y-0.5
                active:translate-y-0
                active:scale-98
                border border-white
                hover:border-blue-200
                active:border-blue-300
                shadow-md
                hover:shadow-lg
                active:shadow-sm
              "
              >
                Registrar Tienda
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-0.5 bg-white mb-1.5 transition-transform"></div>
            <div className="w-6 h-0.5 bg-white mb-1.5 transition-transform"></div>
            <div className="w-6 h-0.5 bg-white transition-transform"></div>
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-500 bg-blue-600">
            <div className="flex flex-col space-y-4 px-4">
              <a
                href="#features"
                className="text-white/90 hover:text-white py-2 font-medium text-center transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Funcionalidades
              </a>
              <a
                href="#pricing"
                className="text-white/90 hover:text-white py-2 font-medium text-center transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Planes
              </a>
              <a
                href="#about"
                className="text-white/90 hover:text-white py-2 font-medium text-center transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </a>

              {/* Botones mobile */}
              <div className="pt-4 border-t border-blue-500 space-y-3">
                <button
                  className="
                    w-full 
                    text-white 
                    hover:text-blue-50 
                    font-semibold 
                    py-3 
                    text-center 
                    transition-all 
                    duration-200
                    border border-white/30 
                    rounded-lg 
                    hover:bg-white/10
                    active:bg-white/20
                    active:scale-98
                  "
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                >
                  Iniciar Sesión
                </button>
                <button
                  className="
                    w-full 
                    bg-white 
                    text-blue-600
                    hover:text-blue-700
                    py-3 
                    rounded-lg 
                    font-semibold 
                    text-center 
                    hover:bg-blue-50
                    active:bg-blue-100
                    transition-all 
                    duration-200
                    active:scale-98
                    border border-white
                    hover:border-blue-200
                    shadow-md
                    active:shadow-sm
                  "
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                >
                  Registrar Tienda
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
