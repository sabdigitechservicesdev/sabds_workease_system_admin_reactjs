import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { Input, Button, Form, message } from 'antd';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      
      const response = await axios.post('http://localhost:3000/api/system-admin/auth/login', {
        identifier: values.identifier,
        password: values.password
      });

      // Check response structure - based on your backend response
      if (response.data.status === 1) { // Backend returns status: 1 for success
        const encryptedToken = response.data.data?.encryptedToken; // Field name from your response
        
        if (encryptedToken) {
          localStorage.setItem('access_token', encryptedToken);
          localStorage.setItem('user_info', JSON.stringify(response.data.data));
          
          // Show success message
          message.success(response.data.message || 'Login successful');
          
          // Use navigate for React Router
          navigate('/dashboard');
          
          // Alternative: Use setTimeout with window.location for guaranteed redirect
          // setTimeout(() => {
          //   window.location.href = '/dashboard';
          // }, 500);
        } else {
          message.error('Login successful but token missing');
        }
      } else {
        message.error(response.data.message || 'Login failed');
      }
    } catch (error) {
      message.error(error.response?.data?.message || 'Login failed');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full"
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
            <a href="/forgot-password" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
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
              <a href="#" className="font-medium text-blue-600 hover:text-blue-800 hover:underline">
                Contact admin
              </a>
            </p>
          </div>
        </div>
      </Form>
    </motion.div>
  );
};

export default LoginForm;