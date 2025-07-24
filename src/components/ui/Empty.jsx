import React from "react";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No contacts found", 
  message = "Get started by adding your first contact to begin building your customer relationships.",
  actionText = "Add Contact",
  onAction
}) => {
  return (
    <Card className="p-12 text-center">
      <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl mx-auto mb-6">
        <ApperIcon name="Users" className="h-10 w-10 text-primary-600" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
        {message}
      </p>
      
      {onAction && (
        <Button onClick={onAction} className="flex items-center mx-auto">
          <ApperIcon name="Plus" className="h-5 w-5 mr-2" />
          {actionText}
        </Button>
      )}
    </Card>
  );
};

export default Empty;