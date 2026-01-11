import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, ArrowLeft, Lock, ShieldCheck, KeyRound, CheckCircle, AlertCircle, RotateCcw } from 'lucide-react';
import { Input, Button, Form, message, Alert, InputNumber } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Mask email function
const maskIdentifier = (identifier) => {
  if (!identifier) return '';
  if (identifier.includes('@')) {
    const [local, domain] = identifier.split('@');
    const maskedLocal = local.length > 3 
      ? local.slice(0, 3) + '*'.repeat(local.length - 3)
      : local;
    return `${maskedLocal}@${domain}`;
  }
  // For username, show only first 3 characters
  return identifier.length > 3 
    ? identifier.slice(0, 3) + '*'.repeat(identifier.length - 3)
    : identifier;
};

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(0);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [identifierValue, setIdentifierValue] = useState('');
  const [processId, setProcessId] = useState('');
  const [error, setError] = useState('');
  const [identifierType, setIdentifierType] = useState(''); // 'email' or 'username'
  
  const otpInputRefs = useRef([]);

  const steps = [
    { title: 'OTP', icon: <KeyRound size={12} />, description: 'Send & Verify' },
    { title: 'Reset', icon: <Lock size={12} />, description: 'New Password' },
  ];

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Handle identifier change
  const handleIdentifierChange = (e) => {
    const value = e.target.value;
    setIdentifierValue(value);
    setError('');
    
    // Detect if it's email or username
    if (value.includes('@')) {
      setIdentifierType('email');
    } else {
      setIdentifierType('username');
    }
  };

  // Handle OTP input change
  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      const nextInput = otpInputRefs.current[index + 1];
      if (nextInput) nextInput.focus();
    }

    // Auto verify when all digits entered
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

  // Handle Send OTP
  const handleSendOtp = async () => {
    try {
      setLoading(true);
      setError('');
      
      if (!identifierValue.trim()) {
        setError('Please enter your email or username');
        return;
      }

      console.log('🚀 Sending OTP request for:', identifierValue);
      
      const response = await axios.post('http://localhost:3000/api/system-admin/otp/send-otp', {
        identifier: identifierValue
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('📨 OTP Response:', response.data);

      if (response.data) {
        const responseData = response.data;
        
        const isSuccess = responseData.success === true || 
                         responseData.status === 'success' || 
                         responseData.message?.includes('success') ||
                         response.status === 200;
        
        if (isSuccess) {
          const data = responseData.data || responseData;
          const pid = data.processId || data.adminId || Date.now().toString().slice(-6);
          
          setProcessId(pid);
          setCountdown(300);
          setShowOtpInput(true);
          
          message.success(`OTP sent to ${maskIdentifier(identifierValue)}`);
          
          // Focus first OTP input
          setTimeout(() => {
            otpInputRefs.current[0]?.focus();
          }, 100);
        } else {
          const errorMsg = responseData.message || 'Failed to send OTP';
          setError(errorMsg);
          message.error(errorMsg);
        }
      }
    } catch (error) {
      console.error('❌ Send OTP error:', error);
      
      let errorMsg = 'Failed to send OTP. Please check your connection.';
      if (error.response?.data) {
        errorMsg = error.response.data.message || errorMsg;
      }
      
      setError(errorMsg);
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Handle Verify OTP
  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join('');
    
    if (enteredOtp.length !== 6) {
      setError('Please enter complete 6-digit OTP');
      return;
    }

    setVerifyingOtp(true);
    setError('');
    
    try {
      console.log('🔍 Verifying OTP:', {
        identifier: identifierValue,
        otp: enteredOtp,
        processId
      });

      const response = await axios.post('http://localhost:3000/api/system-admin/otp/verify-otp', {
        identifier: identifierValue,
        otp: enteredOtp,
        processId: processId
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('✅ Verify OTP Response:', response.data);

      const isSuccess = response.data?.success === true || 
                       response.data?.status === 'success' ||
                       response.status === 200;
      
      if (isSuccess) {
        message.success('OTP verified successfully!');
        setCurrentStep(2);
      } else {
        const errorMsg = response.data?.message || 'OTP verification failed';
        setError(errorMsg);
        message.error(errorMsg);
      }
    } catch (error) {
      console.error('❌ Verify OTP error:', error);
      
      let errorMsg = 'Invalid OTP. Please check and try again.';
      if (error.response?.data) {
        errorMsg = error.response.data.message || errorMsg;
      }
      
      setError(errorMsg);
      message.error(errorMsg);
    } finally {
      setVerifyingOtp(false);
    }
  };

  // Handle Resend OTP
  const handleResendOtp = async () => {
    if (countdown > 60) return;
    
    try {
      setResendLoading(true);
      setError('');
      setOtp(['', '', '', '', '', '']);
      
      console.log('🔄 Resending OTP for:', identifierValue);
      
      const response = await axios.post('http://localhost:3000/api/system-admin/otp/send-otp', {
        identifier: identifierValue
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('📨 Resend OTP Response:', response.data);
      
      const isSuccess = response.data?.success === true || 
                       response.data?.status === 'success' ||
                       response.status === 200;
      
      if (isSuccess) {
        const data = response.data.data || response.data;
        const pid = data.processId || data.adminId || processId;
        
        setProcessId(pid);
        setCountdown(300);
        
        message.success('New OTP sent successfully');
        
        // Focus first OTP input
        setTimeout(() => {
          otpInputRefs.current[0]?.focus();
        }, 100);
      } else {
        const errorMsg = response.data?.message || 'Failed to resend OTP';
        setError(errorMsg);
        message.error(errorMsg);
      }
    } catch (error) {
      console.error('❌ Resend OTP error:', error);
      
      const errorMsg = error.response?.data?.message || 
                      'Failed to resend OTP';
      setError(errorMsg);
      message.error(errorMsg);
    } finally {
      setResendLoading(false);
    }
  };

  // Handle Change Identifier
  const handleChangeIdentifier = () => {
    setShowOtpInput(false);
    setOtp(['', '', '', '', '', '']);
    setProcessId('');
    setCountdown(0);
    
    // Focus on identifier input
    setTimeout(() => {
      const input = document.querySelector('input[name="identifier"]');
      if (input) input.focus();
    }, 100);
  };

  // Handle Reset Password
  const handleResetPassword = async (values) => {
    try {
      setLoading(true);
      
      console.log('🔄 Resetting password for:', identifierValue);

      const response = await axios.post('http://localhost:3000/api/system-admin/auth/forgot-password', {
        identifier: identifierValue,
        new_password: values.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('✅ Reset Password Response:', response.data);
      
      const isSuccess = response.data?.success === true || 
                       response.data?.status === 'success' ||
                       response.status === 200;
      
      if (isSuccess) {
        message.success('Password reset successful! Redirecting to login...');
        
        setTimeout(() => {
          window.location.href = '/login?message=Password+reset+successful!+Please+login+with+your+new+password.';
        }, 2000);
      } else {
        const errorMsg = response.data?.message || 'Failed to reset password';
        message.error(errorMsg);
      }
    } catch (error) {
      console.error('❌ Reset password error:', error);
      
      let errorMsg = 'Failed to reset password';
      if (error.response?.data) {
        errorMsg = error.response.data.message || errorMsg;
      }
      
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Render content based on current step
  const renderContent = () => {
    if (currentStep === 1) {
      return (
        <motion.div
          key="otp-step"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Enter Your Details</h3>
            <p className="text-sm text-gray-500">
              Enter your email or username to receive password reset OTP
            </p>
          </div>

          {error && (
            <Alert
              message="Error"
              description={error}
              type="error"
              className="mb-4"
              showIcon
            />
          )}

          {/* Identifier & OTP Section */}
          <div className="space-y-3">
            {!showOtpInput ? (
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <Input
                    prefix={
                      identifierType === 'email' 
                        ? <Mail className="w-3.5 h-3.5 text-gray-400" />
                        : <User className="w-3.5 h-3.5 text-gray-400" />
                    }
                    placeholder="Enter email or username"
                    size="large"
                    className="rounded-lg h-10 border-gray-300 hover:border-blue-400 focus:border-blue-500 transition-colors"
                    onChange={handleIdentifierChange}
                    value={identifierValue}
                    autoComplete="username"
                  />
                </div>
                
                <div className="mt-1">
                  <Button
                    onClick={handleSendOtp}
                    loading={loading}
                    disabled={!identifierValue.trim()}
                    className={`h-14 px-4 font-medium border-none ${
                      !identifierValue.trim()
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white'
                    }`}
                  >
                    Send OTP
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex gap-1 justify-center">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <InputNumber
                          key={index}
                          ref={(el) => otpInputRefs.current[index] = el}
                          value={otp[index]}
                          onChange={(value) => handleOtpChange(value, index)}
                          onKeyDown={(e) => handleOtpKeyDown(e, index)}
                          min={0}
                          max={9}
                          maxLength={1}
                          className="custom-otp-input"
                          style={{
                            width: '42px',
                            height: '42px',
                            fontSize: '18px',
                            padding: '0',
                            textAlign: 'center',
                            borderRadius: '8px',
                            borderColor: error ? '#f5222d' : '#d9d9d9'
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
                
                <div className="text-center">
                  {countdown > 60 ? (
                    <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                      <RotateCcw size={10} />
                      Resend in {countdown - 60}s
                    </div>
                  ) : (
                    <Button
                      type="link"
                      size="small"
                      onClick={handleResendOtp}
                      loading={resendLoading}
                      disabled={resendLoading || countdown > 60}
                      className="text-xs"
                    >
                      <RotateCcw size={10} className="mr-1" />
                      Resend OTP
                    </Button>
                  )}
                </div>

                <div className="text-center">
                  <Button
                    type="link"
                    size="small"
                    onClick={handleChangeIdentifier}
                    className="text-xs"
                  >
                    ← Use different email/username
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </button>
          </div>
        </motion.div>
      );
    }

    if (currentStep === 2) {
      return (
        <motion.div
          key="reset-step"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Set New Password</h3>
            <p className="text-sm text-gray-500">
              Create a strong new password for your account
            </p>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleResetPassword}
            size="middle"
          >
            <Form.Item
              name="password"
              label={<span className="text-xs font-medium text-gray-700">New Password</span>}
              rules={[
                { required: true, message: 'Please enter new password' },
                { min: 8, message: 'Minimum 8 characters' },
                { 
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: 'Must include uppercase, lowercase, number & special character'
                }
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<Lock className="w-3.5 h-3.5 text-gray-400" />}
                placeholder="Enter new password"
                className="rounded-lg h-10 border-gray-300 focus:border-blue-500"
                size="middle"
                autoComplete="new-password"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label={<span className="text-xs font-medium text-gray-700">Confirm Password</span>}
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
              hasFeedback
            >
              <Input.Password
                prefix={<Lock className="w-3.5 h-3.5 text-gray-400" />}
                placeholder="Confirm new password"
                className="rounded-lg h-10 border-gray-300 focus:border-blue-500"
                size="middle"
                autoComplete="new-password"
              />
            </Form.Item>

            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</div>
              <ul className="text-xs text-gray-600 space-y-1">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Minimum 8 characters
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  At least one uppercase letter
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  At least one lowercase letter
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  At least one number
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  At least one special character
                </li>
              </ul>
            </div>

            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                className="h-10 rounded-lg font-medium text-sm bg-gradient-to-r from-green-500 to-cyan-600 border-none hover:from-green-600 hover:to-cyan-700 transition-all duration-300 shadow-sm hover:shadow"
              >
                {loading ? 'Resetting Password...' : 'Reset Password'}
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center mt-4">
            <Button
              onClick={() => setCurrentStep(1)}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              icon={<ArrowLeft size={14} />}
            >
              Back to OTP verification
            </Button>
          </div>
        </motion.div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Left Column - Form */}
            <div className="lg:col-span-3 p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">WorkEase</h1>
                  <p className="text-sm text-gray-500">Password Recovery</p>
                </div>
                <button
                  onClick={() => navigate('/login')}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft size={14} />
                  Back to Login
                </button>
              </div>

              {/* Steps Indicator */}
              <div className="flex items-center justify-between mb-6 relative">
                {steps.map((step, index) => (
                  <React.Fragment key={step.title}>
                    <div className="flex flex-col items-center relative z-10">
                      <motion.div
                        animate={{ 
                          scale: currentStep === index + 1 ? 1.1 : 1,
                        }}
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                          currentStep >= index + 1 
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md' 
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {currentStep > index + 1 ? <CheckCircle size={12} /> : step.icon}
                      </motion.div>
                      <span className={`text-[10px] mt-1 font-medium ${
                        currentStep >= index + 1 ? 'text-gray-800' : 'text-gray-400'
                      }`}>
                        {step.title}
                      </span>
                      <span className={`text-[9px] mt-0.5 ${
                        currentStep >= index + 1 ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {step.description}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="flex-1 h-0.5 bg-gray-100 mx-1 relative -top-3">
                        {currentStep > index + 1 && (
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

              {/* Form Content */}
              <div className="min-h-[320px]">
                {renderContent()}
              </div>

              {/* Security Notice */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                  <div className="text-xs text-gray-500">
                    <p className="font-medium mb-1">Security Information:</p>
                    <ul className="space-y-1">
                      <li>• OTP expires in 5 minutes</li>
                      <li>• You can resend OTP after 60 seconds</li>
                      <li>• Keep your new password secure</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Information */}
            <div className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white">
              <div className="h-full flex flex-col">
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white/90 mb-4">Password Recovery</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Enter your email or username to receive OTP and reset your password securely.
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className={`flex items-start gap-3 p-3 rounded-lg ${currentStep === 1 ? 'bg-white/10' : 'bg-white/5'} backdrop-blur-sm transition-colors`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 1 ? 'bg-white/20' : 'bg-white/10'}`}>
                      <span className="text-sm font-medium">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Verify Identity</h4>
                      <p className="text-xs text-gray-300">
                        Enter email/username and verify with OTP
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-start gap-3 p-3 rounded-lg ${currentStep === 2 ? 'bg-white/10' : 'bg-white/5'} backdrop-blur-sm transition-colors`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 2 ? 'bg-white/20' : 'bg-white/10'}`}>
                      <span className="text-sm font-medium">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Set New Password</h4>
                      <p className="text-xs text-gray-300">Create a strong, secure password</p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="border-t border-white/10 pt-6">
                    <div className="text-center">
                      <h4 className="text-sm font-medium text-white/90 mb-3">Supports Both</h4>
                      <div className="flex items-center justify-center gap-6 opacity-80">
                        <div className="flex items-center gap-1">
                          <Mail size={10} />
                          <span className="text-xs font-medium text-white/70">Email</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User size={10} />
                          <span className="text-xs font-medium text-white/70">Username</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <p className="text-xs text-gray-400">
                      © 2024 WorkEase. All rights reserved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Need help? <a href="#" className="text-blue-600 hover:underline font-medium">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;