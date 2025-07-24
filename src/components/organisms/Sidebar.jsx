import React from "react";
import { motion } from "framer-motion";
import NavItem from "@/components/molecules/NavItem";
import ApperIcon from "@/components/ApperIcon";

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { to: "/", icon: "Users", label: "Contacts" },
    { to: "/companies", icon: "Building2", label: "Companies" },
    { to: "/deals", icon: "Handshake", label: "Deals" }
  ];

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <div className="hidden lg:block w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 h-full border-r border-gray-700/50">
      <div className="p-6">
        <div className="flex items-center mb-8">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl mr-3">
            <ApperIcon name="Zap" className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold gradient-text">FlowCRM</h1>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <NavItem key={item.to} to={item.to} icon={item.icon}>
              {item.label}
            </NavItem>
          ))}
        </nav>
      </div>
    </div>
  );

  // Mobile Sidebar Overlay
  const MobileSidebar = () => (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 z-50 lg:hidden border-r border-gray-700/50"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl mr-3">
                <ApperIcon name="Zap" className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">FlowCRM</h1>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <ApperIcon name="X" className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <NavItem key={item.to} to={item.to} icon={item.icon}>
                {item.label}
              </NavItem>
            ))}
          </nav>
        </div>
      </motion.div>
    </>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;