import React from 'react';
import { 
  Users, 
  Calendar, 
  Settings, 
  BarChart3, 
  FileText,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = ({ collapsed, onToggle }) => {
  const location = useLocation();

  const menuItems = [
    {
      id: 'users',
      label: 'Users',
      icon: <Users className="w-5 h-5" />,
      path: '/dashboard/users',
    },
   
  ];

  // Check if current path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className={`
      fixed top-16 left-0 h-[calc(100vh-4rem)] 
      bg-white border-r border-gray-200 
      transition-all duration-300 z-40
      ${collapsed ? 'w-20' : 'w-64'}
    `}>
      {/* Collapse Toggle */}
      <div className="flex justify-end p-4 border-b border-gray-200">
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-500" />
          )}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  className={`
                    flex items-center rounded-lg px-4 py-3 
                    transition-colors duration-200
                    ${active ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-700 hover:bg-gray-100'}
                    ${collapsed ? 'justify-center' : ''}
                  `}
                >
                  <div className="flex items-center">
                    <div className={active ? 'text-blue-600' : 'text-gray-500'}>
                      {item.icon}
                    </div>
                    {!collapsed && (
                      <span className="ml-3 font-medium">{item.label}</span>
                    )}
                  </div>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section (only show when expanded) */}
      {!collapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Settings className="w-4 h-4 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Need help?</p>
                <p className="text-xs text-gray-600">Check our documentation</p>
              </div>
            </div>
            <button className="w-full mt-2 px-4 py-2 bg-white border border-blue-200 rounded-lg text-blue-600 text-sm font-medium hover:bg-blue-50 transition-colors">
              View Docs
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;