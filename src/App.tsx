import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import EssayGenerator from './pages/EssayGenerator';
import ResumeBuilder from './pages/ResumeBuilder';
import DocumentHistory from './pages/DocumentHistory';
import SettingsPage from './pages/SettingsPage';
import BlogPage from './pages/BlogPage';
import FeaturesPage from './pages/FeaturesPage';
import ContactPage from './pages/ContactPage';
import PricingPage from './pages/PricingPage';
import FAQPage from './pages/FAQPage';
import TermsPage from './pages/TermsPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ResourcesPage from './pages/ResourcesPage';
import DocumentationPage from './pages/DocumentationPage';
import TemplatesPage from './pages/TemplatesPage';
import SupportPage from './pages/SupportPage';
import HelpPage from './pages/HelpPage';
import AcademicPapersPage from './pages/AcademicPapersPage';
import { AuthProvider } from './context/AuthContext';
import { DocumentProvider } from './context/DocumentContext';
import { useAuth } from './context/AuthContext';

// Protected Route component with redirect handling
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

// Public Route component (redirects to home if already logged in)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <DocumentProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Public Routes */}
              <Route index element={<HomePage />} />
              <Route path="features" element={<FeaturesPage />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="faq" element={<FAQPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="resources" element={<ResourcesPage />} />
              <Route path="documentation" element={<DocumentationPage />} />
              <Route path="templates" element={<TemplatesPage />} />
              <Route path="support" element={<SupportPage />} />
              <Route path="help" element={<HelpPage />} />
              <Route path="help/:topic" element={<HelpPage />} />
              <Route path="academic-papers" element={<AcademicPapersPage />} />

              {/* Auth Routes */}
              <Route
                path="login"
                element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                }
              />
              <Route
                path="signup"
                element={
                  <PublicRoute>
                    <SignUpPage />
                  </PublicRoute>
                }
              />

              {/* Protected Routes */}
              <Route
                path="essay-generator"
                element={
                  <ProtectedRoute>
                    <EssayGenerator />
                  </ProtectedRoute>
                }
              />
              <Route
                path="resume-builder"
                element={
                  <ProtectedRoute>
                    <ResumeBuilder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="history"
                element={
                  <ProtectedRoute>
                    <DocumentHistory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="settings"
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              {/* Fallback Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Router>
      </DocumentProvider>
    </AuthProvider>
  );
}

export default App;