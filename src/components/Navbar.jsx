import React, { useState } from 'react';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-nobg.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { 
      name: 'Products', 
      path: '/products',
      submenu: [
        { name: 'Web Portal', path: '/products/web-portal' },
        { name: 'Mobile App', path: '/products/mobile-app' },
        { name: 'Scheduling', path: '/products/scheduling' },
        { name: 'Attendance', path: '/products/attendance' },
      ]
    },
    { name: 'Features', path: '/features' },
    { name: 'Integration', path: '/integration' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="relative">
              {/* Minimal Orange Element - Added as subtle accent */}
              {/* <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse opacity-80"></div> */}
              <div className="w-52 h-20  flex items-center justify-center  overflow-hidden">
                {/* Added logo-nobg.png */}
                <img 
                  src={logo} 
                  alt="WorkEase Logo" 
                  className="w-full h-full object-contain p-1"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<span class="text-xl font-bold text-white">WE</span>';
                  }}
                />
              </div>
              <div className="absolute -inset-1 bg-neon-blue/20 blur-lg rounded-xl"></div>
            </div>
          
            
            {/* Additional Minimal Orange Element next to logo */}
          
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.submenu ? (
                  <>
                    <button 
                      onClick={() => setProductsOpen(!productsOpen)}
                      className="flex items-center text-gray-700 hover:text-neon-blue transition-all duration-300 group font-medium"
                    >
                      {item.name}
                      <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform" />
                    </button>
                    <AnimatePresence>
                      {productsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl p-2"
                        >
                          {item.submenu.map((subItem, index) => (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              className="block px-4 py-3 text-gray-700 hover:text-neon-blue hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium relative group"
                            >
                              {/* Minimal Orange Dot before submenu items */}
                              <div className="absolute left-2 top-4 w-1.5 h-1.5 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              <span className="ml-2">{subItem.name}</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className="text-gray-700 hover:text-neon-blue transition-all duration-300 relative group font-medium"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
                    {/* Minimal Orange Accent on Hover */}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-500 group-hover:w-2 transition-all duration-300 delay-75"></span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="px-6 py-2.5 text-gray-700 hover:text-neon-blue transition-all duration-300 font-medium"
            >
              Sign In
            </Link>
            <Link
              to="/demo"
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-600 text-white rounded-xl hover:shadow-[0_10px_30px_rgba(0,102,255,0.2)] hover:-translate-y-0.5 transition-all duration-300 font-semibold flex items-center relative overflow-hidden group"
            >
              {/* Minimal Orange Glow Effect */}
              <div className="absolute -right-4 top-0 w-8 h-full bg-gradient-to-r from-transparent via-orange-400/20 to-transparent skew-x-12 group-hover:right-full transition-all duration-700"></div>
              FREE DEMO
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {/* Mobile menu button with orange accent */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors relative group"
          >
            {/* Minimal Orange Dot on Mobile Menu Button */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {isOpen ? <X className="h-6 w-6 text-neon-blue" /> : <Menu className="h-6 w-6 text-gray-700" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border border-gray-100 rounded-xl shadow-xl mt-4 overflow-hidden relative"
            >
              {/* Minimal Orange Top Border */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-300"></div>
              
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.submenu ? (
                      <>
                        <button 
                          onClick={() => setProductsOpen(!productsOpen)}
                          className="flex items-center justify-between w-full text-gray-700 hover:text-neon-blue py-3 font-medium relative"
                        >
                          <div className="flex items-center">
                            {/* Orange indicator dot */}
                            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></div>
                            {item.name}
                          </div>
                          <ChevronDown className={`h-4 w-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {productsOpen && (
                          <div className="pl-4 space-y-3 mt-2 ml-2 border-l-2 border-orange-100">
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.path}
                                className="block text-gray-600 hover:text-neon-blue py-2 pl-4 relative"
                                onClick={() => setIsOpen(false)}
                              >
                                {/* Minimal Orange Bullet */}
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-orange-300 rounded-full"></div>
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        to={item.path}
                        className="block text-gray-700 hover:text-neon-blue py-3 font-medium relative pl-3"
                        onClick={() => setIsOpen(false)}
                      >
                        {/* Orange indicator line on hover */}
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0.5 h-0 bg-orange-400 group-hover:h-4 transition-all duration-300 rounded-full"></div>
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="pt-4 space-y-3 border-t border-gray-100">
                  <Link
                    to="/signin"
                    className="block text-center text-gray-700 hover:text-neon-blue py-2.5 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/demo"
                    className="block text-center bg-gradient-to-r from-cyan-400 to-blue-600 text-white rounded-xl py-3 font-semibold hover:shadow-[0_10px_30px_rgba(0,102,255,0.2)] transition-all duration-300 relative overflow-hidden group"
                    onClick={() => setIsOpen(false)}
                  >
                    {/* Orange glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    FREE DEMO
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;