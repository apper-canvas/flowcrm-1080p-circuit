import React from "react";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <Card className="p-12 text-center">
      <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-xl mx-auto mb-6">
        <ApperIcon name="AlertCircle" className="h-8 w-8 text-red-600" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {message}. Please try again or contact support if the problem persists.
      </p>
      
      {onRetry && (
        <Button onClick={onRetry} className="flex items-center mx-auto">
          <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      )}
    </Card>
  );
};

export default Error;