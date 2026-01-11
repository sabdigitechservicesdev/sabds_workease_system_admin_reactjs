import React from 'react';
import { motion } from 'framer-motion';
import { Play, Calendar, Download, Clock, CheckCircle } from 'lucide-react';

const Demo = () => {
  const benefits = [
    'No credit card required',
    'Full platform access',
    '14-day free trial',
    'Priority support',
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <Play className="w-4 h-4 text-neon-blue mr-2" />
              <span className="text-neon-blue font-medium">Interactive Demo Available</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Experience{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                WorkEase Live
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8">
              See firsthand how WorkEase transforms workforce management. Our interactive demo showcases all features in action with sample data.
            </p>
            
            <div className="space-y-6 mb-8">
              {benefits.map((benefit, index) => (
                <div key={benefit} className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-600 text-white rounded-xl font-semibold hover:shadow-[0_10px_40px_rgba(0,102,255,0.3)] hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-blue-100">
                Start Free Demo
              </button>
              
              <button className="px-8 py-4 bg-white border-2 border-neon-blue text-neon-blue rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300">
                <span className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Live Demo
                </span>
              </button>
            </div>
            
            <div className="mt-8 flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2" />
              <span className="text-sm">Demo takes about 10 minutes</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xl shadow-blue-100">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 mb-6 border border-blue-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Demo Dashboard Preview</h4>
                    <p className="text-sm text-gray-600">Interactive sample data</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center shadow">
                    <Download className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="h-4 w-full bg-gray-200 rounded-full"></div>
                  <div className="h-4 w-3/4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="h-20 bg-gradient-to-br from-blue-100 to-white rounded-lg border border-blue-200"></div>
                  <div className="h-20 bg-gradient-to-br from-blue-100 to-white rounded-lg border border-blue-200"></div>
                  <div className="h-20 bg-gradient-to-br from-blue-100 to-white rounded-lg border border-blue-200"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                  <div className="text-2xl font-bold text-neon-blue mb-2">40%</div>
                  <div className="text-sm text-gray-600">Average Cost Reduction</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                  <div className="text-2xl font-bold text-neon-blue mb-2">60%</div>
                  <div className="text-sm text-gray-600">Time Saved on Scheduling</div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl rotate-12 shadow-xl shadow-cyan-200"
            ></motion.div>
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 0.3 }}
              className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl -rotate-12 shadow-xl shadow-blue-200"
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Demo;