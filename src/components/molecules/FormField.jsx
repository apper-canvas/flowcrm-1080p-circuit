import React from "react";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";

const FormField = ({ 
  label, 
  error, 
  required = false, 
  type = "text",
  className = "",
  ...props 
}) => {
  return (
    <div className={className}>
      <Label required={required}>{label}</Label>
      <Input type={type} error={error} {...props} />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormField;