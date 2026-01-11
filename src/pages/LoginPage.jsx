import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { Input, Button, Form, message } from 'antd';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from '../assets/logo-nobg.png';
import dashboardImg from '../assets/dash-demo.png';

const LoginPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      
      const response = await axios.post('http://localhost:3000/api/system-admin/auth/login', {
        identifier: values.identifier,
        password: values.password
      });

      console.log('Login response:', response.data); // Debug log

      // Check response structure based on your backend
      if (response.data.status === 1 || response.data.success) { 
        const token = response.data?.encryptedToken || 
                     response.data?.tokens?.accessToken ||
                     response.data.token;
        
        console.log('Token found:', token); // Debug log
        
        if (token) {
          localStorage.setItem('access_token', token);
          localStorage.setItem('user_info', JSON.stringify(response.data.data || response.data));
          
          // Show success message
          message.success(response.data.message || 'Login successful!');
          
          // Navigate to dashboard
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
          
        } else {
          message.error('Login successful but token missing');
          console.error('Token not found in response:', response.data);
        }
      } else {
        message.error(response.data.message || 'Login failed. Please check credentials.');
      }
    } catch (error) {
      console.error('Login error:', error.response || error);
      
      // Better error handling
      if (error.response) {
        // Server responded with error status
        message.error(error.response.data?.message || 
                     error.response.data?.error || 
                     `Login failed: ${error.response.status}`);
      } else if (error.request) {
        // Request was made but no response
        message.error('Network error. Please check your connection.');
      } else {
        // Something else happened
        message.error('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl"
      >
        <div className="bg-white overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[680px]">
            
            {/* LEFT SIDE - Login Form */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 p-8 lg:p-10 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="h-full w-full flex items-center justify-center">
                    <img src={logo} alt="Logo" className="w-40 h-10" />
                  </div>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/register')}
                  className="text-sm font-medium px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-600 hover:from-cyan-100 hover:to-blue-100 transition-all duration-200 border border-cyan-100"
                >
                  Create account →
                </motion.button>
              </div>

              {/* Centered Title */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome back
                  </h1>
                  <p className="text-gray-600">
                    Sign in to continue to your dashboard
                  </p>
                </motion.div>
              </div>

              {/* Form Container */}
              <div className="flex-1 flex flex-col">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1"
                >
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    className="h-full flex flex-col"
                    size="middle"
                  >
                    <div className="flex-1 space-y-4">
                      <Form.Item
                        name="identifier"
                        label={<span className="text-xs font-medium text-gray-700">Email or Username</span>}
                        rules={[{ required: true, message: 'Required' }]}
                        className="mb-0"
                      >
                        <Input
                          prefix={<Mail className="w-3 h-3 text-gray-400" />}
                          placeholder="Enter email or username"
                          className="rounded-lg h-10 bg-white border-gray-300 transition-colors"
                          size="middle"
                        />
                      </Form.Item>

                      <Form.Item
                        name="password"
                        label={<span className="text-xs font-medium text-gray-700">Password</span>}
                        rules={[{ required: true, message: 'Required' }]}
                        className="mb-0"
                      >
                        <Input.Password
                          prefix={<Lock className="w-3 h-3 text-gray-400" />}
                          placeholder="Enter your password"
                          className="rounded-lg h-10 border-gray-300 bg-white transition-colors"
                          size="middle"
                        />
                      </Form.Item>

                      <div className="flex items-center justify-between text-xs">
                        <label className="flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="ml-1.5 text-gray-600">Remember me</span>
                        </label>
                        <a 
                          href="/forgot-password" 
                          onClick={(e) => {
                            e.preventDefault();
                            navigate('/forgot-password');
                          }}
                          className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                        >
                          Forgot password?
                        </a>
                      </div>
                    </div>

                    <div className="pt-4 mt-auto">
                      <Form.Item className="mb-0">
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={loading}
                          block
                          className="h-10 rounded-lg font-medium text-sm bg-gradient-to-r from-cyan-500 to-blue-600 border-none hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-sm hover:shadow"
                        >
                          {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                      </Form.Item>

                      <div className="text-center pt-3">
                        <p className="text-xs text-gray-500">
                          Need an account?{' '}
                          <a 
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              // You can add contact admin logic here
                              message.info('Please contact system administrator for account creation.');
                            }}
                            className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            Contact admin
                          </a>
                        </p>
                      </div>
                    </div>
                  </Form>
                </motion.div>
              </div>

              {/* Footer */}
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xs text-gray-500 text-center mt-8 pt-6 border-t border-gray-100"
              >
                ©2026 SAB Digitech Services. All rights reserved.
              </motion.p>
            </motion.div>

            {/* RIGHT SIDE - Dashboard Preview */}
            <motion.div 
              key="login-visual"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3 rounded-r-3xl hidden lg:block relative overflow-hidden bg-gradient-to-br from-cyan-500 rounded-2xl via-blue-500 to-blue-600"
            >
              {/* Animated Background */}
              <div className="absolute inset-0">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-400/30 to-blue-500/30"
                />
              </div>

              {/* Floating Elements */}
              <motion.div 
                animate={{ 
                  y: [0, -20, 0],
                  x: [0, 10, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl"
              />
              
              <motion.div 
                animate={{ 
                  y: [0, 20, 0],
                  x: [0, -10, 0]
                }}
                transition={{ 
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -bottom-32 -left-32 w-80 h-80 bg-cyan-300/10 rounded-full blur-3xl"
              />

              <div className="relative h-full flex flex-col justify-between p-10 text-white">
                {/* Logo Area */}
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-4"
                >
                  <motion.div
                    whileHover={{ rotate: 180, scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    className="w-64 h-20 flex items-center justify-center"
                  >
                    <img src={logo} alt="Logo" className="w-64 h-16" />
                  </motion.div>
                  <div>
                    <p className="text-sm text-white/70 mt-1">Professional Scheduler</p>
                  </div>
                </motion.div>

                {/* Main Content */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-10"
                >
                  <h1 className="text-3xl font-bold leading-tight mb-4">
                    Transform Your <br />
                    <span className="text-cyan-200">Team Productivity</span>
                  </h1>
                  <p className="text-white/80 text-sm max-w-md leading-relaxed">
                    Advanced scheduling platform with real-time analytics, team collaboration, 
                    and automated workflow management.
                  </p>
                </motion.div>

                {/* Dashboard Preview */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="relative mt-8"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <img
                      src={dashboardImg}
                      alt="Dashboard Preview"
                      className="rounded-2xl shadow-2xl border-2 border-white/20"
                    />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;