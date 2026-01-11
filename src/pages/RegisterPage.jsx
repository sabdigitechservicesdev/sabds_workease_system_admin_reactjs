import React, { useState, useEffect } from 'react';
import RegisterForm from '../components/RegisterForm';
import logo from '../assets/logo-nobg.png';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Users, Settings, BarChart } from 'lucide-react';

const RegisterPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: <Shield className="w-5 h-5 text-blue-600" />,
      title: "Enterprise Security",
      description: "Bank-level encryption and compliance"
    },
    {
      icon: <Users className="w-5 h-5 text-indigo-600" />,
      title: "Team Collaboration",
      description: "Seamless team management tools"
    },
    {
      icon: <Settings className="w-5 h-5 text-purple-600" />,
      title: "Advanced Features",
      description: "Custom workflows & automation"
    },
    {
      icon: <BarChart className="w-5 h-5 text-green-600" />,
      title: "Real-time Analytics",
      description: "Comprehensive reporting dashboard"
    }
  ];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column - Registration Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-full h-full  flex items-center justify-center ">
                    <img src={logo} alt="WorkEase" className="w-56 h-16" />
                  </div>
                  {/* <div>
                    <h1 className="text-xl font-bold text-gray-900">WorkEase</h1>
                    <p className="text-sm text-gray-500">Professional Suite</p>
                  </div> */}
                </div>
                <a 
                  href="/login" 
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft size={16} />
                  Back to Login
                </a>
              </div>

              {/* Registration Form */}
              <div className="mb-4">
                <div className="text-center mb-2">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
                  <p className="text-gray-600">Setup your professional workspace in minutes</p>
                </div>
                <div className="h-[420px]">
                  <RegisterForm />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Information */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-xl p-8 h-full text-white">
              <div className="h-full flex flex-col">
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white/90 mb-4">Why WorkEase?</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Join thousands of teams using WorkEase to streamline their operations, 
                    enhance productivity, and drive business growth.
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-1">{feature.title}</h4>
                        <p className="text-xs text-gray-300">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-auto">
                  <div className="border-t border-white/10 pt-6">
                    <div className="text-center">
                      <h4 className="text-sm font-medium text-white/90 mb-3">Trusted by Industry Leaders</h4>
                      <div className="flex items-center justify-center gap-6 opacity-80">
                        <div className="text-xs font-medium text-white/70">Google Cloud</div>
                        <div className="text-xs font-medium text-white/70">Microsoft</div>
                        <div className="text-xs font-medium text-white/70">AWS</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <p className="text-xs text-gray-400">
                      © 2024 WorkEase Professional Suite. All rights reserved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;