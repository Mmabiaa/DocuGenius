import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaFileAlt, FaFlask, FaGraduationCap, FaQuoteRight, FaDownload, FaCheck, FaExclamationTriangle, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const AcademicPapersPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [selectedType, setSelectedType] = useState<string>('research');
  const [selectedStyle, setSelectedStyle] = useState<string>('apa');
  const [error, setError] = useState<string | null>(null);

  const documentTypes = [
    {
      id: 'research',
      title: 'Research Paper',
      description: 'Format your research paper with proper citations and references',
      icon: <FaFileAlt className="w-6 h-6" />,
    },
    {
      id: 'lab',
      title: 'Lab Report',
      description: 'Create detailed lab reports with methodology and results sections',
      icon: <FaFlask className="w-6 h-6" />,
    },
    {
      id: 'thesis',
      title: 'Thesis/Dissertation',
      description: 'Format your thesis or dissertation according to academic standards',
      icon: <FaGraduationCap className="w-6 h-6" />,
    },
  ];

  const citationStyles = [
    { id: 'apa', name: 'APA 7th Edition' },
    { id: 'mla', name: 'MLA 9th Edition' },
    { id: 'chicago', name: 'Chicago Style' },
    { id: 'harvard', name: 'Harvard Style' },
    { id: 'ieee', name: 'IEEE Format' },
  ];

  const features = [
    'Automatic citation generation',
    'Bibliography management',
    'Format checking',
    'Plagiarism detection',
    'Real-time collaboration',
    'Export to multiple formats',
  ];

  const handleStartDocument = () => {
    if (!user) {
      navigate('/login', { 
        state: { 
          from: location.pathname,
          message: 'Please log in to start creating academic papers'
        }
      });
      return;
    }

    try {
      navigate('/essay-generator', { 
        state: { 
          type: selectedType,
          style: selectedStyle,
          mode: 'academic',
          returnTo: location.pathname
        }
      });
    } catch (err) {
      setError('Failed to start document creation. Please try again.');
    }
  };

  const handleNavigation = (path: string) => {
    try {
      navigate(path);
    } catch (err) {
      setError('Navigation failed. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <FaExclamationTriangle className="text-red-500 mr-2" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Academic Papers</h1>
          <p className="text-lg text-gray-600">
            Format research papers, lab reports, and other academic documents according to standard citation styles
          </p>
        </div>

        {/* Document Type Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Select Document Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {documentTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                  selectedType === type.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                aria-label={`Select ${type.title}`}
              >
                <div className="text-blue-500 mb-4">{type.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
                <p className="text-gray-600 text-sm">{type.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Citation Style Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Choose Citation Style</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {citationStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  selectedStyle === style.id
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                aria-label={`Select ${style.name} citation style`}
              >
                {style.name}
              </button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-6">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <FaCheck className="text-green-500" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <div className="text-center">
          <button
            onClick={handleStartDocument}
            className="bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedType || !selectedStyle}
            aria-label="Start writing academic paper"
          >
            <FaFileAlt className="mr-2" />
            {user ? 'Start Writing' : 'Sign in to Start Writing'}
          </button>
        </div>

        {/* Additional Resources */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <FaQuoteRight className="text-blue-500 mr-2" />
              <h3 className="text-xl font-semibold">Citation Guide</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Learn how to properly cite sources in your academic papers
            </p>
            <button
              onClick={() => handleNavigation('/documentation/citation-guide')}
              className="text-blue-500 hover:text-blue-600 flex items-center"
              aria-label="View citation guide"
            >
              View Guide
              <FaArrowRight className="ml-2" />
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <FaDownload className="text-blue-500 mr-2" />
              <h3 className="text-xl font-semibold">Templates</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Download pre-formatted templates for different academic papers
            </p>
            <button
              onClick={() => handleNavigation('/templates')}
              className="text-blue-500 hover:text-blue-600 flex items-center"
              aria-label="Browse templates"
            >
              Browse Templates
              <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicPapersPage; 