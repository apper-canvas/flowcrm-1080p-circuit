import React from "react";
import Header from "@/components/organisms/Header";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const DealsPage = ({ onMenuClick }) => {
  return (
    <div className="flex-1 flex flex-col h-full">
      <Header
        title="Deals"
        onMenuClick={onMenuClick}
      />
      
      <div className="flex-1 p-6">
        <Card className="p-12 text-center">
          <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl mx-auto mb-6">
            <ApperIcon name="Handshake" className="h-10 w-10 text-primary-600" />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Deals Coming Soon</h3>
          <p className="text-gray-600 max-w-md mx-auto text-lg">
            The Deals section is under development. Soon you'll be able to manage your sales pipeline, track deal progress, and close more opportunities.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default DealsPage;