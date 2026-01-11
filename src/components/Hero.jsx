import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-5 bg-white">
      {/* Background Elements */}
      {/* <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-50"></div> */}
      
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(90deg, transparent 95%, rgba(0,102,255,0.1) 100%),
                           linear-gradient(0deg, transparent 95%, rgba(0,102,255,0.1) 100%)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm mb-6"
            >
              <span className="w-2 h-2 bg-neon-blue rounded-full mr-2 animate-pulse"></span>
              <span className="text-neon-blue font-medium">Streamline Your Operations</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-orange-500"
            >
              Easy your Work
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                with WorkEase
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className=" text-gray-600 mb-8 leading-relaxed"
            >
              <span className="text-blue-500 font-semibold">Reduces personnel costs</span> and saves time through automation of human resource management. Streamline scheduling, attendance, and operations across various sectors.
            </motion.p>
            
            {/* Feature Points */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-3 mb-8"
            >
              {['Automated Scheduling', 'Real-time Attendance', 'Cost Reduction up to 40%', 'Dual Platform (Web + App)'].map((feature) => (
                <div key={feature} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <button className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-[0_10px_40px_rgba(0,102,255,0.3)] hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-blue-100">
                <span className="flex items-center">
                  FREE DEMO
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </span>
              </button>
              
              <button className="group flex items-center px-6 py-4 bg-white border border-gray-200 text-gray-700 rounded-xl hover:border-neon-blue hover:text-neon-blue transition-all duration-300 shadow-sm">
                <Play className="mr-3 h-5 w-5" />
                Watch Demo
              </button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-12 flex items-center space-x-4 text-gray-600"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 border-2 border-white shadow"></div>
                ))}
              </div>
              <div>
                <p className="text-sm font-medium">Join <span className="text-neon-blue font-semibold">500+</span> companies</p>
                <p className="text-xs text-gray-500">Already using WorkEase</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - App Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white rounded-2xl p-8 shadow-2xl shadow-blue-100 border border-gray-100">
              {/* Dashboard Preview */}
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 mb-4 border border-blue-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-sm text-neon-blue font-semibold">WorkEase Dashboard</div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="h-2 w-24 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mb-2"></div>
                      <div className="h-2 w-16 bg-gray-300 rounded-full"></div>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 shadow"></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="h-2 w-16 bg-gray-300 rounded-full mb-3"></div>
                      <div className="h-2 w-20 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="h-2 w-16 bg-gray-300 rounded-full mb-3"></div>
                      <div className="h-2 w-20 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Features Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-xl p-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mb-3 shadow">
                    <div className="w-4 h-4 bg-white rounded"></div>
                  </div>
                  <div className="h-2 w-16 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-xl p-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-3 shadow">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="h-2 w-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-xl rotate-12 shadow-xl shadow-blue-200"
            ></motion.div>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl -rotate-12 shadow-xl shadow-cyan-100"
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;