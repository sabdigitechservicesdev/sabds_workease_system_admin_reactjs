import React from 'react';
import { 
  Menu, 
  X, 
  Bell, 
  Search, 
  UserCircle,
  ChevronDown,
  Sun,
  Moon
} from 'lucide-react';
import { Avatar, Dropdown, Badge } from 'antd';
import authService from '../services/authService';

const Header = ({ sidebarCollapsed, toggleSidebar }) => {
  const user = authService.getCurrentUser();
  
  const menuItems = [
    {
      key: 'profile',
      label: (
        <div className="flex items-center px-2 py-1">
          <UserCircle className="w-4 h-4 mr-2" />
          <span>Profile</span>
        </div>
      ),
    },
    {
      key: 'settings',
      label: (
        <div className="flex items-center px-2 py-1">
          <Sun className="w-4 h-4 mr-2" />
          <span>Settings</span>
        </div>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: (
        <button
          onClick={() => authService.logout()}
          className="flex items-center px-2 py-1 text-red-600 w-full hover:bg-red-50 rounded"
        >
          <span>Logout</span>
        </button>
      ),
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
      <div className="h-full px-4 lg:px-6 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {sidebarCollapsed ? (
              <Menu className="w-5 h-5 text-gray-600" />
            ) : (
              <X className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Desktop Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100"
          >
            {sidebarCollapsed ? (
              <Menu className="w-5 h-5 text-gray-600" />
            ) : (
              <X className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Brand/Logo */}
          <div className="hidden md:flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="ml-2 text-lg font-semibold text-gray-900">
              Scheduler Pro
            </span>
          </div>
        </div>

        {/* Center Section - Search (Desktop) */}
        {/* <div className="hidden md:flex flex-1 max-w-2xl mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users, appointments..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div> */}

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <button className="hidden md:flex p-2 rounded-lg hover:bg-gray-100">
            <Sun className="w-5 h-5 text-gray-600" />
          </button>

          {/* Notifications */}
          <Dropdown
            overlay={
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 w-80">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="p-2">
                  {[1, 2].map((item) => (
                    <div key={item} className="p-3 hover:bg-gray-50 rounded cursor-pointer">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Bell className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            New user registered
                          </p>
                          <p className="text-xs text-gray-500">2 minutes ago</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            }
            trigger={['click']}
            placement="bottomRight"
          >
            <button className="relative p-2 rounded-lg hover:bg-gray-100">
              <Bell className="w-5 h-5 text-gray-600" />
              <Badge count={3} size="small" className="absolute -top-1 -right-1" />
            </button>
          </Dropdown>

          {/* Mobile Search */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <Search className="w-5 h-5 text-gray-600" />
          </button>

          {/* User Profile */}
          <Dropdown
            menu={{ items: menuItems }}
            trigger={['click']}
            placement="bottomRight"
          >
            <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <div className="flex items-center space-x-3">
                <Avatar 
                  size="default"
                  className="bg-gradient-to-r from-blue-500 to-purple-500"
                >
                  {user?.first_name?.[0] || 'U'}
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.first_name} {user?.last_name}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user?.role_name?.toLowerCase() || 'User'}
                  </p>
                </div>
                <ChevronDown className="hidden md:block w-4 h-4 text-gray-400" />
              </div>
            </div>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;