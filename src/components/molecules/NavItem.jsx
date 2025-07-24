import React from "react";
import { NavLink } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const NavItem = ({ to, icon, children, className = "" }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center px-4 py-3 text-gray-300 rounded-lg transition-all duration-200 group",
          "hover:bg-white/10 hover:text-white",
          isActive && "bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-white border-r-2 border-accent-400",
          className
        )
      }
    >
      <ApperIcon name={icon} className="h-5 w-5 mr-3 transition-colors duration-200" />
      <span className="font-medium">{children}</span>
    </NavLink>
  );
};

export default NavItem;