import { useState } from "react";
import { Outlet } from "react-router-dom";
import authService from "@/services/auth";
import { generateMenuItems } from "@/pages/Administrative/menuItems.jsx";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const AdministrativeLayout = () => {
  const currentUser = authService.getCurrentUser();
  const menuItems = generateMenuItems(currentUser);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((open) => !open);

  return (
    <div className="relative min-h-screen lg:flex">
      <Sidebar
        menuItems={menuItems}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out lg:ml-64">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdministrativeLayout;