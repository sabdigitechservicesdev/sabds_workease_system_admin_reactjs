import React, { useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import { RefreshCw } from 'lucide-react';

const FlipAuthPage = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setIsFlipped(!isFlipped);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-4xl">
        <div className="relative">
          {/* Flip Container */}
          <div 
            className={`relative w-full h-[580px] transition-all duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}
            style={{ 
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
          >
            {/* Login Side (Front) */}
            <div 
              className={`absolute w-full h-full backface-hidden ${isFlipped ? 'opacity-0' : 'opacity-100'}`}
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(0deg)'
              }}
            >
              <div className="bg-white rounded-xl shadow-xl grid grid-cols-1 lg:grid-cols-2 h-full overflow-hidden">
                {/* Left: Login Form - Full Height */}
                <div className="flex flex-col h-full">
                  <div className="p-6 lg:p-8 flex flex-col h-full">
                    <div className="mb-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
                          <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
                        </div>
                        <button
                          onClick={handleFlip}
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                          disabled={isAnimating}
                        >
                          Create Account →
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="max-w-md mx-auto w-full">
                        <LoginForm />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right: Brand Info */}
                <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/90 to-blue-600/90"></div>
                  <div className="relative z-10 text-center text-white">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-xl">SP</span>
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Scheduler Pro</h2>
                    <p className="text-blue-100 max-w-sm mx-auto">
                      Streamline your team's workflow with intelligent scheduling and management tools
                    </p>
                    <div className="mt-8 pt-6 border-t border-white/20">
                      <p className="text-sm text-blue-100">"Efficient scheduling for modern teams"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Register Side (Back) */}
            <div 
              className={`absolute w-full h-full backface-hidden rotate-y-180 ${isFlipped ? 'opacity-100' : 'opacity-0'}`}
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              <div className="bg-white rounded-xl shadow-xl grid grid-cols-1 lg:grid-cols-2 h-full overflow-hidden">
                {/* Left: Register Form - Full Height */}
                <div className="flex flex-col h-full">
                  <div className="p-6 lg:p-8 flex flex-col h-full">
                    <div className="mb-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <h1 className="text-2xl font-bold text-gray-900">Get Started</h1>
                          <p className="text-sm text-gray-500 mt-1">Create your account</p>
                        </div>
                        <button
                          onClick={handleFlip}
                          className="text-sm text-green-600 hover:text-green-800 font-medium px-3 py-1.5 rounded-lg hover:bg-green-50 transition-colors"
                          disabled={isAnimating}
                        >
                          Sign In →
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="max-w-md mx-auto w-full">
                        <RegisterForm />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right: Brand Info - Same Design */}
                <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-green-500 to-green-600 p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/90 to-green-600/90"></div>
                  <div className="relative z-10 text-center text-white">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                        <span className="text-green-600 font-bold text-xl">SP</span>
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Join Our Platform</h2>
                    <p className="text-green-100 max-w-sm mx-auto">
                      Get access to powerful scheduling tools and team management features
                    </p>
                    <div className="mt-8 pt-6 border-t border-white/20">
                      <p className="text-sm text-green-100">"Join thousands of teams worldwide"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Flip Button */}
          <button
            onClick={handleFlip}
            className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-14 h-14 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white rounded-full shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl ${
              isAnimating ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={isAnimating}
            title={isFlipped ? "Go to Login" : "Go to Register"}
          >
            <RefreshCw className={`w-6 h-6 ${isAnimating ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Global CSS */}
      <style jsx global>{`
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin {
          animation: spin 0.5s linear infinite;
        }
        
        /* Custom scrollbar for Register form */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }
      `}</style>
    </div>
  );
};

export default FlipAuthPage;