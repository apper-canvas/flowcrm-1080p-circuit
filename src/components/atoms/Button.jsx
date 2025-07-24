import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  disabled = false,
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:ring-2 focus:ring-offset-2 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 focus:ring-primary-500 shadow-lg hover:shadow-xl hover:scale-[1.02]",
    secondary: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 focus:ring-primary-500 shadow-sm hover:shadow-md hover:scale-[1.02]",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-500 shadow-lg hover:shadow-xl hover:scale-[1.02]",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500",
    outline: "border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white focus:ring-primary-500"
  };
  
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base"
  };
  
  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;