import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Academic Papers', path: '/academic-papers' },
    { name: 'Essay Generator', path: '/essay-generator', protected: true },
    { name: 'Resume Builder', path: '/resume-builder', protected: true },
    { name: 'History', path: '/history', protected: true },
    { name: 'Settings', path: '/settings', protected: true },
  ];

  const filteredNavLinks = navLinks.filter(link => !link.protected || user);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">DocuGenius</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {filteredNavLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`transition-colors duration-200 ${
                  location.pathname === link.path 
                    ? 'text-blue-600 font-medium' 
                    : 'text-gray-700 hover:text-blue-500'
                }`}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
            {!user && (
              <Link 
                to="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Sign In
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden focus:outline-none" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-4">
            {filteredNavLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`block transition-colors duration-200 py-2 ${
                  location.pathname === link.path 
                    ? 'text-blue-600 font-medium' 
                    : 'text-gray-700'
                }`}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
            {!user && (
              <Link 
                to="/login"
                className="block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 text-center"
              >
                Sign In
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;