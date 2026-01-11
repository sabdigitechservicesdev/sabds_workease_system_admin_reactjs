import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, Smartphone, BarChart3, Shield, Zap, Cloud } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'Automated scheduling across multiple sectors with intelligent shift management',
      gradient: 'from-cyan-400 to-blue-500'
    },
    {
      icon: Users,
      title: 'Attendance Tracking',
      description: 'Real-time attendance monitoring with biometric and mobile check-ins',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Clock,
      title: 'Time Optimization',
      description: 'Reduce personnel costs by up to 40% with automated workflows',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Smartphone,
      title: 'Dual Platform',
      description: 'Web portal and mobile app for seamless management anywhere',
      gradient: 'from-purple-500 to-indigo-500'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Comprehensive insights into workforce productivity and costs',
      gradient: 'from-orange-500 to-amber-500'
    },
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: 'Enterprise-grade security with compliance management',
      gradient: 'from-red-500 to-rose-500'
    },
    {
      icon: Zap,
      title: 'Automation',
      description: 'Automate repetitive HR tasks and save valuable time',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Cloud,
      title: 'Cloud Based',
      description: 'Access your data securely from anywhere, anytime',
      gradient: 'from-sky-500 to-blue-400'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-orange-500">
            Powerful Features for{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Modern Workforce
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to streamline your workforce management in one powerful platform
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative"
            >
              <div className="relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-neon-blue/50 hover:shadow-xl hover:shadow-blue-100 transition-all duration-300 h-full">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-3 mb-6 shadow-lg`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                <div className="mt-6 pt-6 border-t border-gray-100 group-hover:border-neon-blue/20 transition-colors">
                  <button className="text-neon-blue hover:text-blue-700 transition-colors duration-300 font-medium text-sm flex items-center">
                    Learn more
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;