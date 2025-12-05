import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from 'react-hot-toast';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ClaimForm from './pages/ClaimForm';
import ClaimStatus from './pages/ClaimStatus';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import DocumentVerification from './pages/DocumentVerification';
import VerificationStatus from './pages/VerificationStatus';
import ServiceInfo from './pages/ServiceInfo';

// Layout
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HashRouter>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/verify-documents" element={<DocumentVerification />} />
              <Route path="/verification-status" element={<VerificationStatus />} />
              <Route path="/service-info" element={<ServiceInfo />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/claim/new" element={<ClaimForm />} />
                <Route path="/claim/status" element={<ClaimStatus />} />
              </Route>

              <Route element={<ProtectedRoute adminOnly={true} />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
            </Route>
            
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;