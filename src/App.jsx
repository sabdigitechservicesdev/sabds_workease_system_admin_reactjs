import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import UsersPage from "./pages/UsersPage";
import HomePage from "./pages/HomePage";
import DemoPage from "./pages/DemoPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route path="/dashboard" element={<DashboardPage />}>
            <Route index element={<Navigate to="/dashboard/users" replace />} />
            <Route path="users" element={<UsersPage />} />
          </Route> */}
          <Route path="/dashboard" element={<DashboardPage />}/>
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
