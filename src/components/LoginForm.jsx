import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { Input, Button, Form } from 'antd';
import axios from 'axios';

const LoginForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        identifier: values.identifier,
        password: values.password
      });

      if (response.data.success) {
        const token = response.data.data?.tokens?.accessToken;
        if (token) {
          localStorage.setItem('access_token', token);
          localStorage.setItem('user_info', JSON.stringify(response.data.data));
          window.location.href = '/dashboard';
        }
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      className="space-y-4"
      size="middle"
    >
      <Form.Item
        name="identifier"
        label="Email or Username"
        rules={[{ required: true, message: 'Please enter email or username' }]}
      >
        <Input
          prefix={<Mail className="w-4 h-4" />}
          placeholder="you@example.com"
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: 'Please enter password' }]}
      >
        <Input.Password
          prefix={<Lock className="w-4 h-4" />}
          placeholder="••••••••"
        />
      </Form.Item>

      <div className="flex items-center justify-between mt-6">
        <label className="flex items-center">
          <input type="checkbox" className="rounded border-gray-300" />
          <span className="ml-2 text-sm text-gray-600">Remember</span>
        </label>
        <button type="button" className="text-sm text-gray-600 hover:text-gray-800">
          Forgot?
        </button>
      </div>

      {/* Spacer to fill height in Login */}
      <div className="flex-1 min-h-[120px]"></div>

      <Form.Item className="mb-0 mt-auto">
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          block
          className="h-10"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;