import React, { useContext } from "react";
import { useSelector } from "react-redux";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { AuthContext } from "@/App";
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
          
          <UserProfile />
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

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);
  const { logout } = useContext(AuthContext);

  if (!user) return null;

  const getInitials = (firstName, lastName) => {
    const first = firstName?.charAt(0)?.toUpperCase() || '';
    const last = lastName?.charAt(0)?.toUpperCase() || '';
    return first + last || 'U';
  };

  const handleLogout = async () => {
    if (confirm('Are you sure you want to logout?')) {
      await logout();
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <div className="hidden sm:flex items-center space-x-3">
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-xs text-gray-500">{user.emailAddress}</div>
        </div>
        
        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full text-white font-semibold text-sm">
          {getInitials(user.firstName, user.lastName)}
        </div>
      </div>
      
      <div className="sm:hidden flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full text-white font-semibold text-sm">
        {getInitials(user.firstName, user.lastName)}
      </div>
      
      <button
        onClick={handleLogout}
        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        title="Logout"
      >
        <ApperIcon name="LogOut" className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Header;