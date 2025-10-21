// hacer un apartado de la lista de todas las tiendas que tenemos, y de ahí el cliente puede entrar a ver cada tienda
import { Store } from "lucide-react";
import Header from "./components/SaaS/layouts/Header";

const StoreHomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-900">
          Hola desde ListaTiendas
        </h1>
      </div>
    </div>
  );
};

export default StoreHomePage;
