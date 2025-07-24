import React from "react";
import { cn } from "@/utils/cn";

const Input = React.forwardRef(({ 
  className, 
  type = "text", 
  error,
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "w-full px-4 py-3 border rounded-lg transition-all duration-200 bg-white",
        "focus:ring-2 focus:ring-primary-500 focus:border-transparent",
        "placeholder:text-gray-400",
        error 
          ? "border-red-300 focus:ring-red-500" 
          : "border-gray-200 hover:border-gray-300",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;