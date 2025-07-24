import React from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";

const CompanyList = ({ companies, onCompanyClick, onEditCompany, onDeleteCompany }) => {
  if (!companies || companies.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {companies.map((company, index) => (
        <motion.div
          key={company.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card hover className="p-6">
            <div className="flex items-center justify-between">
              <div 
                className="flex-1 cursor-pointer"
                onClick={() => onCompanyClick(company)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl mr-4">
                        <span className="text-white font-semibold text-lg">
{company.Name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors duration-200">
                          {company.Name}
                        </h3>
                        <p className="text-sm text-gray-500">{company.industry_c || "No industry"}</p>
                      </div>
                    </div>
                    
                    <div className="ml-16 space-y-1">
<div className="flex items-center text-sm text-gray-600">
                        <ApperIcon name="Globe" className="h-4 w-4 mr-2 text-gray-400" />
                        {company.website_c || "No website"}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <ApperIcon name="Mail" className="h-4 w-4 mr-2 text-gray-400" />
                        {company.email_c || "No email"}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <ApperIcon name="Phone" className="h-4 w-4 mr-2 text-gray-400" />
                        {company.phone_c || "No phone"}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <ApperIcon name="Calendar" className="h-4 w-4 mr-2 text-gray-400" />
                        Added {format(new Date(company.CreatedOn), "MMM d, yyyy")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditCompany(company);
                  }}
                  className="text-gray-500 hover:text-primary-600"
                >
                  <ApperIcon name="Edit2" className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteCompany(company.Id);
                  }}
                  className="text-gray-500 hover:text-red-600"
                >
                  <ApperIcon name="Trash2" className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default CompanyList;