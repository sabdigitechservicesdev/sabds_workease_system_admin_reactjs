import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Calendar, Users, BarChart, Settings, Shield, Zap } from 'lucide-react';

const Products = () => {
  const products = [
    {
      icon: Globe,
      title: 'Web Portal',
      description: 'Comprehensive web-based management portal with real-time analytics and admin controls',
      features: ['Real-time Dashboard', 'Advanced Reporting', 'Admin Controls', 'Integration Hub'],
      color: 'neon-blue'
    },
    {
      icon: Smartphone,
      title: 'Mobile App',
      description: 'On-the-go workforce management with push notifications and mobile attendance',
      features: ['Mobile Attendance', 'Schedule View', 'Task Management', 'Push Notifications'],
      color: 'blue-500'
    },
    {
      icon: Calendar,
      title: 'Scheduling System',
      description: 'Intelligent scheduling for various sectors with automation and conflict detection',
      features: ['Smart Shift Planning', 'Resource Allocation', 'Conflict Detection', 'Auto-scheduling'],
      color: 'purple-500'
    },
    {
      icon: Users,
      title: 'Attendance Suite',
      description: 'Multi-modal attendance tracking with advanced analytics and compliance',
      features: ['Biometric Integration', 'GPS Tracking', 'Compliance Reports', 'Real-time Monitoring'],
      color: 'green-500'
    }
  ];

  const highlights = [
    { icon: BarChart, text: '40% Cost Reduction' },
    { icon: Settings, text: 'Easy Integration' },
    { icon: Shield, text: 'Enterprise Security' },
    { icon: Zap, text: 'Fast Implementation' },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-orange-500">
            Complete{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Workforce Solution
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            End-to-end platform designed to optimize your workforce management across all sectors
          </p>
        </motion.div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {highlights.map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <p className="font-semibold text-gray-800">{item.text}</p>
            </div>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-neon-blue/50 hover:shadow-xl hover:shadow-blue-100 transition-all duration-300 h-full">
                <div className="flex items-start space-x-6">
                  <div className={`w-20 h-20 rounded-xl bg-gradient-to-br from-${product.color} to-${product.color}/80 p-5 shadow-lg`}>
                    <product.icon className="w-full h-full text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{product.title}</h3>
                    <p className="text-gray-600 mb-6">{product.description}</p>
                    
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {product.features.map((feature) => (
                        <div key={feature} className="flex items-center">
                          <div className={`w-2 h-2 bg-${product.color} rounded-full mr-3`}></div>
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-6 border-t border-gray-100">
                      <button className={`px-6 py-2.5 bg-gradient-to-r from-${product.color} to-${product.color}/80 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-${product.color}/20 hover:-translate-y-0.5 transition-all duration-300`}>
                        View Demo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-cyan-400 to-blue-600 rounded-2xl p-12 shadow-xl shadow-blue-200">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Workforce?</h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join 500+ companies already saving time and reducing costs with WorkEase
            </p>
            <button className="px-8 py-4 bg-white text-neon-blue rounded-xl font-bold hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-lg">
              Start Your Free Trial
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;