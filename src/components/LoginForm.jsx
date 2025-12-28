import React, { useState } from 'react';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { Input, Button, Form, Alert as AntAlert, notification } from 'antd';
import authService from '../services/authService';

const LoginForm = ({ onLoginSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const showSuccessNotification = () => {
    notification.success({
      message: 'Login Successful',
      description: 'Redirecting to dashboard...',
      placement: 'topRight',
      duration: 3,
    });
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      setError('');
      
      const { identifier, password } = values;
      
      // ✅ ADD DEBUG LOGGING
      console.log('Login attempt:', { identifier });
      
      const response = await authService.login(identifier, password);
      
      // ✅ DEBUG: Check response structure
      console.log('Login response:', response);
      console.log('Response success?', response.success);
      console.log('Token in response?', response.data?.tokens?.accessToken);
      
      if (response.success) {
        // ✅ DEBUG: Check localStorage
        const token = localStorage.getItem('access_token');
        console.log('Token saved to localStorage?', !!token);
        console.log('Token value:', token ? token.substring(0, 30) + '...' : 'None');
        
        const userInfo = localStorage.getItem('user_info');
        console.log('User info saved?', !!userInfo);
        console.log('User info:', userInfo);
        
        // Show success notification
        showSuccessNotification();
        
        // ✅ ADD REDIRECT WITH TIMEOUT DEBUG
        console.log('Will redirect to /dashboard in 1 second...');
        
        // Redirect after successful login
        setTimeout(() => {
          console.log('Redirecting now...');
          window.location.href = '/dashboard';
        }, 1000);
      } else {
        // ✅ Handle case where response.success is false
        console.error('Login response success false:', response);
        setError(response.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error details:', error);
      console.error('Error message:', error.message);
      console.error('Error response:', error.response?.data);
      
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ ADD TEST BUTTON FOR MANUAL LOGIN
  const testManualLogin = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: 'subhajitmajumder147@gmail.com',
          password: 'Test@1234'
        })
      });
      
      const data = await response.json();
      console.log('Manual login response:', data);
      
      if (data.success && data.data?.tokens?.accessToken) {
        localStorage.setItem('access_token', data.data.tokens.accessToken);
        localStorage.setItem('user_info', JSON.stringify(data.data));
        console.log('✅ Manual login successful! Token saved.');
        showSuccessNotification();
        
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
      } else {
        setError(data.message || 'Manual login failed');
      }
    } catch (error) {
      console.error('Manual login error:', error);
      setError('Manual login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg ">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-4">
          <LogIn className="w-6 h-6 text-primary-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome to Admin Portal</h1>
        <p className="text-gray-600 mt-2">Sign in to your account</p>
        
        {/* ✅ ADD DEBUG SECTION */}
        <div className="mt-4 p-2 bg-gray-50 rounded text-left text-xs">
          <p className="font-semibold">Debug Info:</p>
          <p>Token in localStorage: {localStorage.getItem('access_token') ? '✅ Yes' : '❌ No'}</p>
          <button 
            onClick={() => {
              console.log('Current localStorage:', {
                token: localStorage.getItem('access_token'),
                user_info: localStorage.getItem('user_info')
              });
            }}
            className="text-blue-500 hover:underline mt-1"
          >
            Check localStorage
          </button>
        </div>
      </div>

      {error && (
        <AntAlert
          message="Login Failed"
          description={error}
          type="error"
          showIcon
          icon={<AlertCircle />}
          className="mb-6"
        />
      )}

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="space-y-6"
      >
        <Form.Item
          name="identifier"
          label="Email or Username"
          rules={[
            { required: true, message: 'Please enter your email or username' },
            { min: 3, message: 'Must be at least 3 characters' }
          ]}
          initialValue="subhajitmajumder147@gmail.com" // ✅ ADD DEFAULT FOR TESTING
        >
          <Input
            prefix={<Mail className="w-4 h-4 text-gray-400" />}
            placeholder="Enter email or username"
            size="large"
            autoComplete="username"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: 'Please enter your password' },
            { min: 6, message: 'Password must be at least 6 characters' }
          ]}
          initialValue="Test@1234" // ✅ ADD DEFAULT FOR TESTING
        >
          <Input.Password
            prefix={<Lock className="w-4 h-4 text-gray-400" />}
            placeholder="Enter your password"
            size="large"
            autoComplete="current-password"
          />
        </Form.Item>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <a href="#" className="text-sm text-primary-600 hover:text-primary-500">
            Forgot password?
          </a>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            block
            className="bg-primary-600 hover:bg-primary-700"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
          
          {/* ✅ ADD TEST BUTTON */}
          <div className="mt-4">
            <Button
              type="dashed"
              size="large"
              onClick={testManualLogin}
              block
              className="text-gray-600 border-gray-300"
            >
              Test Manual Login (SA User)
            </Button>
            <p className="text-xs text-gray-500 mt-1 text-center">
              Uses: subhajitmajumder147@gmail.com / Test@1234
            </p>
          </div>
        </Form.Item>
      </Form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-primary-600 hover:text-primary-500 font-medium">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;