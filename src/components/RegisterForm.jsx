import React, { useState, useRef, useEffect } from 'react';
import { Mail, Lock, User, Building, MapPin, Hash, Globe, UserPlus, Phone, Calendar, CheckCircle, ArrowLeft, ArrowRight, Check, RotateCcw, Edit2 } from 'lucide-react';
import { Input, Button, Form, Select, DatePicker, message, InputNumber } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';

import axios from 'axios';

const { Option } = Select;

const RegisterForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [emailVerified, setEmailVerified] = useState(false);
  const [verifyingEmail, setVerifyingEmail] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(0);
  const [processId, setProcessId] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState('');
  
  // Store all form data in state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    firstName: '',
    lastName: '',
    middle_name: '',
    phone: '',
    dob: null,
    role: 'AD',
    area: '',
    city: '',
    state: '',
    pincode: ''
  });
  
  const otpInputRefs = useRef([]);

  const steps = [
    { title: 'Account', icon: <User size={14} />, description: 'Login details' },
    { title: 'Personal', icon: <UserPlus size={14} />, description: 'About you' },
    { title: 'Address', icon: <MapPin size={14} />, description: 'Location info' },
  ];

  // Handle email change
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmailValue(value);
    setFormData(prev => ({ ...prev, email: value }));
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(value));
    
    if (emailVerified && value !== verifiedEmail) {
      setEmailVerified(false);
      setVerifiedEmail('');
      setProcessId('');
      setShowOtpInput(false);
    }
  };

  // Update form data when any field changes
  const handleFormChange = (changedValues, allValues) => {
    setFormData(prev => ({ ...prev, ...changedValues }));
  };

  // Send OTP API
  const sendOtpToEmail = async (email) => {
    try {
      setVerifyingEmail(true);
      
      const deviceInfo = {
        userAgent: navigator.userAgent,
        ipAddress: 'client-ip',
        deviceName: 'Browser'
      };
      
      const response = await axios.post('http://localhost:3000/api/system-admin/otp/send-otp', {
        identifier: email,
        isUnregistered: true,
        deviceInfo: deviceInfo
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.status === 1) {
        const { data } = response.data;
        setProcessId(data.processId);
        
        setShowOtpInput(true);
        startCountdown();
        message.success('OTP sent to your email!');
        return true;
      } else {
        throw new Error(response.data.message || 'Failed to send OTP');
      }
      
    } catch (error) {
      console.error('OTP sending error:', error);
      
      let errorMessage = 'Failed to send OTP. Please try again.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      message.error(errorMessage);
      return false;
    } finally {
      setVerifyingEmail(false);
    }
  };

  // Verify OTP API
  const verifyOtpApi = async (otpCode) => {
    try {
      setVerifyingOtp(true);
      
      if (!processId) {
        message.error('Process ID not found. Please request a new OTP.');
        return false;
      }
      
      const deviceInfo = {
        userAgent: navigator.userAgent,
        ipAddress: 'client-ip',
        deviceName: 'Browser'
      };
      
      const response = await axios.post('http://localhost:3000/api/system-admin/otp/verify-otp', {
        identifier: emailValue,
        otp: otpCode,
        processId: processId,
        isUnregistered: true,
        deviceInfo: deviceInfo
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.status === 1) {
        setEmailVerified(true);
        setVerifiedEmail(emailValue);
        setShowOtpInput(false);
        setOtp(['', '', '', '', '', '']);
        
        message.success('Email verified successfully!');
        return true;
      } else {
        throw new Error(response.data.message || 'OTP verification failed');
      }
      
    } catch (error) {
      console.error('OTP verification error:', error);
      
      let errorMessage = 'Verification failed. Please try again.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      message.error(errorMessage);
      return false;
    } finally {
      setVerifyingOtp(false);
    }
  };

  // Handle OTP input change
  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = otpInputRefs.current[index + 1];
      if (nextInput) nextInput.focus();
    }

    if (newOtp.every(digit => digit !== '')) {
      setTimeout(() => {
        handleVerifyOtp();
      }, 300);
    }
  };

  // Handle OTP keydown for backspace
  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = otpInputRefs.current[index - 1];
      if (prevInput) prevInput.focus();
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      message.error('Please enter 6-digit OTP');
      return;
    }

    await verifyOtpApi(otpCode);
  };

  // Handle resend OTP
  const handleResendOtp = async () => {
    if (countdown > 0) return;
    
    if (!emailValue || !isEmailValid) {
      message.error('Please enter valid email first');
      return;
    }

    setOtp(['', '', '', '', '', '']);
    await sendOtpToEmail(emailValue);
  };

  // Countdown timer
  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle email verification
  const handleVerifyEmail = async () => {
    if (!emailValue) {
      message.error('Please enter email first');
      return;
    }

    if (!isEmailValid) {
      message.error('Please enter a valid email');
      return;
    }

    if (emailVerified && emailValue === verifiedEmail) {
      message.info('This email is already verified');
      return;
    }

    await sendOtpToEmail(emailValue);
  };

  // Handle change email
  const handleChangeEmail = () => {
    setEmailVerified(false);
    setVerifiedEmail('');
    setProcessId('');
    setShowOtpInput(false);
    setOtp(['', '', '', '', '', '']);
    
    setTimeout(() => {
      const emailInput = document.querySelector('input[name="email"]');
      if (emailInput) emailInput.focus();
    }, 100);
  };

  // Validate current step
  const validateCurrentStep = async () => {
    try {
      const fields = {
        0: ['email', 'password', 'confirmPassword', 'username'],
        1: ['firstName', 'lastName', 'phone'],
        2: ['area', 'city', 'state', 'pincode']
      };
      
      const stepFields = fields[currentStep];
      await form.validateFields(stepFields);
      
      // Update formData with current step values
      const currentValues = form.getFieldsValue(stepFields);
      setFormData(prev => ({ ...prev, ...currentValues }));
      
      return true;
    } catch (error) {
      console.log('Validation failed:', error);
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      console.log('DEBUG: Form data before submission:', formData);
      
      if (!emailVerified) {
        message.error('Please verify your email first');
        return;
      }

      // Validate all required fields
      const requiredFields = [
        'email', 'password', 'confirmPassword', 'username',
        'firstName', 'lastName', 'phone',
        'area', 'city', 'state', 'pincode'
      ];

      const missingFields = requiredFields.filter(field => !formData[field]);
      
      console.log('DEBUG: Missing fields:', missingFields);
      console.log('DEBUG: All form data:', formData);
      
      if (missingFields.length > 0) {
        message.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
        
        // Go to the step where the first missing field is
        if (missingFields.some(field => ['email', 'password', 'confirmPassword', 'username'].includes(field))) {
          setCurrentStep(0);
        } else if (missingFields.some(field => ['firstName', 'lastName', 'phone'].includes(field))) {
          setCurrentStep(1);
        } else {
          setCurrentStep(2);
        }
        
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        message.error('Passwords do not match');
        setCurrentStep(0);
        return;
      }

      setLoading(true);

      // Prepare registration data
      const registerData = {
        admin_name: formData.username,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone_number: formData.phone,
        role_code: formData.role ,
        area: formData.area,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        middle_name: formData.middle_name || ''
      };

      // Add optional fields if provided
      if (formData.middle_name) {
        registerData.middle_name = formData.middle_name;
      }

      console.log('DEBUG: Final registration data:', registerData);

      const response = await axios.post('http://localhost:3000/api/system-admin/auth/register', registerData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Registration response:', response.data);

      if (response.data.status === 1) {
         setTimeout(() => {
                  window.location.href = '/login?message=Password+reset+successful!+Please+login+with+your+new+password.';
                }, 2000);
        message.success({
          content: (
            <div className="space-y-2">
              <div className="font-semibold">✅ Registration Successful!</div>
              <div className="text-xs">
                Welcome {registerData.first_name}! You can now login to your account.
              </div>
            </div>
          ),
          duration: 5,
          
        });

             

        // Reset everything
        form.resetFields();
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          username: '',
          firstName: '',
          lastName: '',
          middle_name: '',
          phone: '',
          dob: null,
          role: 'AD',
          area: '',
          city: '',
          state: '',
          pincode: ''
        });
        setEmailVerified(false);
        setVerifiedEmail('');
        setCurrentStep(0);
        setEmailValue('');
        
      } else {
        throw new Error(response.data.message || 'Registration failed');
      }
      
    } catch (error) {
      console.error('Registration error:', error);
      
      let errorMessage = 'Registration failed';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message.includes('Network Error')) {
        errorMessage = 'Unable to connect to server. Please check your connection.';
      } else if (error.message.includes('timeout')) {
        errorMessage = 'Request timeout. Please try again.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Go to next step
  const nextStep = async () => {
    const isValid = await validateCurrentStep();
    if (!isValid) return;
    
    if (currentStep === 0 && !emailVerified) {
      message.error('Please verify your email before continuing');
      return;
    }
    
    setCurrentStep(currentStep + 1);
  };

  // Go to previous step
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Set form values when changing steps
  useEffect(() => {
    // Set form values based on current step
    const stepFields = {
      0: ['email', 'password', 'confirmPassword', 'username'],
      1: ['firstName', 'lastName', 'middle_name', 'phone', 'dob', 'role'],
      2: ['area', 'city', 'state', 'pincode']
    };
    
    const fields = stepFields[currentStep];
    const values = {};
    fields.forEach(field => {
      if (formData[field] !== undefined) {
        values[field] = formData[field];
      }
    });
    
    form.setFieldsValue(values);
  }, [currentStep, formData]);

  const renderStepContent = () => {
    switch(currentStep) {
      case 0: // Account Information
        return (
          <motion.div
            key="account-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Account Setup</h3>
              <p className="text-sm text-gray-500">Create your login credentials</p>
            </div>

            {/* Email Section */}
            <div className="space-y-3">
              {!showOtpInput ? (
                <div className="flex items-center gap-3">
                  <Form.Item
                    name="email"
                    label={<span className="text-xs font-medium text-gray-700">Email Address</span>}
                    rules={[
                      { required: true, message: 'Email is required' },
                      { type: 'email', message: 'Enter a valid email' }
                    ]}
                    className="mb-0 flex-1"
                  >
                    <Input 
                      prefix={<Mail className="w-3.5 h-3.5 text-gray-400" />}
                      placeholder="your.email@company.com" 
                      size="large"
                      className="rounded-lg h-10 border-gray-300 hover:border-blue-400 focus:border-blue-500 transition-colors"
                      onChange={handleEmailChange}
                      value={emailValue}
                    />
                  </Form.Item>
                  
                  {!emailVerified ? (
                    <div className="mt-1">
                      <Button
                        onClick={handleVerifyEmail}
                        loading={verifyingEmail}
                        disabled={!emailValue || !isEmailValid}
                        className={`h-14 px-4 font-medium border-none ${
                          !emailValue || !isEmailValid
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white'
                        }`}
                      >
                        Send OTP
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2 mt-1">
                      <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                        <Check size={14} />
                        <span className="font-medium">Verified</span>
                      </div>
                      <Button
                        onClick={handleChangeEmail}
                        className="h-10 px-3 font-medium border-gray-300 hover:border-gray-400"
                        icon={<Edit2 size={14} />}
                      >
                        Change
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex gap-1">
                        {otp.map((digit, index) => (
                          <InputNumber
                            key={index}
                            ref={(el) => otpInputRefs.current[index] = el}
                            id={`otp-input-${index}`}
                            value={digit}
                            onChange={(value) => handleOtpChange(value, index)}
                            onKeyDown={(e) => handleOtpKeyDown(e, index)}
                            min={0}
                            max={9}
                            maxLength={1}
                            className="custom-otp-input"
                            style={{
                              width: '42px',
                              height: '32px',
                              fontSize: '16px',
                              padding: '0',
                              textAlign: 'center',
                            }}
                            disabled={verifyingOtp}
                            autoFocus={index === 0 && !verifyingOtp}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-1">
                      <Button
                        type="primary"
                        onClick={handleVerifyOtp}
                        loading={verifyingOtp}
                        disabled={otp.join('').length !== 6 || verifyingOtp}
                        className="h-10 px-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 border-none font-medium"
                      >
                        {verifyingOtp ? 'Verifying...' : 'Verify OTP'}
                      </Button>
                    </div>
                  </div>
                  
                  {countdown > 0 && (
                    <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                      <RotateCcw size={10} />
                      Resend in {countdown}s
                    </div>
                  )}
                  
                  {countdown === 0 && (
                    <div className="text-center">
                      <Button
                        type="link"
                        size="small"
                        onClick={handleResendOtp}
                        className="text-xs"
                      >
                        Didn't receive code? Resend OTP
                      </Button>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <Button
                      type="link"
                      size="small"
                      onClick={() => {
                        setShowOtpInput(false);
                        setOtp(['', '', '', '', '', '']);
                      }}
                      className="text-xs"
                    >
                      ← Back to email input
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Form.Item
                name="password"
                label={<span className="text-xs font-medium text-gray-700">Password</span>}
                rules={[
                  { required: true, message: 'Password is required' },
                  { min: 8, message: 'Minimum 8 characters' },
                  {
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: 'Must include uppercase, lowercase, number & special character'
                  }
                ]}
                className="mb-0"
              >
                <Input.Password 
                  prefix={<Lock className="w-3.5 h-3.5 text-gray-400" />}
                  placeholder="Create password" 
                  size="large"
                  className="rounded-lg h-10 border-gray-300 hover:border-blue-400 focus:border-blue-500 transition-colors"
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label={<span className="text-xs font-medium text-gray-700">Confirm Password</span>}
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
                  prefix={<Lock className="w-3.5 h-3.5 text-gray-400" />}
                  placeholder="Confirm password" 
                  size="large"
                  className="rounded-lg h-10 border-gray-300 hover:border-blue-400 focus:border-blue-500 transition-colors"
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                />
              </Form.Item>
            </div>

            <Form.Item
              name="username"
              label={<span className="text-xs font-medium text-gray-700">Username</span>}
              rules={[
                { required: true, message: 'Username is required' },
                { min: 3, message: 'Minimum 3 characters' },
                { pattern: /^[a-zA-Z0-9_]+$/, message: 'Only letters, numbers & underscore' }
              ]}
              className="mb-0"
            >
              <Input 
                prefix={<User className="w-3.5 h-3.5 text-gray-400" />}
                placeholder="Choose a username" 
                size="large"
                className="rounded-lg h-10 border-gray-300 hover:border-blue-400 focus:border-blue-500 transition-colors"
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              />
            </Form.Item>
          </motion.div>
        );

      case 1: // Personal Information
        return (
          <motion.div
            key="personal-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Personal Details</h3>
              <p className="text-sm text-gray-500">Tell us about yourself</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Form.Item
                name="firstName"
                label={<span className="text-xs font-medium text-gray-700">First Name</span>}
                rules={[
                  { required: true, message: 'First name is required' },
                  { pattern: /^[a-zA-Z\s]+$/, message: 'Only letters and spaces' }
                ]}
                className="mb-0"
              >
                <Input 
                  placeholder="John" 
                  size="large"
                  className="rounded-lg h-10 border-gray-300 hover:border-blue-400 focus:border-blue-500 transition-colors"
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                />
              </Form.Item>

              <Form.Item
                name="lastName"
                label={<span className="text-xs font-medium text-gray-700">Last Name</span>}
                rules={[
                  { required: true, message: 'Last name is required' },
                  { pattern: /^[a-zA-Z\s]+$/, message: 'Only letters and spaces' }
                ]}
                className="mb-0"
              >
                <Input 
                  placeholder="Doe" 
                  size="large"
                  className="rounded-lg h-10 border-gray-300 hover:border-blue-400 focus:border-blue-500 transition-colors"
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                />
              </Form.Item>
            </div>

            <Form.Item
              name="middle_name"
              label={<span className="text-xs font-medium text-gray-700">Middle Name (Optional)</span>}
              className="mb-0"
            >
              <Input 
                placeholder="Middle name" 
                size="large"
                className="rounded-lg h-10 border-gray-300 hover:border-blue-400 focus:border-blue-500 transition-colors"
                onChange={(e) => setFormData(prev => ({ ...prev, middle_name: e.target.value }))}
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label={<span className="text-xs font-medium text-gray-700">Phone Number</span>}
              rules={[
                { required: true, message: 'Phone number is required' },
                { pattern: /^\d{10}$/, message: 'Enter 10-digit number' }
              ]}
              className="mb-0"
            >
              <Input 
                prefix={<Phone className="w-3.5 h-3.5 text-gray-400" />}
                placeholder="9876543210" 
                size="large"
                className="rounded-lg h-10 border-gray-300 hover:border-blue-400 focus:border-blue-500 transition-colors"
                maxLength={10}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </Form.Item>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Form.Item
                name="dob"
                label={<span className="text-xs font-medium text-gray-700">Date of Birth (Optional)</span>}
                className="mb-0"
              >
                <DatePicker
                  size="large"
                  className="rounded-lg w-full h-10 border-gray-300 hover:border-blue-400 focus:border-blue-500 transition-colors"
                  placeholder="Select date"
                  format="DD/MM/YYYY"
                  onChange={(date) => setFormData(prev => ({ ...prev, dob: date }))}
                />
              </Form.Item>

              <Form.Item
                name="role"
                label={<span className="text-xs font-medium text-gray-700">Role</span>}
                rules={[{ required: true, message: 'Select your role' }]}
                initialValue="AD"
                className="mb-0"
              >
                <Select 
                  size="large"
                  className="rounded-lg h-10 border-gray-300 hover:border-blue-400 focus:border-blue-500 transition-colors"
                  placeholder="Select role"
                  onChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
                >
                  <Option value="AD">👑 Administrator</Option>
                  <Option value="MN">📊 Manager</Option>
                  <Option value="SE">⚙️ Engineer</Option>
                  <Option value="HR">👥 HR</Option>
                  <Option value="AC">💰 Accountant</Option>
                </Select>
              </Form.Item>
            </div>
          </motion.div>
        );

      case 2: // Address Information
        return (
          <motion.div
            key="address-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Address Details</h3>
              <p className="text-sm text-gray-500">Where are you located?</p>
            </div>

            <Form.Item
              name="area"
              label={<span className="text-xs font-medium text-gray-700">Street Address</span>}
              rules={[{ required: true, message: 'Street address is required' }]}
              className="mb-0"
            >
              <Input 
                prefix={<MapPin className="w-3.5 h-3.5 text-gray-400" />}
                placeholder="123 Main Street" 
                size="large"
                className="rounded-lg h-10 border-gray-300 hover:border-blue-400 focus:border-blue-500 transition-colors"
                onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
              />
            </Form.Item>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Form.Item
                name="city"
                label={<span className="text-xs font-medium text-gray-700">City</span>}
                rules={[{ required: true, message: 'City is required' }]}
                className="mb-0"
              >
                <Input 
                  prefix={<Building className="w-3.5 h-3.5 text-gray-400" />}
                  placeholder="New York" 
                  size="large"
                  className="rounded-lg h-10 border-gray-300 hover:border-blue-400 focus:border-blue-500 transition-colors"
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                />
              </Form.Item>

              <Form.Item
                name="state"
                label={<span className="text-xs font-medium text-gray-700">State</span>}
                rules={[{ required: true, message: 'State is required' }]}
                className="mb-0"
              >
                <Input 
                  prefix={<Globe className="w-3.5 h-3.5 text-gray-400" />}
                  placeholder="NY" 
                  size="large"
                  className="rounded-lg h-10 border-gray-300 hover:border-blue-400 focus:border-blue-500 transition-colors"
                  onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                />
              </Form.Item>
            </div>

            <Form.Item
              name="pincode"
              label={<span className="text-xs font-medium text-gray-700">Postal Code</span>}
              rules={[
                { required: true, message: 'Postal code is required' },
                { pattern: /^\d{6}$/, message: 'Enter 6-digit postal code' }
              ]}
              className="mb-0"
            >
              <Input 
                prefix={<Hash className="w-3.5 h-3.5 text-gray-400" />}
                placeholder="100001" 
                size="large"
                className="rounded-lg h-10 border-gray-300 hover:border-blue-400 focus:border-blue-500 transition-colors"
                maxLength={6}
                onChange={(e) => setFormData(prev => ({ ...prev, pincode: e.target.value }))}
              />
            </Form.Item>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      {/* Steps Indicator */}
      <div className="flex items-center justify-between mb-2 relative">
        {steps.map((step, index) => (
          <React.Fragment key={step.title}>
            <div className="flex flex-col items-center relative z-10">
              <motion.div
                animate={{ 
                  scale: currentStep === index ? 1.1 : 1,
                }}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentStep >= index 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {currentStep > index ? <CheckCircle size={12} /> : step.icon}
              </motion.div>
              <span className={`text-[10px] mt-1 font-medium ${
                currentStep >= index ? 'text-gray-800' : 'text-gray-400'
              }`}>
                {step.title}
              </span>
              <span className={`text-[9px] mt-0.5 ${
                currentStep >= index ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {step.description}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 bg-gray-100 mx-1 relative -top-3">
                {currentStep > index && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
                  />
                )}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        onValuesChange={handleFormChange}
        size="middle"
        className="flex-1 flex flex-col"
      >
        {/* Form Content */}
        <div className="flex-1 min-h-0 overflow-y-auto pr-1 mb-4">
          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            {currentStep > 0 ? (
              <Button
                onClick={prevStep}
                className="h-9 px-4 rounded-lg font-medium border-gray-300 hover:border-blue-400 transition-all text-sm"
                icon={<ArrowLeft size={14} />}
              >
                Back
              </Button>
            ) : (
              <div className="w-20"></div>
            )}

            {currentStep < steps.length - 1 ? (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={nextStep}
                  type="primary"
                  disabled={currentStep === 0 && !emailVerified}
                  className={`h-9 px-5 rounded-lg font-medium border-none transition-all duration-300 text-sm ${
                    currentStep === 0 && !emailVerified
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700'
                  }`}
                  icon={<ArrowRight size={14} />}
                  iconPosition="end"
                >
                  Continue
                </Button>
              </motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  loading={loading}
                  disabled={!emailVerified}
                  className="h-9 px-6 rounded-lg font-medium bg-gradient-to-r from-emerald-500 to-green-600 border-none hover:from-emerald-600 hover:to-green-700 transition-all duration-300 text-sm shadow-sm"
                  icon={!loading && <CheckCircle className="w-3.5 h-3.5" />}
                  iconPosition="end"
                >
                  {loading ? 'Creating Account...' : 'Complete Registration'}
                </Button>
              </motion.div>
            )}
          </div>

          {/* Terms and Privacy */}
          <div className="text-center mt-4">
            <p className="text-[10px] text-gray-500 leading-tight">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-blue-600 hover:underline font-medium">Terms</a>{' '}
              and{' '}
              <a href="#" className="text-blue-600 hover:underline font-medium">Privacy</a>
            </p>
          </div>
        </div>
      </Form>
    </motion.div>
  );
};

export default RegisterForm;