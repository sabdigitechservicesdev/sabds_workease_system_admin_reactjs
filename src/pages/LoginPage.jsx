// LoginPage.jsx
import React from 'react';
import LoginForm from '../components/LoginForm';
import logo from '../assets/logo-nobg.png'; // replace with your logo path

const LoginPage = () => {
  return (
    <div className="min-h-screen   flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl  grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left: Login Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <LoginForm />
          <div className="mt-10 text-sm text-gray-500">
            © {new Date().getFullYear()} Scheduler App. All rights reserved.
          </div>
        </div>

        {/* Right: Logo / Branding */}
     <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br ">
  <img src={logo} alt="Scheduler Logo" className="w-[400px] mb-6" />

  <h2 className="text-3xl font-semibold text-blue-900">
    Scheduler
  </h2>

  <p className="mt-3 text-center max-w-sm text-blue-800">
    Efficient scheduling made simple and secure
  </p>
</div>

      </div>
    </div>
  );
};

export default LoginPage;