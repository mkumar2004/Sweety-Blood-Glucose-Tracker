import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '@/pages/Login';
import { Signup } from '@/pages/Signup';
import Dashboard from '@/pages/Dashboard';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      
      {/* Default redirect to /login */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

