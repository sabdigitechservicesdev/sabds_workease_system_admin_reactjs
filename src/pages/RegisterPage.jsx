import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  User, 
  UserPlus, 
  AlertCircle,
  MapPin,
  
  Globe,
  Hash,
  Building
} from 'lucide-react';
import { Input, Button, Form, Alert as AntAlert, notification, Select } from 'antd';
import authService from '../services/authService';

const { Option } = Select;

const RegisterForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAddress, setShowAddress] = useState(false);

  const showSuccessNotification = (message) => {
    notification.success({
      message: message || 'Registration Successful',
      description: 'You can now login to your account',
      placement: 'topRight',
      duration: 5,
    });
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      setError('');
      
      console.log('Registration attempt:', values);
      
      // Prepare data for backend
      const registerData = {
        admin_name: values.username,
        first_name: values.firstName,
        middle_name: values.middleName || '',
        last_name: values.lastName,
        email: values.email,
        password: values.password,
        role_code: values.role || 'AD', // Default to AD (Admin)
      };

      // Add address if provided
      if (showAddress && values.area && values.city && values.state && values.pincode) {
        registerData.area = values.area;
        registerData.city = values.city;
        registerData.state = values.state;
        registerData.pincode = values.pincode;
      }

      // Call register API
      const response = await authService.register(registerData);
      
      if (response.success) {
        console.log('Registration response:', response);
        showSuccessNotification('Registration Successful!');
        
        // Clear form
        form.resetFields();
        setShowAddress(false);
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);
      } else {
        setError(response.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleAddressSection = () => {
    setShowAddress(!showAddress);
  };

  // Role options
  const roleOptions = [
    { value: 'AD', label: 'Admin', description: 'System administrator with full access' },
    { value: 'MN', label: 'Manager', description: 'Manage teams and schedules' },
    { value: 'HR', label: 'Human Resources', description: 'HR management access' },
    { value: 'SE', label: 'Software Engineer', description: 'Technical team member' },
    { value: 'AC', label: 'Accountant', description: 'Financial management access' },
  ];

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
          <UserPlus className="w-6 h-6 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
        <p className="text-gray-600 mt-2">Sign up for a new administrator account</p>
      </div>

      {error && (
        <AntAlert
          message="Registration Failed"
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
        className="space-y-4"
      >
        {/* Personal Information */}
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'Please enter first name' }]}
          >
            <Input
              prefix={<User className="w-4 h-4 text-gray-400" />}
              placeholder="First name"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: 'Please enter last name' }]}
          >
            <Input
              prefix={<User className="w-4 h-4 text-gray-400" />}
              placeholder="Last name"
              size="large"
            />
          </Form.Item>
        </div>

        <Form.Item
          name="middleName"
          label="Middle Name (Optional)"
        >
          <Input
            prefix={<User className="w-4 h-4 text-gray-400" />}
            placeholder="Middle name"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="username"
          label="Username"
          rules={[
            { required: true, message: 'Please choose a username' },
            { min: 3, message: 'Username must be at least 3 characters' },
            { pattern: /^[a-zA-Z0-9_]+$/, message: 'Only letters, numbers and underscore allowed' }
          ]}
        >
          <Input
            prefix={<User className="w-4 h-4 text-gray-400" />}
            placeholder="Choose a username"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input
            prefix={<Mail className="w-4 h-4 text-gray-400" />}
            placeholder="Enter your email"
            size="large"
            type="email"
          />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please enter password' },
              { min: 6, message: 'Password must be at least 6 characters' }
            ]}
          >
            <Input.Password
              prefix={<Lock className="w-4 h-4 text-gray-400" />}
              placeholder="Create password"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<Lock className="w-4 h-4 text-gray-400" />}
              placeholder="Confirm password"
              size="large"
            />
          </Form.Item>
        </div>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: 'Please select a role' }]}
          initialValue="AD"
        >
          <Select 
            size="large" 
            placeholder="Select your role"
            optionLabelProp="label"
          >
            {roleOptions.map(role => (
              <Option key={role.value} value={role.value} label={role.label}>
                <div>
                  <div className="font-medium">{role.label}</div>
                  <div className="text-xs text-gray-500">{role.description}</div>
                </div>
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Address Section - Optional */}
        <div className="border-t pt-4 mt-4">
          <button
            type="button"
            onClick={toggleAddressSection}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-2"
          >
            <MapPin className="w-4 h-4 mr-2" />
            {showAddress ? 'Hide Address Section' : 'Add Address (Optional)'}
          </button>
          
          {showAddress && (
            <div className="space-y-4 animate-fadeIn">
              <Form.Item
                name="area"
                label="Area/Street"
              >
                <Input
                  prefix={<MapPin className="w-4 h-4 text-gray-400" />}
                  placeholder="Area or street"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="city"
                label="City"
              >
                <Input
                  prefix={<Building className="w-4 h-4 text-gray-400" />}
                  placeholder="City"
                  size="large"
                />
              </Form.Item>

              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  name="state"
                  label="State"
                >
                  <Input
                    prefix={<Globe className="w-4 h-4 text-gray-400" />}
                    placeholder="State"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  name="pincode"
                  label="Pincode"
                >
                  <Input
                    prefix={<Hash className="w-4 h-4 text-gray-400" />}
                    placeholder="Pincode"
                    size="large"
                  />
                </Form.Item>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6">
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              block
              className="bg-green-600 hover:bg-green-700"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </Form.Item>

          <div className="text-center mt-4">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a 
                href="/login" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </Form>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default RegisterForm;