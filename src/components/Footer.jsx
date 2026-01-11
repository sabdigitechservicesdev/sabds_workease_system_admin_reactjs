import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, MessageCircle } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    Product: ['Features', 'Pricing', 'Demo', 'API', 'Mobile App'],
    Solutions: ['Scheduling', 'Attendance', 'HR Automation', 'Analytics', 'Integration'],
    Company: ['About Us', 'Careers', 'Blog', 'Press', 'Partners'],
    Support: ['Help Center', 'Contact', 'Privacy', 'Terms', 'Documentation']
  };

  const contactInfo = [
    { icon: Mail, text: 'support@workease.com' },
    { icon: Phone, text: '+1 (555) 123-4567' },
    { icon: MapPin, text: '123 Tech Street, Digital City' }
  ];

  const socialIcons = [
    { icon: Facebook, color: 'hover:bg-blue-100 hover:text-blue-600' },
    { icon: Twitter, color: 'hover:bg-sky-100 hover:text-sky-600' },
    { icon: Linkedin, color: 'hover:bg-blue-100 hover:text-blue-700' },
    { icon: Instagram, color: 'hover:bg-pink-100 hover:text-pink-600' },
    { icon: MessageCircle, color: 'hover:bg-green-100 hover:text-green-600' }
  ];

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 pt-20 pb-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow">
                <span className="text-2xl font-bold text-white">WE</span>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                WorkEase
              </span>
            </div>
            <p className="text-gray-600 mb-8 max-w-md">
              Streamlining workforce management through intelligent automation and real-time insights for businesses of all sizes.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <info.icon className="w-5 h-5 text-neon-blue" />
                  </div>
                  <span className="text-gray-700">{info.text}</span>
                </div>
              ))}
            </div>
            
            <div className="flex space-x-4">
              {socialIcons.map((social, index) => (
                <motion.a
                  key={index}
                  whileHover={{ y: -3 }}
                  href="#"
                  className={`w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 ${social.color} transition-all duration-300 shadow-sm`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-6">{category}</h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-neon-blue transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 p-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-100"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Stay Updated</h3>
              <p className="text-gray-600">Subscribe to our newsletter for the latest updates and tips.</p>
            </div>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-3 rounded-l-xl border border-gray-300 focus:outline-none focus:border-neon-blue"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-600 text-white rounded-r-xl font-semibold hover:shadow-lg hover:shadow-blue-200 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 mb-4 md:mb-0">
              <p>© {new Date().getFullYear()} WorkEase. All rights reserved.</p>
              <p className="text-sm mt-2">
                <span className="text-neon-blue font-medium">Developed by </span>
                <span className="font-semibold text-gray-900">SAB Digitech Services</span>
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6">
              <a href="#" className="text-gray-600 hover:text-neon-blue transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-neon-blue transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 hover:text-neon-blue transition-colors text-sm">
                Cookie Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-neon-blue transition-colors text-sm">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;