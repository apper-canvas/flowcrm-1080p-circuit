import React from "react";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ 
  title, 
  searchValue, 
  onSearchChange, 
  onMenuClick,
  showAddButton = false,
  onAddClick,
  addButtonText = "Add"
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ApperIcon name="Menu" className="h-6 w-6" />
          </button>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <SearchBar
            value={searchValue}
            onChange={onSearchChange}
            placeholder="Search contacts..."
            className="w-80 hidden sm:block"
          />
          
          {showAddButton && (
            <Button onClick={onAddClick} className="flex items-center">
              <ApperIcon name="Plus" className="h-5 w-5 mr-2" />
              {addButtonText}
            </Button>
          )}
        </div>
      </div>
      
      {/* Mobile search */}
      <div className="mt-4 sm:hidden">
        <SearchBar
          value={searchValue}
          onChange={onSearchChange}
          placeholder="Search contacts..."
        />
      </div>
    </div>
  );
};

export default Header;