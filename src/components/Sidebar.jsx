import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const SidebarMenuItem = ({ item, toggleSidebar }) => {
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);
  const hasSubItems = item.subItems && item.subItems.length > 0;

  const handleToggleSubMenu = () => {
    setSubMenuOpen(!isSubMenuOpen);
  };

  if (hasSubItems) {
    return (
      <>
        <button
          onClick={handleToggleSubMenu}
          className="w-full flex items-center justify-between gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
        >
          <div className="flex items-center gap-3">
            {item.icon}
            <span>{item.label}</span>
          </div>
          <motion.div animate={{ rotate: isSubMenuOpen ? 180 : 0 }}>
            <ChevronDown size={16} />
          </motion.div>
        </button>
        <AnimatePresence>
          {isSubMenuOpen && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="ml-4 pl-4 border-l border-gray-600 space-y-1 overflow-hidden"
            >
              {item.subItems.map((subItem) => (
                <li key={subItem.label}>
                  <NavLink
                    to={subItem.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 w-full px-4 py-2 text-sm rounded-lg transition-colors ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-700 hover:text-white"
                      }`
                    }
                    onClick={toggleSidebar}
                  >
                    {subItem.icon}
                    <span>{subItem.label}</span>
                  </NavLink>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <NavLink
      to={item.path}
      end={item.path === "/dashboard"}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
          isActive
            ? "bg-blue-600 text-white"
            : "hover:bg-gray-700 hover:text-white"
        }`
      }
      onClick={toggleSidebar}
    >
      {item.icon}
      <span>{item.label}</span>
    </NavLink>
  );
};

const Sidebar = ({ menuItems, isOpen, toggleSidebar }) => (
  <>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleSidebar}
        />
      )}
    </AnimatePresence>
    <aside
      className={`fixed inset-y-0 left-0 bg-gray-800 text-gray-300 w-64 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 transition-transform duration-300 ease-in-out z-30 flex flex-col`}
    >
      <div className="h-16 flex items-center justify-center px-4 border-b border-gray-700 flex-shrink-0">
        <img src="/Icono365white.png" alt="Logo" className="h-8 w-auto mr-2" />
        <span className="font-bold text-xl text-white">SmartSales365</span>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
        {menuItems.map((group) => (
          <div key={group.name}>
            <h3 className="px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
              {group.name}
            </h3>
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item.label}>
                  <SidebarMenuItem
                    item={item}
                    toggleSidebar={() => {
                      if (isOpen) toggleSidebar();
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  </>
);

export default Sidebar;
