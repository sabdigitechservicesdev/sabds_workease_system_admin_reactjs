import React, { useState } from 'react';
import { Mail, Lock, User, Building, MapPin, Hash, Globe } from 'lucide-react';
import { Input, Button, Form, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select;

const RegisterForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      
      const registerData = {
        admin_name: values.username,
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        password: values.password,
        role_code: values.role || 'AD',
        area: values.area,
        city: values.city,
        state: values.state,
        pincode: values.pincode,
      };

      const response = await axios.post('http://localhost:3000/api/auth/register', registerData);
      
      if (response.data.success) {
        setTimeout(() => navigate('/login'), 1000);
      }
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      size="middle"
    >
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {/* Personal Info */}
        <div className="grid grid-cols-2 gap-3">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'Please enter your first name' }]}
            className="mb-0"
          >
            <Input placeholder="John" size="small" />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: 'Please enter your last name' }]}
            className="mb-0"
          >
            <Input placeholder="Doe" size="small" />
          </Form.Item>
        </div>

        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please enter a username', min: 3 }]}
          className="mb-0"
        >
          <Input 
            prefix={<User className="w-3 h-3" />} 
            placeholder="johndoe" 
            size="small" 
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
          className="mb-0"
        >
          <Input 
            prefix={<Mail className="w-3 h-3" />} 
            placeholder="john@example.com" 
            size="small" 
          />
        </Form.Item>

        <div className="grid grid-cols-2 gap-3">
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please enter a password' },
              { min: 6, message: 'Password must be at least 6 characters' }
            ]}
            className="mb-0"
          >
            <Input.Password 
              prefix={<Lock className="w-3 h-3" />} 
              placeholder="••••••" 
              size="small" 
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]}
            className="mb-0"
          >
            <Input.Password 
              prefix={<Lock className="w-3 h-3" />} 
              placeholder="••••••" 
              size="small" 
            />
          </Form.Item>
        </div>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: 'Please select a role' }]}
          initialValue="AD"
          className="mb-0"
        >
          <Select size="small">
            <Option value="AD">Administrator</Option>
            <Option value="MN">Manager</Option>
            <Option value="SE">Engineer</Option>
            <Option value="HR">HR</Option>
            <Option value="AC">Accountant</Option>
          </Select>
        </Form.Item>

        {/* Address Info - Compact */}
        <div className="pt-2 border-t border-gray-100">
          <div className="text-sm font-medium mb-2">Address Information</div>
          
          <Form.Item
            name="area"
            label="Area/Street"
            rules={[{ required: true, message: 'Please enter area/street' }]}
            className="mb-0"
          >
            <Input 
              prefix={<MapPin className="w-3 h-3" />} 
              placeholder="Area/Street" 
              size="small" 
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-3">
            <Form.Item
              name="city"
              label="City"
              rules={[{ required: true, message: 'Please enter city' }]}
              className="mb-0"
            >
              <Input 
                prefix={<Building className="w-3 h-3" />} 
                placeholder="City" 
                size="small" 
              />
            </Form.Item>

            <Form.Item
              name="state"
              label="State"
              rules={[{ required: true, message: 'Please enter state' }]}
              className="mb-0"
            >
              <Input 
                prefix={<Globe className="w-3 h-3" />} 
                placeholder="State" 
                size="small" 
              />
            </Form.Item>
          </div>

          <Form.Item
            name="pincode"
            label="Pincode"
            rules={[
              { required: true, message: 'Please enter pincode' },
              { pattern: /^\d+$/, message: 'Pincode must contain only numbers' }
            ]}
            className="mb-0"
          >
            <Input 
              prefix={<Hash className="w-3 h-3" />} 
              placeholder="Pincode" 
              size="small" 
            />
          </Form.Item>
        </div>
      </div>

      <Form.Item className="mb-0 pt-4 ">
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          block
          className="h-9"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;