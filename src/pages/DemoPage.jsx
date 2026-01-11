import React from 'react';
import { motion } from 'framer-motion';
import { Play, Download, Calendar, Shield, Zap, Users } from 'lucide-react';
import Navbar from '../components/Navbar';

const DemoPage = () => {
  return (
<>
    <div className="min-h-screen bg-white">
        <Navbar />
        <main>
                <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Interactive Demo
            </span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Experience the full power of WorkEase with our interactive demo
          </p>
        </motion.div>

        {/* Demo Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Demo Options */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-glass to-glass-dark backdrop-blur-xl rounded-2xl p-8 border border-neon-blue/20">
              <div className="aspect-video  rounded-xl mb-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center">
                    <Play className="w-10 h-10 text-white " />
                  </div>
                  <h3 className="text-2xl font-bold  mb-2">Interactive Demo</h3>
                  <p className="text-gray-700">Click play to start the guided tour</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <button className="p-6 bg-gradient-to-br from-cyan-400/10 to-transparent border border-neon-blue/20 rounded-xl hover:border-neon-blue transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold ">Scheduling Demo</h4>
                      <p className="text-sm text-gray-700">Try smart scheduling</p>
                    </div>
                  </div>
                </button>
                
                <button className="p-6 bg-gradient-to-br from-cyan-400/10 to-transparent border border-neon-blue/20 rounded-xl hover:border-neon-blue transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold ">Attendance Demo</h4>
                      <p className="text-sm text-gray-700">Test attendance features</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Demo Features */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-glass to-glass-dark backdrop-blur-xl rounded-2xl p-6 border border-neon-blue/20">
              <h3 className="text-xl font-bold  mb-4">Demo Features</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Zap className="w-5 h-5 text-neon-blue mr-3" />
                  <span className="text-gray-600">Full platform access</span>
                </li>
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-neon-blue mr-3" />
                  <span className="text-gray-600">Secure sandbox environment</span>
                </li>
                <li className="flex items-center">
                  <Download className="w-5 h-5 text-cyan-600 mr-3" />
                  <span className="text-gray-600">Sample data included</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-glass to-glass-dark backdrop-blur-xl rounded-2xl p-6 border border-neon-blue/20">
              <h3 className="text-xl font-bold mb-4">Get Started</h3>
              <button className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-600 text-white rounded-lg font-semibold mb-4 hover:shadow-[0_0_20px_rgba(0,230,255,0.5)] transition-all duration-300">
                Start Free Demo
              </button>
              <button className="w-full py-3 bg-glass border border-neon-blue/30 text-gray-600 rounded-lg hover:text-black hover:border-neon-blue transition-all duration-300">
                Schedule Live Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
        </main>
    </div>
</>
  );
};

export default DemoPage;